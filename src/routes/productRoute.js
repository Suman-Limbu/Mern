import express from "express";
import auth from "../middlewares/auth.js";

import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", auth, productController.createProduct);

router.put("/:id", auth, productController.updateProduct);

router.delete("/:id", auth, productController.deleteProduct);

export default router;
