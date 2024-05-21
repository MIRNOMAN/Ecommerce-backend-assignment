import mongoose from 'mongoose';
import { Product } from '../ecommerce.model';
import { TProduct } from './ecommerce.interface';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductFromDB = async (searchTerm?: string) => {
  let filter = {};
  if (searchTerm) {
    filter = {
      name: { $regex: searchTerm, $options: 'i' }, // assuming you are searching by product name
    };
  }
  const result = await Product.find(filter);
  return result;
};

// Retrieve a Specific Product by ID

const getSingleProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.findById(objectId);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
