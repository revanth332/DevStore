import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pack from "@/models/ResourcePack";

export async function POST(request : Request){
    const {collectionId, resourceId,resourceCategory} = await request.json();
    if(!collectionId || !resourceId || !resourceCategory){
        return NextResponse.json({message : "Missing field error"},{status : 400});
    }
    try{
        await connectDB();
        const response = await Pack.findOneAndUpdate({_id : collectionId},{"$addToSet" : {categories : resourceCategory,resources : resourceId}},{new:true});
        if(response){
            return NextResponse.json({message : "Resource succssfulyy added to the collection",response},{status : 200});
        }
        else{
            return NextResponse.json({message : "Error while adding to the collection"},{status : 404})
        }
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message : "Error while adding resource", error : err}, {status : 500});
    }
}