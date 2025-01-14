import Pack from '@/models/ResourcePack';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request : Request, context : {params : Promise<{packId : string}>}) {
    const packId = (await context.params).packId;
    try {
        
        // Find packs that have this user in the 'users' array
        const resources = await Pack.find({ _id: packId})
            .populate('resources')
            .select('resources')
        
        // If no packs are found, return an empty array
        if (!resources || resources.length === 0) {
            console.log('No packs found for this user.');
            return NextResponse.json({message : 'No packs found:'},{status : 404});
        }

        // console.log(`Packs for user ${packId}:`, resources);
        return NextResponse.json({resourcesData : resources, message : "Fetched packs successfully"},{status : 200});
    } catch (err) {
        console.error('Error fetching packs for user:', err);
        return NextResponse.json({message : 'Error fetching packs for user:'},{status : 500});
    }
}
