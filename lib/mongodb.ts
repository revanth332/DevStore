import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string )
        console.log("Mongo DB connected")
    }
    catch(err){
        console.log("error connecting to mongo DB",err);
        throw err;
    }
}