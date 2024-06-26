import express from 'express';
import { productController } from './ecommerce.controller';

const router = express.Router();

//application router

router.post('/products', productController.createProduct);

router.get('/products', productController.getAllProducts);

router.get('/products/:productId', productController.getSingleProducts);

router.put('/products/:productId', productController.updateProduct);

router.delete('/products/:productId', productController.deleteProduct);

export const productRoute = router;
