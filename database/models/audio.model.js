import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
    title: String,
    desc: String,
    category: String,
    fileUrl:String,
    duration: Number,
    uploadedBy: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })

export const audioModel = mongoose.model('audio',audioSchema)