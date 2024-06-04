import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';

export const handleValidationErrors = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
};
