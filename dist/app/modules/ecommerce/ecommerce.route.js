"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const ecommerce_controller_1 = require("./ecommerce.controller");
const router = express_1.default.Router();
//application router
router.post('/products', ecommerce_controller_1.productController.createProduct);
router.get('/products', ecommerce_controller_1.productController.getAllProducts);
router.get('/products/:productId', ecommerce_controller_1.productController.getSingleProducts);
router.put('/products/:productId', ecommerce_controller_1.productController.updateProduct);
router.delete('/products/:productId', ecommerce_controller_1.productController.deleteProduct);
exports.productRoute = router;
