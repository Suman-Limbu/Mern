import bcrypt from "bcryptjs";
import { USER } from "../constants/roles.js";
import User from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";

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
  if (!user) return;
  const token = crypto.randomUUID();
  await ResetPassword.create({ token, userId: user._id });
  return { message: "reset password url link sent successfully." };
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
