import bcrypt from "bcryptjs";
import { USER } from "../constants/roles.js";
import User from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from "../utils/email.js";
import config from "../config/config.js";

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw { statusCode: 404, message: "user not found" };
  }
  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch)
    throw { statusCode: 404, message: "incorrect email or password" };

  return {
    _id: user._id,
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
  };
};

const register = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    throw { statusCode: 404, message: "user already exits." };
  }
  const hashedPassword = bcrypt.hashSync(data.password);
  const registeredUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    roles: [USER],
  });
  return {
    _id: registeredUser._id,
    name: registeredUser.name,
    address: registeredUser.address,
    email: registeredUser.email,
    phone: registeredUser.phone,
    roles: registeredUser.roles,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user)  throw{ message:"UserNot found."}
  const token = crypto.randomUUID();
  await ResetPassword.create({ token, userId: user._id });
  await sendEmail(email, {
    subject: "Reset Password Link",
    body: `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
  <h3>Password Reset Request</h3>
  <p>Click the button below to reset your password:</p>

  <a href="${config.appUrl}/reset-password?token=${token}&userId=${user._id}}"
     style="display:inline-block;padding:10px 16px;
            background:#2563eb;color:#fff;
            text-decoration:none;border-radius:4px;">
    Reset Password
  </a>

  <p style="font-size:12px;color:#555;">
    If you didn’t request this, please ignore this email.
  </p>
</body>
</html>
`,
  });
  return { message: "reset password link sent successfully." };
};

const resetPassword = async (userId, token, newPassword) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ expiresAt: -1 });
  console.log(data);
  if (!data || data.token !== token)
    throw { statusCode: 400, message: "invalid or expired token." };
  if (data.isUsed) {
    throw { statusCode: 400, message: "Token has already been used." };
  }
  const hashedPassword = bcrypt.hashSync(newPassword);
  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });
  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });
  return { message: "reset password successfully." };
};
export default { register, login, forgotPassword, resetPassword };
