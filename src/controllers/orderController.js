import orderService from "../services/orderService.js";

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.user._id);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
const getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
const updateOrder = async (req, res) => {
  try {
    const data = await orderService.updateOrder(req.params.id, req.body);
    console.log(data.status);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createOrder = async (req, res) => {
  const input = req.body;
  if (!input.orderItems || !input.orderItems.length) {
    return res.status(400).send("Order items are required.");
  }
  try {
    const data = await orderService.createOrder(req.body, req.user._id);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const data = await orderService.deleteOrder(req.params.id);
    res.send("Order deleted successfully");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const orderPayment = async (req, res) => {
  const input = req.body;
  const id = req.params.id;
  try {
    const data = await orderService.orderPayment(id, input);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  getOrders,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  createOrder,
  deleteOrder,
  orderPayment,
};
