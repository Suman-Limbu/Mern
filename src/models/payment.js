import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: [true, "Amount is required."] },
  method: { type: String, required: [true, "Payment Method is required."] },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  transactionId: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("Payment", paymentSchema);
export default model;