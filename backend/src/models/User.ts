import mongoose from "mongoose";

interface Address extends mongoose.Types.Subdocument {
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const AddressSchema = new mongoose.Schema<Address>(
  {
    label: { type: String, default: "Home" },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

interface User extends mongoose.Document {
  email: string;
  name: string;
  phone: string;
  profilePicture: string;
  addresses: mongoose.Types.DocumentArray<Address>;
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    addresses: { type: [AddressSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", UserSchema);
