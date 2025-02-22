"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_SECRET_ACCESS_KEY = exports.AWS_REGION = exports.AWS_ACCESS_KEY_ID = exports.JWT_SECRET = exports.EMAIL_USER = exports.EMAIL_PASS = exports.PORT = exports.MONGO_URI = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { MONGO_URI, PORT, EMAIL_USER, EMAIL_PASS, JWT_SECRET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, } = process.env;
exports.MONGO_URI = MONGO_URI;
exports.PORT = PORT;
exports.EMAIL_USER = EMAIL_USER;
exports.EMAIL_PASS = EMAIL_PASS;
exports.JWT_SECRET = JWT_SECRET;
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
exports.AWS_REGION = AWS_REGION;
if (!MONGO_URI) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
}
//# sourceMappingURL=envConfig.js.map