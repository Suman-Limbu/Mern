import crypto from "crypto";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import payment from "../utils/payment.js";

const getOrders = async () => {
  const orders = await Order.find()
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"]);
  return orders;
};
const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ userId: userId })
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"])
    .populate("payment");
  return orders;
};
const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"])
    .populate("payment");
  if (!order) {
    throw {
      statuscode: 404,
      message: "order not found.",
    };
  }
  return order;
};

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();
  return await Order.create({ ...data, userId, orderNumber });
};
const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true, runValidators: true }
  );
};
const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

const orderPayment = async (id) => {
  const order = await getOrderById(id);
  const transactionId = crypto.randomUUID();

  const orderPayment = await Payment.create({
    amount: order.totalPrice,
    method: "online",
    transactionId,
  });

  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });

  return await payment.payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.id,
    purchaseOrderName: order.orderNumber,
    customer: order.userId,
  });
};

const confirmOrderPayment = async (id, status) => {
  const order = await Order.findById(id).populate("payment");
  console.log(order);
  // if (status == "Completed") {
  //   await Payment.findByIdAndUpdate(order.payment._id, {
  //     status: "Completed",
  //   });
  // } else {
  //   await Payment.findByIdAndUpdate(order.payment._id, {
  //     status: "Failed",
  //   });
  // }
};

export default {
  getOrders,
  getOrderById,
  updateOrder,
  createOrder,
  deleteOrder,
  getOrdersByUser,
  orderPayment,
  confirmOrderPayment,
};
