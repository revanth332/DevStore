import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import Resource, { IResource } from "@/models/Resource";

export async function POST(request: Request, context : { params: Promise<{ resourceId: string }> }){
    // const { params } = context;
    const resourceId = (await context.params).resourceId;
    const {userId} = await request.json();
    try {
        await connectDB();
        const response = await Resource.findOneAndUpdate({_id : resourceId},{$addToSet: { likedBy: userId } },{new:true});
        if(response){
            return NextResponse.json({message : "Updated likes successfully",likes : response.likedBy.length},{status : 200})
        }
        else{
            return NextResponse.json({message : "Failed to update likes",response},{status : 400})
        }
    }
    catch(err){
        return NextResponse.json({ message: "Error updating resources",err },{status : 500});
    }
}