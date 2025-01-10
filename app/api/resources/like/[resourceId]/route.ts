import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import Resource, { IResource } from "@/models/Resource";

export async function GET(request: Request, context : { params: Promise<{ resourceId: string }> }){
    // const { params } = context;
    const resourceId = (await context.params).resourceId;
    try {
        await connectDB();
        const response = await Resource.findOneAndUpdate({_id : resourceId},{$inc : {likes : 1}},{new:true});
        if(response){
            return NextResponse.json({message : "Updated likes successfully",likes : response.likes},{status : 200})
        }
        else{
            return NextResponse.json({message : "Failed to update likes"},{status : 400})
        }
    }
    catch{
        return NextResponse.json({ message: "Error updating resources" },{status : 500});
    }
}