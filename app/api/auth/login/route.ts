import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import User from '@/models/User';

export async function POST(request : Request){
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({message : 'Email and password are required'}, {
            status: 400,
            });
        }
    try{
        await connectDB();
        const user = await User.findOne({email,password});
        if (!user) {
            return NextResponse.json({message : 'Invalid email or password'}, {
                status: 401,
                });
        }
        return NextResponse.json({message : "User logged in Successfully",user},{
            status : 200
        })
    }
    catch(err){
        return NextResponse.json({ message: "Error fetching User details" },{status : 500});
    }
}