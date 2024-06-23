"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.InsufficientQuantityError = void 0;
class InsufficientQuantityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InsufficientQuantityError';
    }
}
exports.InsufficientQuantityError = InsufficientQuantityError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
