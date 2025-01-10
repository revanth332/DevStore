import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(request : Request){
    const {collectionId, resourceId} = await request.json();
    try{
        await connectDB();

    }
    catch(err){
        
    }
}