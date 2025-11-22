import express from "express";
import auth from "../middlewares/auth.js";

import { MERCHANT } from "../constants.js/roles.js";
import productController from "../controllers/productController.js";
import roleBasedAuth from "../middlewares/roleBAsedAuth.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", auth,roleBasedAuth(MERCHANT), productController.createProduct);

router.put("/:id", auth,roleBasedAuth(MERCHANT), productController.updateProduct);

router.delete("/:id", auth,roleBasedAuth(MERCHANT), productController.deleteProduct);

export default router;
