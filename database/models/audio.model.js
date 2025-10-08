const mongoose = require('mongoose');


const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
    },
    desc: {
      type: String,
    },
    genre: {
      type: String,
      enum: ["podcast", "audiobook", "lecture", "music"],
      required: [true, "Genre is required"],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    audioPath: {
      type: String,
      required: true,
    },
    coverPath: {
      type: String,
    },
    duration: Number,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const audioModel = mongoose.model("Audio", audioSchema);
 module.exports={audioModel}
