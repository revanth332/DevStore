import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { hash } from "bcryptjs";
import User from "@/models/User";

export async function POST(request : Request) {
    const {name, email, password, department, experience} = await request.json();

    if(!name || !email || !password || !department || !experience){
        return NextResponse.json({message : "Missing field error"},{
            status : 400
        });
    }

    try{
        await connectDB();
        const hashedPassword = await hash(password,10);
        console.log(hashedPassword)
        const newUser = new User({name, email, password:hashedPassword, department, experience})
        await newUser.save();
        return NextResponse.json({message : "User added successfully"},{status : 201});
    }
    catch(err){
        console.log(err)
        return NextResponse.json({message : "Error while adding user"}, {
            status : 500
        })
    }
}