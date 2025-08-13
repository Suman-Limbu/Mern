import  productServices from "../services/productService.js";


const getProducts = (req, res) => {
const products =productServices.getProducts();
res.status(200).json(products);};


const getProductById =(req, res) => {
  const id = req.params.id;
  const product = productServices.getProductById(id);
  res.json(product);
};

const createProduct = (req, res) => {
  res.send("create a product"); };

  const updateProduct = (req, res) => {
  res.send("update a product"); };

    const deleteProduct = (req, res) => {
  res.send("delete a product"); };





  export default { getProducts , getProductById , createProduct , updateProduct , deleteProduct };


