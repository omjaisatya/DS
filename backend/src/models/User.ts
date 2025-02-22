import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    phone: { type: String },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    ],
    loyaltyPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
