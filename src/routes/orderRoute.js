import express from "express";
import { ADMIN } from "../constants/roles.js";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
const router = express.Router();
router.get("/", auth, roleBasedAuth(ADMIN), orderController.getOrders);
router.get("/user", auth, orderController.getOrdersByUser);
router.get("/:id", auth, roleBasedAuth(ADMIN), orderController.getOrderById);
router.put("/:id", auth, roleBasedAuth(ADMIN), orderController.updateOrder);
router.post("/", auth, orderController.createOrder);
router.delete("/:id", auth, roleBasedAuth(ADMIN), orderController.deleteOrder);
router.post("/:id/payment", auth, orderController.orderPayment);
router.put("/:id/payment/confirm", auth, orderController.confirmOrderPayment);


export default router;
