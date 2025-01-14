import { NextResponse } from "next/server";
import {JwtPayload, sign, verify} from 'jsonwebtoken';
import User from "@/models/User";

const JWT_SECRET = process.env.SECRET_KEY || "secret_key";

const verifyToken = async (token : string) => {
    try{
        const decodedData = verify(token,JWT_SECRET) as JwtPayload;
        const id = decodedData.id;
        const user = await User.findOne({_id : id});
        if(!user){
            return false;
        }
        return true;
    }
    catch(err){
        throw err;
    }
}

export async function middleware(request: Request) {
    const token = request.headers.get('Authorization');

    if(!token){
        return NextResponse.json({message : "Unotherized access"},{status : 401});
    }

    try{
        const isValid = await verifyToken(token);
        if(isValid){
            return NextResponse.next();
        }
        return NextResponse.json({message : "Invalid token"},{status : 401});
    }
    catch(err){
        return NextResponse.json({message : "error validating token"},{status : 500});
    }
}

export const config = {
    matcher: ['/api/(?!auth).*'], // This applies middleware to all API routes except '/api/auth'
};