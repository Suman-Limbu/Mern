import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || "6000",
  version: process.env.VERSION || "0.0.1",
  mongoDBUrl: process.env.MONGODB_URL || "",
};

export default config;
