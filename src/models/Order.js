import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order tracking number is required."],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, " User id is required."],
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, " Product id is required."],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    default: "",
    enum: [],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  shippingAddress: {
    city: {
      type: String,

      required: [true, "City is required"],
    },
    country: { type: String, default: "Nepal" },
    province: {
      type: String,

      required: [true, "Province is required"],
    },
    street: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("Order", orderSchema);

export default model;
