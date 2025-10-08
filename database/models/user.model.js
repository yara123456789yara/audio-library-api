import mongoose from "mongoose";


 const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default:'user'
    }
}, { timestamps: true })

export const userModel = mongoose.model('user',userSchema)