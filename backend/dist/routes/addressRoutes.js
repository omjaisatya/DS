"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const addressController_1 = require("../controllers/addressController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, addressController_1.addAddress);
router.put("/", authMiddleware_1.default, addressController_1.updateAddress);
router.delete("/", authMiddleware_1.default, addressController_1.deleteAddress);
router.put("/default", authMiddleware_1.default, addressController_1.setDefaultAddress);
exports.default = router;
//# sourceMappingURL=addressRoutes.js.map