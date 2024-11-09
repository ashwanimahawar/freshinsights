import express from "express";
import { loginExistingUser, logoutUser, registerNewUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginExistingUser);
router.post("/logout", logoutUser);

export default router;