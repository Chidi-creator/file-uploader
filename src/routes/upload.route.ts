import express from "express";
import UploadHandler from "@handlers/upload.handler";
import { authenticateToken } from "@auth/middleware.auth";
import { upload } from "@utils/multer.config";

const router = express.Router();
const uploadHandler = new UploadHandler();

router
  .route("/csv")
  .post(authenticateToken, upload.single("file"), uploadHandler.uploadCsv);

export default router;
