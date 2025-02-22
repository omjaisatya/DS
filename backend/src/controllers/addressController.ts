import { Request, Response } from "express";
import User from "../models/User";

export const addAddress = async (req: Request, res: Response) => {
  try {
    const { label, street, city, state, zipCode, country } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push({ label, street, city, state, zipCode, country });
    await user.save();
    res
      .status(201)
      .json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { index, label, street, city, state, zipCode, country } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.addresses.length) {
      return res.status(400).json({ message: "Invalid address index" });
    }

    user.addresses[index] = user.addresses.create({
      label,
      street,
      city,
      state,
      zipCode,
      country,
    });
    await user.save();
    res
      .status(200)
      .json({ message: "Address updated", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { index } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.addresses.length) {
      return res.status(400).json({ message: "Invalid address index" });
    }

    user.addresses.splice(index, 1);
    await user.save();
    res
      .status(200)
      .json({ message: "Address deleted", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
