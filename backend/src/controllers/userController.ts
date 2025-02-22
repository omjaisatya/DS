import { Request, Response } from "express";
import User from "../models/User";
import upload from "../utils/s3Upload";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.userId).select("-__v");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name, phone, addresses } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, addresses },
      { new: true }
    ).select("-__v");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
  upload.single("profilePicture")(req, res, async (err: any) => {
    if (err)
      return res.status(400).json({ message: "File upload error", error: err });

    try {
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { profilePicture: (req.file as any).location },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Profile picture updated", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};
