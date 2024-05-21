import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './modules/ecommerce/ecommerce.route';
import { orderRoute } from './modules/OrderManagement/order.route';
import { Error } from 'mongoose';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 404) {
    res.status(404).json({
      success: false,
      message: 'Not Found Route',
    });
  } else {
    // Pass other errors to the default error handler middleware
    next(err);
  }
});

app.use('/api', productRoute);
app.use('/api', orderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

export default app;
