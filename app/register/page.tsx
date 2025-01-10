"use client"

import { Input } from "@/components/ui/input"
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
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import Nav from "@/components/Nav";

const department = z.enum(["Development", "Marketing", "Sales","HR","IT","Healthcare"])
type Category = z.infer<typeof department>;

const ResourceSchema = z.object({
    name: z.string().min(5, 'Username must be at least 5 characters'),
    email: z.string().min(5,'Email must be at least 10 characters'),
    experience: z.coerce.number().min(0, 'Negative numbers are not allowed'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
    department
  });

type Resource = z.infer<typeof ResourceSchema>;

export default function Register() {
    const {register, handleSubmit, setValue, reset, formState : {errors}} = useForm<Resource>({resolver : zodResolver(ResourceSchema),defaultValues:{
        name: 'Revanth',
        email: 'Revanth@gmail.com',
        experience: 5,
        password: 'Revanth@321',
        department: 'Development'
    }});
    const router = useRouter()
    const [isSubmiting,setIsSubmiting] = useState(false);

    const onSubmit = async (data : Resource) => {
        console.log(data);
        setIsSubmiting(true);
        try{
            const response = await axios.post("/api/auth/register",data);
            console.log(response.data);
            router.push("/")
            reset();
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsSubmiting(false);
        }
    }

  return (
    <div className="grid grid-rows-12 h-full">
        <Nav />
        <div className="row-span-11 col-span-12">
            <div className="max-w-2xl h-full mx-auto flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="border p-5 w-2/3 flex flex-col gap-3 shadow-lg rounded-lg">
                    <h1 className="font-bold text-2xl text-center">Sign Up</h1>
                    Name :
                    <Input {...register("name")} name="name" type="text" placeholder="Name"/>
                    {errors.name && <p className="text-red-500 text-sm"> {errors.name.message} </p>}
                    Email :
                    <Input {...register("email")} name="email" placeholder="Email"/>
                    {errors.email && <p className="text-red-500 text-sm"> {errors.email.message} </p>}
                    Experience :
                    <Input {...register("experience")} name="experience" type="number" placeholder="Experience"/>
                    {errors.experience && <p className="text-red-500 text-sm"> {errors.experience.message} </p>}
                    Password :
                    <Input {...register("password")} name="password" type="password" placeholder="Password"/>
                    {errors.password && <p className="text-red-500 text-sm"> {errors.password.message} </p>}
                    Department :
                    <Select onValueChange={(data : Category) => setValue("department",data)} name="category">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Department</SelectLabel>
                                <SelectItem value="Development">Development</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="IT">IT</SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.department && <p className="text-red-500 text-sm"> {errors.department.message} </p>}
                    {
                        isSubmiting ? <Button> <Loader2Icon className="animate-spin" /> Please Wait</Button> : <Button>Submit</Button>
                    }
                </form>
            </div>
        </div>

    </div>
  )
}
