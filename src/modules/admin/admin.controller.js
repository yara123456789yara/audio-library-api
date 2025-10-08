const audioModel = require("../../../database/models/audio.model.js");
const fs = require("fs");
const path = require("path");



const getAllAudiosForAdmin = async (req, res) => {
    try {
    const audios = await audioModel.find().populate("uploadedBy", "name email");
    res.json({ success: true, audios });
    } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    }
}


 const deleteAudio = async (req, res) => {
    try {
    const audio = await Audio.findById(req.params.id);

    if (!audio) {
        return res.status(404).json({ success: false, message: "Audio not found" });
    }

    if (audio.fileUrl) {
        const filePath = path.join("uploads", audio.fileUrl);
        if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        }
    }

    if (audio.coverUrl) {
        const coverPath = path.join("uploads", audio.coverUrl);
        if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
        }
    }

    await audio.deleteOne();

    res.json({ success: true, message: "Audio deleted successfully" });
    } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





module.exports = {
  getAllAudiosForAdmin,
  deleteAudio
};