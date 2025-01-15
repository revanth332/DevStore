import { NextRequest, NextResponse } from "next/server";
import {JwtPayload} from 'jsonwebtoken';
import {jwtVerify} from 'jose';
import { cookies } from "next/headers";

// const decrypt = async (session : string) => {
//     try{
//         const JWT_SECRET = new TextEncoder().encode(process.env.SECRET_KEY) || "secret_key";
//         const {payload} = await jwtVerify(session,JWT_SECRET) as JwtPayload;
//         console.log(payload)
//         return payload;
//     }
//     catch(err){
//         console.log(err)
//         throw err;
//     }
// }

// const protectedRoutes = ["/pages"];
// const publicRoutes = ["/","/register"]

// export async function middleware(request: NextRequest) {
//     const cookie = (await cookies()).get("session")?.value;
//     const path = request.nextUrl.pathname;
//     const isProtectedRoute = protectedRoutes.includes(path);
//     const isPublicRoute = publicRoutes.includes(path);
//     console.log(path,cookie);

//     if(cookie){
//         try{
//             const session = await decrypt(cookie);
//             if(isProtectedRoute && !session.id){
//                 return NextResponse.redirect(new URL("/",request.nextUrl))
//             }

//             console.log(path,session.id);
            
//             if(isPublicRoute && session.id){
//                 return NextResponse.redirect(new URL("/pages/home",request.nextUrl))
//             }
//             return NextResponse.next();
//         }
//         catch(err){
//             return NextResponse.redirect(new URL("/",request.nextUrl))
//         }
//     }
//     return NextResponse.redirect(new URL("/",request.nextUrl));
// }

// export const config = {
//     matcher: ['/pages/:path*']
// }

const decrypt = async (session: string) => {
    try {
      const JWT_SECRET = new TextEncoder().encode(process.env.SECRET_KEY || 'secret_key');
      const { payload } = await jwtVerify(session, JWT_SECRET) as JwtPayload;
      return payload;
    } catch (err) {
      console.error('Decryption error:', err);
      throw err;
    }
  };
  
  // Define protected and public routes
  const protectedRoutes = ['/pages'];
  const publicRoutes = ['/', '/register'];
  
  export async function middleware(request: NextRequest) {
    const cookie = (await cookies()).get('session')?.value;
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
  
    console.log('Path:', path, 'Cookie:', cookie);
  
    // If cookie exists, try to decrypt it
    if (cookie) {
      try {
        const session = await decrypt(cookie);
  
        // Redirect to home if the user is not logged in on protected routes
        if (isProtectedRoute && !session.id) {
          return NextResponse.redirect(new URL('/', request.nextUrl));
        }
  
        // Redirect to pages/home if logged in and trying to access a public route
        if (isPublicRoute && session.id) {
          return NextResponse.redirect(new URL('/pages/home', request.nextUrl));
        }
  
        // If valid session and correct route, allow access
        return NextResponse.next();
      } catch (err) {
        // Redirect to the login page if session decryption fails
        return NextResponse.redirect(new URL('/', request.nextUrl));
      }
    }
  
    // Redirect unauthenticated users to login if trying to access protected routes
    if (isProtectedRoute && !cookie) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  
    // For public routes, allow access even without authentication
    if (isPublicRoute || !isProtectedRoute) {
      return NextResponse.next();
    }
  
    // Default response if no conditions are met
    return NextResponse.next();
  }