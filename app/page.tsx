"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Nav from "@/components/Nav";

const ResourceSchema = z.object({
    email: z.string().min(5, 'Email must be at least 5 characters'),
    password: z.string().min(3,'Password must be at least 10 characters'),
  });

type Resource = z.infer<typeof ResourceSchema>;

export default function Login() {
    const {register, handleSubmit, reset, formState : {errors}} = useForm<Resource>({resolver : zodResolver(ResourceSchema)})
    const router = useRouter();
    const [isSubmiting,setIsSubmiting] = useState(false);
    

    const onSubmit = async (data : Resource) => {
      console.log(data);
      setIsSubmiting(true);
      try{
          const response = await axios.post("/api/auth/login",data);
          console.log(response.data);
          router.push("pages/home")
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
    <div className="h-full grid grid-rows-12">
        <Nav handleSidebarOpen={() => {}} />
        <div className="row-span-11 col-span-12">
          <div className="max-w-2xl h-full mx-auto flex justify-center items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="border p-5 w-[90%] md:w-2/3 flex flex-col gap-3 shadow-lg rounded-lg">
                  <h1 className="font-bold text-2xl text-center">Sign In</h1>
                  Email :
                  <Input {...register("email")} name="email" type="email" placeholder="Email"/>
                  {errors.email && <p className="text-red-500 text-sm"> {errors.email.message} </p>}
                  Password :
                  <Input {...register("password")} name="password" type="password" placeholder="Password"/>
                  {errors.password && <p className="text-red-500 text-sm"> {errors.password.message} </p>}
                  {
                      isSubmiting ? <Button> <Loader2Icon className="animate-spin" /> Please Wait</Button> : <Button>Submit</Button>
                  }
              </form>
          </div>
        </div>

    </div>
  )
}
