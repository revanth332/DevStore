import Pack from '@/models/ResourcePack';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request : Request, context : {params : Promise<{userId : string}>}) {
    const userId = (await context.params).userId;
    try {
        // Convert the userId string to a mongoose ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        // Find packs that have this user in the 'users' array
        const packs = await Pack.find({ users: userObjectId} )
            .populate('resources')  // Optional: Populate the resources in the packs
            // .populate('users');  // Optional: Populate the users in the packs
        
        // If no packs are found, return an empty array
        if (!packs || packs.length === 0) {
            console.log('No packs found for this user.');
            return NextResponse.json({message : 'No packs found:'},{status : 404});
        }

        console.log(`Packs for user ${userId}:`, packs);
        return NextResponse.json({packs, message : "Fetched packs successfully"},{status : 200});
    } catch (err) {
        console.error('Error fetching packs for user:', err);
        return NextResponse.json({message : 'Error fetching packs for user:'},{status : 500});
    }
}
