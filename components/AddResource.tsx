"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { Loader2Icon } from "lucide-react"
import {useRouter} from "next/navigation"
import { categoryValues } from "@/components/Sidebar"

const category = z.enum(categoryValues);
type Category = z.infer<typeof category>;

const ResourceSchema = z.object({
    name: z.string().min(5, 'Username must be at least 5 characters'),
    description: z.string().min(5, 'Description must be at least 10 characters'),
    url: z.string().min(8, 'URL must be atleast 15 characters'),
    category
  });

type Resource = z.infer<typeof ResourceSchema>;

export default function AddResource() {
    const {register, handleSubmit, setValue, reset, formState : {errors}} = useForm<Resource>({resolver : zodResolver(ResourceSchema)})
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const {toast} = useToast();
    const router = useRouter();

    const onSubmit = async (data : Resource) => {
        console.log(data)
        setIsLoading(true);
        const user = localStorage.getItem("user");
        if(user){
            const userId = user;
            try{
                const response = await axios.post("../api/resources/add",{...data,userId : userId});
                console.log(response.data);
                toast({
                    title : "Resource added successfully"
                })
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
                toast({
                    title : "Error while adding resource",
                    variant: "destructive",
                })
            }
            finally{
                setIsLoading(false);
                reset();
                setValue("category",data.category)
            }
        }
        else{
            router.push("/")
        }
    }

  return (
    <div className="row-span-11 col-span-12 w-full">
        <div className="w-full h-full flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 flex flex-col gap-3 rounded-lg">
                {/* <h1 className="font-bold text-2xl text-center">Add Resource</h1> */}
                Name :
                <Input {...register("name")} name="name" type="text" placeholder="Name"/>
                {errors.name && <p className="text-red-500 text-sm"> {errors.name.message} </p>}
                Description :
                <Textarea {...register("description")} name="description" placeholder="Description"/>
                {errors.description && <p className="text-red-500 text-sm"> {errors.description.message} </p>}
                URL :
                <Input {...register("url")} name="url" type="url" placeholder="Link"/>
                {errors.url && <p className="text-red-500 text-sm"> {errors.url.message} </p>}
                Category :
                <Select onValueChange={(data : Category) => setValue("category",data)} {...register("category")}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {
                                categoryValues.map((item,index) => <SelectItem key={index} value={item}>{item}</SelectItem>)
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm"> {errors.category.message} </p>}
                {
                    isLoading ? <Button> <Loader2Icon className="animate-spin" /> Please wait </Button> : <Button>Submit</Button>
                }
            </form>
        </div>
    </div>
  )
}
