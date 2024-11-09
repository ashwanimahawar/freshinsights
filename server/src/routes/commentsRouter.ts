import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/commentsController.";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/add/:postId", isAuthenticated, createComment);
router.get("/get/", getComments);
router.delete("/delete/:postId", isAuthenticated, deleteComment);

export default router;
