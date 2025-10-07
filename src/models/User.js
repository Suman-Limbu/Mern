import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "user name is required"] },
  email: { type: String, required: [true, "user email is required"],
    trim:true,
    lowercase:true,
    validate:{
        validator: (value)=>{

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
return emailRegex.test(value);
        },
        message :"invalid email address",
    },
   },
  password: {
    type: String,
    required: [true, "user password is required"],
    minLength: [6, "password length must be greater than five"],

  },
  roles: { type:[String] ,
    default:["USER"], enum: ["USER", "ADMIN", "MERCHANT"] },

  address: {
    city: {
      type: String,

      required: [true, "user city is required"],
    },
    country: { type: String, default: "Nepal" },
    province: {
      type: String,

      required: [true, "user province is required"],
    },
      street:{
    type:String,
  },
  },
  phone:{
    type:String,
    required:[true,"user phone number is required"],
    unique:[true,"user phone number must be unique"]
  },
  profileImageUrl:{
    type:String,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    immutable:true,
  }
  

});
const model = mongoose.model("User", userSchema);

export default model;
