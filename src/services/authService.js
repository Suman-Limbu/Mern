import bcrypt from "bcryptjs";
import { USER } from "../constants.js/roles.js";
import User from "../models/User.js";

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if(!user){
     throw{statusCode:404, message:"user not found"}
  };
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
  if(user){
     throw{statusCode:404, message:"user already exits."}
  };
  const hashedPassword = bcrypt.hashSync(data.password);
  const registeredUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    roles:[USER],
    
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
export default { register, login };
