const express = require("express");
const router = express.Router();
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const Audio = require("../models/Audio");

// ✅ 1. رفع ملف صوتي جديد
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("genre").isIn(["podcast", "audiobook", "lecture", "music"]).withMessage("Invalid genre"),
    body("isPrivate").optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const audioFile = req.files["audio"] ? req.files["audio"][0].path : null;
      const coverFile = req.files["cover"] ? req.files["cover"][0].path : null;

      if (!audioFile) {
        return res.status(400).json({ error: "Audio file is required" });
      }

      const audio = new Audio({
        title: req.body.title,
        genre: req.body.genre,
        isPrivate: req.body.isPrivate || false,
        audioPath: audioFile,
        coverPath: coverFile,
        user: req.user._id,
      });

      await audio.save();
      res.status(201).json({ message: "Audio uploaded successfully", audio });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ 2. تحديث ملف صوتي (metadata أو cover)
router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "cover", maxCount: 1 }]),
  [
    body("title").optional().isLength({ min: 3 }),
    body("genre").optional().isIn(["podcast", "audiobook", "lecture", "music"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const audio = await Audio.findById(req.params.id);
      if (!audio) {
        return res.status(404).json({ error: "Audio not found" });
      }

      // تأكيد إن المستخدم هو صاحب الملف
      if (!audio.user.equals(req.user._id)) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // تحديث البيانات
      if (req.body.title) audio.title = req.body.title;
      if (req.body.genre) audio.genre = req.body.genre;
      if (req.body.isPrivate !== undefined) audio.isPrivate = req.body.isPrivate;

      // لو فيه cover جديد → نحذف القديم
      if (req.files["cover"]) {
        if (audio.coverPath) fs.unlinkSync(audio.coverPath);
        audio.coverPath = req.files["cover"][0].path;
      }

      await audio.save();
      res.json({ message: "Audio updated successfully", audio });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ 3. حذف ملف صوتي
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).json({ error: "Audio not found" });
    }

    if (!audio.user.equals(req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // حذف الملفات من المجلد
    if (audio.audioPath) fs.unlinkSync(audio.audioPath);
    if (audio.coverPath) fs.unlinkSync(audio.coverPath);

    await audio.deleteOne();
    res.json({ message: "Audio deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
