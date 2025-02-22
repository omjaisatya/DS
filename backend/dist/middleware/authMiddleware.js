"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), envConfig_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map