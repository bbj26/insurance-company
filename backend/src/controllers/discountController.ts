import { Request, Response } from 'express';
import Discount, { IDiscount } from '../models/Discount';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';

export const createDiscount = async (req: Request, res: Response) => {
    try {
        const { name, percentage }: IDiscount = req.body;
        const newDiscount: IDiscount = new Discount({ name, percentage });
        await newDiscount.save();
        res.status(HTTP_STATUS_CODE.CREATED).json(newDiscount);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
    }
};

export const getDiscounts = async (req: Request, res: Response) => {
    try {
        const discounts = await Discount.find();
        res.status(HTTP_STATUS_CODE.SUCCESS).json(discounts);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
    }
};

export const getDiscountById = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Discount not found' });
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).json(discount);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
    }
};

export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const { name, percentage }: IDiscount = req.body;
        const discount = await Discount.findByIdAndUpdate(req.params.id, { name, percentage }, { new: true });
        if (!discount) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Discount not found' });
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).json(discount);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
    }
};

export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Discount not found' });
        }
        res.status(HTTP_STATUS_CODE.NO_CONTENT).end();
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
    }
};
