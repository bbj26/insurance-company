import { body, param } from 'express-validator';

export const createDiscountValidation = [body('name').isString().withMessage('Name must be a string'), body('percentage').isNumeric().withMessage('Percentage must be a number')];

export const updateDiscountValidation = [
    param('id').isMongoId().withMessage('Invalid discount ID'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('percentage').optional().isNumeric().withMessage('Percentage must be a number')
];

export const idParamValidation = [param('id').isMongoId().withMessage('Invalid discount ID')];
