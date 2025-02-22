import express from "express";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, updateUserProfile);

export default router;
