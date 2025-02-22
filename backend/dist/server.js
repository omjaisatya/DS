"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// mongoose
//   .connect(
//     process.env.MONGO_URI as string,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.get("/api/protected", authMiddleware_1.default, (req, res) => {
    res
        .status(200)
        .json({ message: "You have accessed a protected route!", user: req.user });
});
exports.default = app;
//# sourceMappingURL=server.js.map