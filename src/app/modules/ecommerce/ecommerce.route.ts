import express from 'express';
import { productController } from './ecommerce.controller';

const router = express.Router();

//application router

router.post('/products', productController.createProduct);

export const productRoute = router;
