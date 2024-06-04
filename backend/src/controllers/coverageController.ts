import { Request, Response } from 'express';
import Coverage, { ICoverage } from '../models/Coverage';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import SERVER_MESSAGE from '../constants/serverMessages';
import { createCoverageValidation, updateCoverageValidation, idParamValidation } from '../validations/coverageValidations';
import { handleValidationErrors } from '../validations';

export const createCoverage = [
    ...createCoverageValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { name, fixedPrice, percentage }: ICoverage = req.body;
            const newCoverage: ICoverage = new Coverage({ name, fixedPrice, percentage });
            await newCoverage.save();
            res.status(HTTP_STATUS_CODE.CREATED).json(newCoverage);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const getCoverages = async (req: Request, res: Response) => {
    try {
        const coverages = await Coverage.find();
        res.status(HTTP_STATUS_CODE.SUCCESS).json(coverages);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
    }
};

export const getCoverageById = [
    ...idParamValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const coverage = await Coverage.findById(req.params.id);
            if (!coverage) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.COVERAGE_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.SUCCESS).json(coverage);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const updateCoverage = [
    ...updateCoverageValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { name, fixedPrice, percentage }: ICoverage = req.body;
            const coverage = await Coverage.findByIdAndUpdate(req.params.id, { name, fixedPrice, percentage }, { new: true });
            if (!coverage) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.COVERAGE_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.SUCCESS).json(coverage);
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];

export const deleteCoverage = [
    ...idParamValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const coverage = await Coverage.findByIdAndDelete(req.params.id);
            if (!coverage) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: SERVER_MESSAGE.COVERAGE_NOT_FOUND });
            }
            res.status(HTTP_STATUS_CODE.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
        }
    }
];
