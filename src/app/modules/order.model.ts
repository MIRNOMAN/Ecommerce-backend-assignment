import { Schema, model } from 'mongoose';
import { TOrder } from './OrderManagement/order.interface';

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Order = model<TOrder>('Order', OrderSchema);

export default Order;
