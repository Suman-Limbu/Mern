import mongoose from "mongoose";
const resetPasswordSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "ResetPassword Token is required."],
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 3600000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required."],
  },
});

const model = mongoose.model("ResetPassword", resetPasswordSchema);
export default model;
