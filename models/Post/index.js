import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['used', 'new'],
        default: 'used'
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    img: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { timestamps: true })

export default model('Posts', PostSchema);
