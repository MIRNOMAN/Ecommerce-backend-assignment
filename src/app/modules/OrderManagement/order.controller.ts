import { Request, Response } from 'express';
import { OrderValidationSchema } from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const zodparsedata = OrderValidationSchema.parse(orderData);

    const result = await OrderService.createOrderIntoDB(zodparsedata);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderService.getAllOrderFromDB(email);

    let message = 'Orders fetched successfully!';
    if (email) {
      message = `Orders fetched successfully for user email: ${email}!`;
    }

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
