import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import User from '@/models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || 'secret_key';

export async function POST(request : Request){
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({message : 'Email and password are required'}, {
            status: 400,
            });
        }
    try{
        await connectDB();
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({message : 'user not found'}, {
                status: 404,
                });
        }

        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            return NextResponse.json({message : "Inavlid username or password"},{
                status : 401
            })
        }

        const token = sign({id:user._id},JWT_SECRET,{expiresIn : '1h'});

        return NextResponse.json({message : "User logged in Successfully",token},{
            status : 200
        })
    }
    catch(err){
        return NextResponse.json({ message: "Error fetching User details" },{status : 500});
    }
}