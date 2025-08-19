import User from "../models/User.js";

const createUser = async (data)=>{
    return await User.create(data);
};

const getUser = async ()=>{
    return await User.find();
};




export default {
    createUser, getUser
};