import { body, param } from 'express-validator';

export const createCoverageValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('fixedPrice').optional().isObject().withMessage('Fixed Price must be an object'),
    body('fixedPrice.young').optional().isNumeric().withMessage('Fixed Price for young must be a number'),
    body('fixedPrice.old').optional().isNumeric().withMessage('Fixed Price for old must be a number'),
    body('percentage').optional().isNumeric().withMessage('Percentage must be a number')
];

export const updateCoverageValidation = [
    param('id').isMongoId().withMessage('Invalid coverage ID'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('fixedPrice').optional().isObject().withMessage('Fixed Price must be an object'),
    body('fixedPrice.young').optional().isNumeric().withMessage('Fixed Price for young must be a number'),
    body('fixedPrice.old').optional().isNumeric().withMessage('Fixed Price for old must be a number'),
    body('percentage').optional().isNumeric().withMessage('Percentage must be a number')
];

export const idParamValidation = [param('id').isMongoId().withMessage('Invalid coverage ID')];
