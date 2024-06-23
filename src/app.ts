import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/ecommerce/ecommerce.route';
import { orderRoute } from './app/modules/OrderManagement/order.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', productRoute);
app.use('/api', orderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
