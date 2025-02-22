"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AddressSchema = new mongoose_1.default.Schema({
    label: { type: String, default: "Home" },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
}, { _id: false });
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    addresses: { type: [AddressSchema], default: [] },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map