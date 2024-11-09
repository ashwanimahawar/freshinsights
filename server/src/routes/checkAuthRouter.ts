import express from "express";
import { checkAuth } from "../controllers/checkAuthController";

const router = express.Router();

router.get("/auth", checkAuth);

export default router;