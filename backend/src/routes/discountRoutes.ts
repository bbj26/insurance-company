import { Router } from 'express';
import { createDiscount, getDiscounts, getDiscountById, updateDiscount, deleteDiscount } from '../controllers/discountController';

export const discountRouter = Router();

// Create a new discount
discountRouter.post('/', createDiscount);

// Get all discounts
discountRouter.get('/', getDiscounts);

// Get a single discount by ID
discountRouter.get('/:id', getDiscountById);

// Update a discount by ID
discountRouter.put('/:id', updateDiscount);

// Delete a discount by ID
discountRouter.delete('/:id', deleteDiscount);
