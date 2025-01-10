import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function GET(request : Request , context : {params : Promise<{category : string}>}){
    const category = (await context.params).category;

    if(!category || category === ""){
        return NextResponse.json({message : "Invalid resource type"}, {status : 400});
    }

    try{
        await connectDB();
        const resources = await Resource.find({category});

        return NextResponse.json({resources,message : "Resources fetched successfully"}, {status : 200});
    }
    catch(err){
        return NextResponse.json({message : "Failed to fetch resources"}, {status : 500});
    }
}