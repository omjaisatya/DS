import express from "express";
import {
  updateUserProfile,
  getUserProfile,
  uploadProfilePicture,
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../utils/s3Upload";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, updateUserProfile);

router.post(
  "/profile/upload",
  authMiddleware,
  upload.single("profilePicture"),
  uploadProfilePicture
);

export default router;
