import orderService from "../services/orderService.js";

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    res.status(201).send(data);
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
export default { getOrders, createOrder ,deleteOrder};
