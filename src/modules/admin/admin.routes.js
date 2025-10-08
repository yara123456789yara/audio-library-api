// routes/adminRoutes.js
import express from "express";


import { deleteAudio, getAllAudiosForAdmin } from "./admin.controller.js";
import { adminOnly, validateObjectId } from "../../middleware/role.js";

const router = express.Router();

router.get("/audios", adminOnly,getAllAudiosForAdmin)
router.delete("/audios/:id",adminOnly,validateObjectId("id"),deleteAudio);

export default router;
