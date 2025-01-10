"use client"

import Link from "next/link"
import Image from "next/image"
import { useState,useEffect, useContext } from "react"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AddResource from "./AddResource"
import { CategoryContext } from "@/app/pages/layout"
import CreateCollection from "./CreateCollection"

export default function Nav() {
    const [toggleDropdown,setToggleDropdown] = useState<Boolean>(false);
    const [isLogin,setIsLogin] = useState(false);
    const router = useRouter();
    const {setSideBarItemsType,sideBarItemsType} = useContext(CategoryContext);

    const handleToggleDropdown = () => {
        setToggleDropdown(prev => !prev)
    }
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) {
            setIsLogin(true);
        }
    },[])

  return (
    <div className="p-3 flex justify-between items-center row-span-1 col-span-12">
        <Link className="flex gap-2 justify-center items-center" href="/pages/home">
            <Image src="/prompt-img.jpg" className="rounded-full" alt="logo" width={50} height={50} />
            <span className="hidden md:inline text-black font-semibold">DevTreasure</span>
        </Link>

        {/* Desktop navigation */}
        <div>
            {isLogin ? (
                <div className="sm:flex hidden">
                    {
                        sideBarItemsType === "Category"
                        ?
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="border flex items-center bg-black text-white rounded-full py-1 px-3 text-sm"> <PlusIcon className="h-5 w-5 mr-1" /> Add Resource</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle >Add Resource</DialogTitle>
                                <AddResource />
                            </DialogContent>
                        </Dialog>
                        :
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="border flex items-center bg-black text-white rounded-full py-1 px-3 text-sm"> <PlusIcon className="h-5 w-5 mr-1" /> Add Collection</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle >Add Collection</DialogTitle>
                                <CreateCollection />
                            </DialogContent>
                        </Dialog>
                    }

                    {/* <Link className="bg-black text-white px-3 text-sm rounded-full flex justify-center items-center" href="/pages/add-resource">
                        <PlusIcon className="h-5 w-5 mr-1" /> Add Resource
                    </Link> */}
                    <Link onClick={() => setSideBarItemsType("Collections")} href="/pages/collections" className="ml-2 border bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm text">
                        Collections
                    </Link>
                    <button onClick={() => {
                        setIsLogin(false);
                        localStorage.removeItem("user");
                        router.push('/')
                        }} className="ml-2 border bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm text">
                        Sign Out
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
        <div className="flex sm:hidden relative justify-center items-center">
            {
                isLogin ? (
                    <div >
                        <img src="https://avatar.iran.liara.run/public" alt="logo" width={30} height={30} onClick={() => handleToggleDropdown()} />
                            {
                                toggleDropdown && (
                                    <div className="absolute -left-32 bg-white top-10 border p-2 rounded-lg flex flex-col items-end text-sm">
                                        <Link href="/profile">
                                            Profile
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="border flex items-center bg-black text-white rounded-full py-1 px-3 text-sm"> <PlusIcon className="h-5 w-5 mr-1" /> Add Resource</button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle >Add Resource</DialogTitle>
                                                <AddResource />
                                            </DialogContent>
                                        </Dialog>
                                        <button className="bg-black mt-3 text-white rounded-full px-3 py-1 text-sm text w-[150px]">
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                    </div>

                ) : 
                (
                    <>
                            <button className="ml-2 border rounded-full px-3 py-1 text-sm text-white">
                                Sign In
                            </button>
                    </>
                )
            }
        </div>
    </div>
  )
}
