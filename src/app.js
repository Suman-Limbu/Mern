import bodyParser from "body-parser";
import express from "express";


import config from "./config/config.js";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import userRoutes from "./routes/userRoute.js";



const app = express();
connectDB();



app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", productRoutes);
app.use("/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)


app.listen(config.port, () => {
  console.log(`server running at ${config.port}...`);
});


 const test = [
  {
    "brand": "Acer",
    "category": "Laptops",
    "id": "6824b96262e271fe4f5615a0",
    "name": "Acer Predator Helios 900",
    "price": 300000
  },
  {
    "brand": "Cetaphil",
    "category": "Cosmetics",
    "id": "6824bdd65f32b41b09e30fa4",
    "name": "Face Serum",
    "price": 1498
  },
  {
    "brand": "Loreal",
    "category": "Cosmetics",
    "id": "68260ce2c2d98ebffcc0d523",
    "name": "Loreal Shampoo 500ml Anti dandruff",
    "price": 2500
  },
  {
    "brand": "Lenovo",
    "category": "Laptops",
    "id": "6829f5c59aa9ea1a53e8aafa",
    "name": "Lenovo Legion I7, 14th gen, 16GB RAM, 1TB SSD",
    "price": 185000
  }];