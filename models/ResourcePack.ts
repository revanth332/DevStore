import { Schema, model, models, Document } from 'mongoose';
import { IUser } from './User';  // Assuming you have a User model defined
import { IResource } from './Resource';  // Assuming you have a Resource model defined

// Pack interface representing the document structure
export interface IPack extends Document {
    name: string;
    users: IUser['_id'][];  // Array of user IDs (references to User collection)
    resources: IResource['_id'][];  // Array of resource IDs (references to Resource collection)
    categories : string[];
    createdAt: Date;
    updatedAt: Date;
}

const packSchema = new Schema<IPack>({
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resources: [{ type: Schema.Types.ObjectId, ref: 'ResourceModel' }],
    categories : [{type: String}]
},{ timestamps: true })

const Pack = models.Pack || model<IPack>('Pack', packSchema);
export default Pack;