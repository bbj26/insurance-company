import { Router } from 'express';
import { calculateInsurance } from '../controllers/insuranceController';

export const insuranceRouter = Router();

insuranceRouter.post('/calculate', calculateInsurance);
