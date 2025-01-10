import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function POST(request : Request){
    const {userId, name, description, url, category} = await  request.json();
    
    if(!userId || !name || !description || !url || !category){
        return NextResponse.json({message : "Missing required fields"}, {status: 400})
    }

    try{
        await connectDB();
        const resource = new Resource({userId, name, description, url, category,likes : 0});
        const result = await resource.save();
        return NextResponse.json({message:"Resource created successfully",result}, {status: 201})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({message : "Error creating resource",err}, {status: 500})
    }
}