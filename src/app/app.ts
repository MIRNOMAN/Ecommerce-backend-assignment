import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './modules/ecommerce/ecommerce.route';
import { orderRoute } from './modules/OrderManagement/order.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', productRoute);
app.use('/api', orderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

export default app;
