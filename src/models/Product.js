import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "product name is required"] },
    brand: String,
    category: {
      type: String,
      required: [true, "product category is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [1, "product price must be positive number"],
    },

    stock: {
      type: Number,
      default: 1,
      max: [10000, "stock items must not exceed 10000"],
    },
    size: {
      type: String,
      enum: ["L", "M", "XL", "XXL"],
    },
    imageUrls: {
      type: [String],
    },
  },

  { timestamps: true }
);

const model = mongoose.model("Product", productSchema);

export default model;
