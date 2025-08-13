import productServices from "../services/productService.js";

const getProducts = (req, res) => {
  const products = productServices.getProducts(req.query);
  res.status(200).json(products);
};

const getProductById = (req, res) => {
  const id = req.params.id;
  const product = productServices.getProductById(id);
  res.json(product);
};

const createProduct = (req, res) => {
  productServices.createProduct(req.body);
  res.status(201).send("product created successfully");
};

const updateProduct = (req, res) => {
  res.send("update a product");
};

const deleteProduct = (req, res) => {
  res.send("delete a product");
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
