import express from "express";

import config from "./config/config.js";
import productRoutes from "./routes/productRoute.js";
import todoRoutes from "./routes/todoRoute.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/products", productRoutes);
app.use("/todos", todoRoutes);

app.listen(config.port, () => {
  console.log(`server running at ${config.port}...`);
});
