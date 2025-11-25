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
  try {
    const data = await orderService.createOrder(req.body);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
export default { getOrders, createOrder };
