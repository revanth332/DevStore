import { Document, Schema, model, models } from "mongoose"

export interface IUser extends Document {
    name : string,
    email : string,
    password : string,
    department : string,
    experience : number
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email : {type : String, required : true, unique : true },
    password : { type : String, required : true },
    department : { type : String, required : true },
    experience : { type : Number, required : true }
})

const User = model<IUser>('User',userSchema);

export default User;