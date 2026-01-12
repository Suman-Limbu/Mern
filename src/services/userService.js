import User from "../models/User.js";
import uploadFile from "../utils/file.js";

const getUser = async (id) => await User.find();

const getUserById = async (id) => await User.findById(id);

const createUser = async (data) => await User.create(data);

const updateUser = async (id, data) =>
  await User.findByIdAndUpdate(id, data, { new: true });

const deleteUser = async (id) => await User.findByIdAndDelete(id);
const updateProfileImage = async (id, file) => {
  const uploadedFiles = await uploadFile([file]);
  const updatedUser=await User.findByIdAndUpdate(
    id,
    {
      profileImageUrl: uploadedFiles[0]?.url,
    },
    { new: true }
  );
  return updatedUser;
};
export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  updateProfileImage
};
