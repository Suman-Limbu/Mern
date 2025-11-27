import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || "6000",
  version: process.env.VERSION || "0.0.1",
  mongoDBUrl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;
