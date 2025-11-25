import Order from "../models/Order.js";
const getOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const createOrder = async (data) => {
  const order = await Order.create(data);
};



export default {getOrders, createOrder};