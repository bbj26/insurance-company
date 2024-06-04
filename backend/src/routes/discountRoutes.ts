import { Router } from 'express';
import { createDiscount, getDiscounts, getDiscountById, updateDiscount, deleteDiscount } from '../controllers/discountController';

export const discountRouter = Router();

discountRouter.post('/', createDiscount);
discountRouter.get('/', getDiscounts);
discountRouter.get('/:id', getDiscountById);
discountRouter.put('/:id', updateDiscount);
discountRouter.delete('/:id', deleteDiscount);
