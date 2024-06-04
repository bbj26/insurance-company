import { body } from 'express-validator';

export const calculateInsuranceValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('birthdate').isISO8601().withMessage('Birthdate must be a valid date'),
    body('city').isString().withMessage('City must be a string'),
    body('vehiclePower').isNumeric().withMessage('Vehicle power must be a number'),
    body('voucher').optional().isNumeric().withMessage('Voucher must be a number'),
    body('selectedCoverages').isArray().withMessage('Selected coverages must be an array'),
    body('selectedCoverages.*').isMongoId().withMessage('Each coverage ID must be a valid MongoDB ID'),
    body('selectedDiscounts').isArray().withMessage('Selected discounts must be an array'),
    body('selectedDiscounts.*').isMongoId().withMessage('Each discount ID must be a valid MongoDB ID')
];
