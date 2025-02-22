import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Otp from "../models/Otp";
import sendEmail from "../utils/sendEmail";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.create({ email, code: otpCode, expiresAt: otpExpiry });
    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otpCode}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    const record = await Otp.findOne({
      email,
      code: otp,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    await Otp.deleteMany({ email });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    // const token = "mock-jwt-token";
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ message: "OTP verified", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
