import fs from "fs";

const rawData =  fs.readFileSync("./src/data/products.json", "utf8");
      const products = JSON.parse(rawData);

const getProducts = ()=>{
  
      const filteredProducts = products.filter((products)=>
        products.price >10000);
      
      return filteredProducts;
    
    };

    const getProductById = (id)=>{
      const foundProduct = products.find((products)=>
    products.id == id
      );
      return foundProduct;

    }

      export default {getProducts , getProductById };