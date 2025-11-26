import Order from "../models/Order.js";
const getOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const createOrder = async (data, userId) => {
  const order = await Order.create({ ...data, userId });
};

export default { getOrders, createOrder };
