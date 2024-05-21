import { Product } from '../ecommerce.model';
import { TProduct } from './ecommerce.interface';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};


const getAllProductFromDB = async () => {
  const result = await Product.find();
  return result;
};



export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB
};
