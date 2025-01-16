import { NextRequest, NextResponse } from "next/server";
import {JwtPayload} from 'jsonwebtoken';
import {jwtVerify} from 'jose';
import { cookies } from "next/headers";

export const decrypt = async (cookie : string | undefined = "") => {
    try{
        const JWT_SECRET = new TextEncoder().encode(process.env.SECRET_KEY) || "secret_key";
        const {payload} = await jwtVerify(cookie,JWT_SECRET) as JwtPayload;
        return payload;
    }
    catch(err){
        // console.log(err)
        return {}
    }
}

const publicRoutes = ["/","/register","/api/auth/login","/api/auth/register"];
const privateRoutes = ["/pages/home","/pages/collections"]

export async function middleware(request: NextRequest) {
    const cookie = (await cookies()).get("session")?.value;
    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = privateRoutes.includes(path);
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session?.id){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if(isPublicRoute && session?.id){
        return NextResponse.redirect(new URL('/pages/home', request.nextUrl));
    }

    if(path.includes("/api") && !publicRoutes.includes(path)){
        if(!session?.id){
            return NextResponse.json({message : "Unauthorized access"},{status : 403});
        }
    }
    
    return NextResponse.next();
}