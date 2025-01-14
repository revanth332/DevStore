import { Schema, model, models, Document } from 'mongoose';
import { NextResponse } from 'next/server';


export async function GET(request:Request){
    return NextResponse.json({info : "working fine"})
}