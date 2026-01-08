import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Reset password token is required."],
  },
  expiresIn: {
    type: Date,
    default: Date.now() + 3600000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [true, "User Id is required."],
  },
});


const model = mongoose.model("ResetPassword", resetPasswordSchema);

export default model;
