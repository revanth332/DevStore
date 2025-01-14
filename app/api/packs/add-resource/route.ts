import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pack from "@/models/ResourcePack";

export async function POST(request : Request){
    const {collectionId, resourceId} = await request.json();
    if(!collectionId || !resourceId){
        return NextResponse.json({message : "Missing field error"},{status : 400});
    }
    try{
        await connectDB();
        const response = await Pack.updateOne({_id : collectionId},{"$push" : {resources : resourceId}});
        if(response.acknowledged){
            return NextResponse.json({message : "Resource succssfulyy added to the collection"},{status : 200});
        }
        else{
            return NextResponse.json({message : "Error while adding to the collection"},{status : 404})
        }
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message : "Error while adding error resource", error : err}, {status : 500});
    }
}