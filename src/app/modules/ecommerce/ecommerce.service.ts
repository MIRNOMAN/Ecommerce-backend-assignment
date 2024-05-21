import { Product } from '../ecommerce.model';
import { TProduct } from './ecommerce.interface';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

export const ProductService = {
  createProductIntoDB,
};
