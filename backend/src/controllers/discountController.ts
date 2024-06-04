import { Request, Response } from 'express';
import Discount, { IDiscount } from '../models/Discount';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import SERVER_MESSAGE from '../constants/serverMessages';
import { createDiscountValidation, updateDiscountValidation, idParamValidation } from '../validations/discountValidations';
import { handleValidationErrors } from '../validations';

export const createDiscount = [
    ...createDiscountValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { name, percentage }: IDiscount = req.body;
            const newDiscount: IDiscount = new Discount({ name, percentage });
            await newDiscount.save();
            res.status(HTTP_STATUS_CODE.CREATED).json(newDiscount);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const getDiscounts = async (req: Request, res: Response) => {
    try {
        const discounts = await Discount.find();
        res.status(HTTP_STATUS_CODE.SUCCESS).json(discounts);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
    }
};

export const getDiscountById = [
    ...idParamValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const discount = await Discount.findById(req.params.id);
            if (!discount) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.DISCOUNT_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.SUCCESS).json(discount);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const updateDiscount = [
    ...updateDiscountValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { name, percentage }: IDiscount = req.body;
            const discount = await Discount.findByIdAndUpdate(req.params.id, { name, percentage }, { new: true });
            if (!discount) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.DISCOUNT_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.SUCCESS).json(discount);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const deleteDiscount = [
    ...idParamValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const discount = await Discount.findByIdAndDelete(req.params.id);
            if (!discount) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.DISCOUNT_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];
