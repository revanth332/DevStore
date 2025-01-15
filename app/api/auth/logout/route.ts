import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request : Request){
    try{
        (await cookies()).delete("session");
        return NextResponse.json({message : "Successfully logged out"},{status : 200});
    }
    catch(err){
        return NextResponse.json({message : "Error while logging out"},{status : 500});
    }
}