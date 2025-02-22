"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.addAddress = void 0;
const User_1 = __importDefault(require("../models/User"));
const addAddress = async (req, res) => {
    try {
        const { label, street, city, state, zipCode, country } = req.body;
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.addresses.push({ label, street, city, state, zipCode, country });
        await user.save();
        res
            .status(201)
            .json({ message: "Address added", addresses: user.addresses });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.addAddress = addAddress;
const updateAddress = async (req, res) => {
    try {
        const { index, label, street, city, state, zipCode, country } = req.body;
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (req, res) => {
    try {
        const { index } = req.body;
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (index < 0 || index >= user.addresses.length) {
            return res.status(400).json({ message: "Invalid address index" });
        }
        user.addresses.splice(index, 1);
        await user.save();
        res
            .status(200)
            .json({ message: "Address deleted", addresses: user.addresses });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressController.js.map