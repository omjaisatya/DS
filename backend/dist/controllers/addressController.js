"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultAddress = exports.deleteAddress = exports.updateAddress = exports.addAddress = void 0;
const User_1 = __importDefault(require("../models/User"));
const addAddress = async (req, res) => {
    try {
        const { label, street, city, state, zipCode, country } = req.body;
        const user = await User_1.default.findById(req.user.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
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
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (index < 0 || index >= user.addresses.length) {
            res.status(400).json({ message: "Invalid address index" });
            return;
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
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (index < 0 || index >= user.addresses.length) {
            res.status(400).json({ message: "Invalid address index" });
            return;
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
const setDefaultAddress = async (req, res) => {
    try {
        const { index } = req.body;
        const user = await User_1.default.findById(req.user.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (index < 0 || index >= user.addresses.length) {
            res.status(400).json({ message: "Invalid address index" });
            return;
        }
        user.addresses.forEach((address) => (address.isDefault = false));
        user.addresses[index].isDefault = true;
        await user.save();
        res
            .status(200)
            .json({ message: "Default address set", addresses: user.addresses });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.setDefaultAddress = setDefaultAddress;
//# sourceMappingURL=addressController.js.map