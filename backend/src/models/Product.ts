import { Schema } from "mongoose";
import validator from "validator";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: "text",
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
      set: (v: number) => Math.round(v * 100) / 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    images: [
      {
        type: String,
        validate: {
          validator: (urls: string[]) =>
            urls.every((url) => validator.isURL(url)),
          message: "Invalid image URL",
        },
      },
    ],
    category: {
      type: String,
      enum: ["electronics", "clothing", "books", "home", "sports"],
      index: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      unique: true,
      uppercase: true,
      validate: {
        validator: (v: string) => /^[A-Z0-9-]{6,20}$/.test(v),
        message: "Invalid SKU format",
      },
    },
    slug: {
      type: String,
      unique: true,
      slug: "name",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted price
productSchema.virtual("priceFormatted").get(function () {
  return `$${this.price.toFixed(2)}`;
});
