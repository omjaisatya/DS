"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Otp_1 = __importDefault(require("../models/Otp"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const otpCode = crypto_1.default.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await Otp_1.default.create({ email, code: otpCode, expiresAt: otpExpiry });
        await (0, sendEmail_1.default)(email, "Your OTP Code", `Your OTP code is ${otpCode}`);
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.sendOtp = sendOtp;
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) {
            res.status(400).json({ message: "Email and OTP are required" });
            return;
        }
        const record = await Otp_1.default.findOne({
            email,
            code: otp,
            expiresAt: { $gt: new Date() },
        });
        if (!record) {
            res.status(400).json({ message: "Invalid or expired OTP" });
            return;
        }
        await Otp_1.default.deleteMany({ email });
        let user = await User_1.default.findOne({ email });
        if (!user)
            user = await User_1.default.create({ email });
        // const token = "mock-jwt-token";
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "OTP verified", token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=authController.js.map