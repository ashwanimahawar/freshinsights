import express from "express";
import { getDashboard } from "../controllers/dashboardController";

const router = express.Router();

router.get("/dashboard", getDashboard);

export default router;