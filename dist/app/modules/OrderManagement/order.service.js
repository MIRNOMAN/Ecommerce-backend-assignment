"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const ecommerce_model_1 = require("../ecommerce.model");
const order_model_1 = __importDefault(require("../order.model"));
const CustomError_1 = require("./errors/CustomError");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Create the order
        const order = new order_model_1.default(orderData);
        yield order.save({ session });
        // Step 2: Update the product quantity
        const product = yield ecommerce_model_1.Product.findById(orderData.productId).session(session);
        if (!product) {
            throw new CustomError_1.NotFoundError('Product not found');
        }
        if (product.inventory.quantity < orderData.quantity) {
            throw new CustomError_1.InsufficientQuantityError('Insufficient quantity available in inventory');
        }
        product.inventory.quantity -= orderData.quantity;
        // Step 3: Update the inStock property if quantity becomes zero
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        yield product.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    if (email) {
        filter = { email: email };
    }
    const result = yield order_model_1.default.find(filter);
    return result;
});
exports.OrderService = {
    createOrderIntoDB,
    getAllOrderFromDB,
};
