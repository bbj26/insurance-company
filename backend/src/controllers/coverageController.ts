import { Request, Response } from 'express';
import Coverage, { ICoverage } from '../models/Coverage';

export const createCoverage = async (req: Request, res: Response) => {
    try {
        const { name, fixedPrice, percentage }: ICoverage = req.body;
        const newCoverage: ICoverage = new Coverage({ name, fixedPrice, percentage });
        await newCoverage.save();
        res.status(201).json(newCoverage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCoverages = async (req: Request, res: Response) => {
    try {
        const coverages = await Coverage.find();
        res.status(200).json(coverages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCoverageById = async (req: Request, res: Response) => {
    try {
        const coverage = await Coverage.findById(req.params.id);
        if (!coverage) {
            return res.status(404).json({ error: 'Coverage not found' });
        }
        res.status(200).json(coverage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateCoverage = async (req: Request, res: Response) => {
    try {
        const { name, fixedPrice, percentage }: ICoverage = req.body;
        const coverage = await Coverage.findByIdAndUpdate(req.params.id, { name, fixedPrice, percentage }, { new: true });
        if (!coverage) {
            return res.status(404).json({ error: 'Coverage not found' });
        }
        res.status(200).json(coverage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteCoverage = async (req: Request, res: Response) => {
    try {
        const coverage = await Coverage.findByIdAndDelete(req.params.id);
        if (!coverage) {
            return res.status(404).json({ error: 'Coverage not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
