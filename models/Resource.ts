import { Document, Schema, model, models } from "mongoose"

export interface IResource extends Document {
    userId : string,
    name: string,
    description: string,
    url: string,
    category : string,
    likes : number
}

const resourceSchema = new Schema<IResource>({
    userId : {type : String, required : true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true, unique : true },
    category: { type: String, required: true },
    likes: { type: Number, required: true,default: 0 }
})

const ResourceModel = models.ResourceModel || model<IResource>('ResourceModel',resourceSchema);

export default ResourceModel;