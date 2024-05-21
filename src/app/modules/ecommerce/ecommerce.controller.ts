import { Request, Response } from 'express';

import { ProductService } from './ecommerce.service';
import { ProductValidationSchema } from './ecommerce.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodparsedata = ProductValidationSchema.parse(productData);

    const result = await ProductService.createProductIntoDB(zodparsedata);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
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

export const productController = {
  createProduct,
};
