"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ecommerce_route_1 = require("./app/modules/ecommerce/ecommerce.route");
const order_route_1 = require("./app/modules/OrderManagement/order.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', ecommerce_route_1.productRoute);
app.use('/api', order_route_1.orderRoute);
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
