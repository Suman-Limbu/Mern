import User from "../models/User.js";

const getUser = async (id) => await User.find();

const getUserById = async (id) => await User.findById(id);

const createUser = async (data) => await User.create(data);

const updateUser = async (id, data) =>
  await User.findByIdAndUpdate(id, data, { new: true });

const deleteUser = async (id) => await User.findByIdAndDelete(id);

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};
