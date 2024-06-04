import { Router } from 'express';
import { createCoverage, getCoverages, getCoverageById, updateCoverage, deleteCoverage } from '../controllers/coverageController';

export const coverageRouter = Router();

coverageRouter.post('/', createCoverage);
coverageRouter.get('/', getCoverages);
coverageRouter.get('/:id', getCoverageById);
coverageRouter.put('/:id', updateCoverage);
coverageRouter.delete('/:id', deleteCoverage);
