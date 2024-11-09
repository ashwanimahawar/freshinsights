import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { isOwner } from "../middleware/isOwner";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/create", isAuthenticated, createPost);
router.put("/update/:id", isOwner, updatePost);
router.delete("/delete/:id", isOwner, deletePost);

export default router;