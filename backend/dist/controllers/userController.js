"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePicture = exports.updateUserProfile = exports.getUserProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const s3Upload_1 = __importDefault(require("../utils/s3Upload"));
const getUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.userId).select("-__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, addresses } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.user.userId, { name, phone, addresses }, { new: true }).select("-__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateUserProfile = updateUserProfile;
const uploadProfilePicture = async (req, res) => {
    s3Upload_1.default.single("profilePicture")(req, res, async (err) => {
        if (err)
            return res.status(400).json({ message: "File upload error", error: err });
        try {
            const user = await User_1.default.findByIdAndUpdate(req.user.userId, { profilePicture: req.file.location }, { new: true });
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "Profile picture updated", user });
        }
        catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    });
};
exports.uploadProfilePicture = uploadProfilePicture;
//# sourceMappingURL=userController.js.map