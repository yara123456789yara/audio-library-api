// routes/adminRoutes.js
const express = require("express");


const { deleteAudio, getAllAudiosForAdmin } = require("./admin.controller.js");
const { adminOnly, validateObjectId } = require("../../middleware/role.js");


const router = express.Router();

router.get("/audios", adminOnly,getAllAudiosForAdmin)
router.delete("/audios/:id",adminOnly,validateObjectId("id"),deleteAudio);

module.exports = router
