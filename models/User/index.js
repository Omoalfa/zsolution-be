import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        select: false,
        required: true
    }
}, { timestamps: true })

export default model('Users', UserSchema);
