import Order from "../models/Order.js";
const getOrders = async () => {
  const orders = await Order.find()
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"]);
  return orders;
};
const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"]);
  return orders;
};
const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("orderItems.productId")
    .populate("userId", ["name", "email", "phone", "address"]);
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
    { new: true,runValidators: true }
  );
};
const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  getOrders,
  getOrderById,
  updateOrder,
  createOrder,
  deleteOrder,
  getOrdersByUser,
};
