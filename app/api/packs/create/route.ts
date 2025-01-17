import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pack from "@/models/ResourcePack";

export async function POST(request : Request){
    const { name, userId } = await request.json();

    if(!name || !userId){
        return NextResponse.json({message : "Missing field error"},{status : 400})
    }

    try{
        await connectDB();
        const newPack = new Pack({ name, users :[userId], resources : [] });
        const result = await newPack.save();
        return NextResponse.json({message : "Resource pack created successfully",newCollection : result},{status : 201});
    }
    catch(err){
        return NextResponse.json({message : "Error fetching resource packs"},{status : 500})
    }
}