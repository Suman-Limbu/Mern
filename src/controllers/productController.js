import productServices from "../services/productService.js";

const getProducts = async (req, res) => {
  const products = await productServices.getProducts(req.query);
  res.status(200).json(products);

};

const getProductById =async (req, res) => {
  const id = req.params.id;
  const product = await productServices.getProductById(id);
  res.json(product);
};

const createProduct = async (req, res) => {
  console.log(req.user);
try{
  const data = await productServices.createProduct(req.body);
  res.status(201).json(data);
}catch(error){
res.status(500).send(error.message);
};};
  

const updateProduct =async (req, res) => {
  try{
    const id = req.params.id;
const data = await productServices.updateProduct(id , req.body);
   res.status(201).json(data);
  }catch(error){
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
   const id = req.params.id;
try {
  await productServices.deleteProduct(id);
  res.send(`Product deleted successfully with id : ${id}`);
}catch(error){
    res.status(500).send(error.message);
}
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
