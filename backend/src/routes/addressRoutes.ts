import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController";

const router = express.Router();

router.post("/", authMiddleware, addAddress);

router.put("/", authMiddleware, updateAddress);

router.delete("/", authMiddleware, deleteAddress);

export default router;
