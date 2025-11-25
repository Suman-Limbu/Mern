import express from "express";
import authController from "../controllers/orderController.js";
const router = express.Router();
router.get("/", authController.getOrders);
router.post("/", authController.createOrder);
export default router;
