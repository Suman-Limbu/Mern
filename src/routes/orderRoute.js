import express from "express";
import authController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
router.get("/", authController.getOrders);
router.post("/",auth, authController.createOrder);
export default router;
