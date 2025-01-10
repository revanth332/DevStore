import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function GET(request: Request){
    try {
        await connectDB();
        const resources = await Resource.find({});
        // console.log(resources)
        
        return NextResponse.json({resources,message : "Fetched resources successfully"},{status : 200})
    }
    catch{
        return NextResponse.json({ message: "Error fetching resources" },{status : 500});
    }
}