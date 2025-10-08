// routes/adminRoutes.js
import express from "express";

import fs from "fs";
import path from "path";
import { getAllAudiosForAdmin } from "./admin.controller.js";
import { adminOnly, validateObjectId } from "../../middleware/role.js";

const router = express.Router();

router.get("/audios", adminOnly,getAllAudiosForAdmin)
router.delete("/audios/:id",adminOnly,validateObjectId("id"),);

export default router;
