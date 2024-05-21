import Order from '../order.model';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrderFromDB = async (email?: string) => {
  let filter = {};
  if (email) {
    filter = { email: email };
  }
  const result = await Order.find(filter);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
