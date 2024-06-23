import { Product } from '../ecommerce.model';
import Order from '../order.model';
import { InsufficientQuantityError, NotFoundError } from './errors/CustomError';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    // Step 1: Create the order
    const order = new Order(orderData);
    await order.save({ session });

    // Step 2: Update the product quantity
    const product = await Product.findById(orderData.productId).session(
      session,
    );
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.inventory.quantity < orderData.quantity) {
      throw new InsufficientQuantityError(
        'Insufficient quantity available in inventory',
      );
    }

    product.inventory.quantity -= orderData.quantity;

    // Step 3: Update the inStock property if quantity becomes zero
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }

    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
