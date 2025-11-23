import Product from "../models/Product.js";

const getProducts = async (query) => {
  const limit = query.limit;
  const offset = query.offset;
  const sort = JSON.parse(query.sort || "{}");
  const filters = {};
  const brands = query.brands;
  const category = query.category;
  if (brands) {
    const brandItems = brands.split(",");
    filters.brands = { $in: brandItems };
  }
  if (category) filters.category = category;
  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw { statusCode: 404, message: "Product not found." };
  }
  return product;
};

const createProduct = async (data, createdBy) => {
  const createdProduct = await Product.create({ ...data, createdBy });
  return createdProduct;
};

const updateProduct = async (id, data, userId) => {
  const product = await getProductById(id);
  if (product.createdBy != userId) {
    throw {
      statusCode: 400,
      message: "Access denied",
    };
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedProduct;
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
