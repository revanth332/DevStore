"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { Loader2Icon, MenuIcon, PlusIcon } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddResource from "./AddResource"
import { CategoryContext } from "@/context/CategoryContext"
import CreateCollection from "./CreateCollection"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export default function Nav({handleSidebarOpen}:{handleSidebarOpen : () => void}) {
    const [toggleDropdown, setToggleDropdown] = useState<Boolean>(false);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    const { setSideBarItemsType, sideBarItemsType } = useContext(CategoryContext);
    const pathname = usePathname();
    const [isLoading,setIsLoading] = useState<Boolean>(false);

    const handleToggleDropdown = () => {
        setToggleDropdown(prev => !prev)
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try{
            await axios.get("/api/auth/logout");
            setIsLogin(false);
            router.push('/')
        }
        catch(err){
            toast({
                title: "Error during signout",
                variant:"destructive"
            })
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log(pathname)
        if(pathname.includes("/pages")){
            console.log(pathname)
            setIsLogin(true);
        }
    }, [])


    return (
        <div className="p-3 flex justify-between items-center row-span-1 col-span-12 ">
            <div className="flex gap-1 items-center">
            {
                isLogin ? <MenuIcon className="md:hidden" onClick={() => handleSidebarOpen()} /> : null}
            <div className="flex gap-2 justify-center items-center">
                <Image src="/logo.webp" className="rounded-full" alt="logo" width={35} height={35} />
                <span className="text-primaryDark font-semibold">DevTreasure</span>
            </div>
            </div>


            {/* Desktop navigation */}
            <div className="md:flex hidden">
                {isLogin ? (
                    <div className="flex">
                        {
                            pathname.includes("collections")
                                ?
                                <>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="border flex items-center bg-black text-white rounded-full py-1 px-3 text-sm"> <PlusIcon className="h-5 w-5 mr-1" /> Add Collection</button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle >Add Collection</DialogTitle>
                                            <CreateCollection />
                                        </DialogContent>
                                    </Dialog>
                                    <Link href="/pages/home" className="ml-2 border bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm text">
                                        Resources
                                    </Link>
                                </>
                                :
                                <>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="border flex items-center bg-black text-white rounded-full py-1 px-3 text-sm"> <PlusIcon className="h-5 w-5 mr-1" /> Add Resource</button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle >Add Resource</DialogTitle>
                                            <AddResource />
                                        </DialogContent>
                                    </Dialog>
                                    <Link onClick={() => setSideBarItemsType("Collections")} href="/pages/collections" className="ml-2 border bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm text">
                                        Collections
                                    </Link>
                                </>

                        }

                        <button onClick={() => handleLogout()} className="ml-2 border bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm text-center">
                            {
                                isLoading ? <Loader2Icon className="animate-spin mx-auto" /> :  "Sign Out"
                            }
                        </button>
                        <img className="ml-2" src="https://avatar.iran.liara.run/public" alt="logo" width={30} height={30} onClick={() => handleToggleDropdown()} />

                    </div>
                ) :
                    (
                        <>
                            <button onClick={() => router.push("/")} className="ml-2 border rounded-full px-3 py-1 text-sm text-black">
                                Sign In
                            </button>
                            <button onClick={() => router.push("/register")} className="ml-2 border rounded-full px-3 py-1 text-sm text-white bg-black">
                                Resgister
                            </button>
                        </>
                    )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden relative justify-center items-center">
                {
                    isLogin ? (
                        <div >
                            <img src="https://avatar.iran.liara.run/public" alt="logo" width={30} height={30} onClick={() => handleToggleDropdown()} />
                            {
                                toggleDropdown && (
                                    <div className="absolute -left-32 bg-white top-10 border rounded-lg flex flex-col items-end text-sm">
                                        <Link className="p-1 hover:bg-gray-200 w-full text-right" href="/profile">
                                            Profile
                                        </Link>
                                        {
                                            pathname.includes("collections")
                                            ?
                                            <>
                                                <Link className="p-1 hover:bg-gray-200 w-full text-right" href="/pages/home">
                                                    Resources
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="flex items-center justify-end text-black p-1 text-sm hover:bg-gray-200 w-full"> <PlusIcon className="h-4 w-4" /> Add Collection</button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle >Add Collection</DialogTitle>
                                                        <CreateCollection />
                                                    </DialogContent>
                                                </Dialog>

                                            </>
                                            :
                                            <>
                                                <Link className="p-1 hover:bg-gray-200 w-full text-right" href="/pages/collections">
                                                    Collections
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="flex items-center justify-end text-black p-1 text-sm hover:bg-gray-200 w-full"> <PlusIcon className="h-4 w-4" /> Add Resource</button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle >Add Resource</DialogTitle>
                                                        <AddResource />
                                                    </DialogContent>
                                                </Dialog>
            
                                            </>
                                        }
                                        
                                        <button onClick={() => handleLogout()} className="text-primaryDark font-bold border-t p-2 text-sm text w-[150px] text-center">
                                        {
                                            isLoading ? <Loader2Icon className="animate-spin mx-auto" /> :  "Sign Out"
                                        }
                                        </button>
                                    </div>
                                )
                            }
                        </div>

                    ) :
                        (
                            <>
                                <Link href="/" className="ml-2 border rounded-full px-3 py-1 text-sm text-black">
                                    Sign In
                                </Link>
                                <Link href="/register" className="ml-2 border rounded-full px-3 py-1 text-sm text-white bg-black">
                                Resgister
                                </Link>
                            </>
                        )
                }
            </div>
        </div>
    )
}
