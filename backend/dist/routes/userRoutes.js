"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const s3Upload_1 = __importDefault(require("../utils/s3Upload"));
const router = express_1.default.Router();
router.get("/profile", authMiddleware_1.default, userController_1.getUserProfile);
router.put("/profile", authMiddleware_1.default, userController_1.updateUserProfile);
router.post("/profile/upload", authMiddleware_1.default, s3Upload_1.default.single("profilePicture"), userController_1.uploadProfilePicture);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map