import { Request, Response } from 'express';
import Discount, { IDiscount } from '../models/Discount';

export const createDiscount = async (req: Request, res: Response) => {
    try {
        const { name, percentage }: IDiscount = req.body;
        const newDiscount: IDiscount = new Discount({ name, percentage });
        await newDiscount.save();
        res.status(201).json(newDiscount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getDiscounts = async (req: Request, res: Response) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getDiscountById = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const { name, percentage }: IDiscount = req.body;
        const discount = await Discount.findByIdAndUpdate(req.params.id, { name, percentage }, { new: true });
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
