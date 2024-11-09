import express from "express";
import { uploadImage } from "../controllers/uploadImageController";
import multer from "multer";

//Multer Config
const upload = multer({
    storage: multer.memoryStorage(),
  });

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.post("/update", upload.single("image"), uploadImage); 

export default router;