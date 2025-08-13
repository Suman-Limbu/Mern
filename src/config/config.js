import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME||"",
  port: process.env.PORT || "6000",
  version: process.env.VERSION || "0.0.1",
  

};

export default config;
