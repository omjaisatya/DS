import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import authMiddleware from "./middleware/authMiddleware";

const app = express();

app.use(express.json());
app.use(cors());

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

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "You have accessed a protected route!", user: req.user });
});

export default app;
