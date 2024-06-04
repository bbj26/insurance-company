import { Request, Response } from 'express';
import Coverage, { ICoverage } from '../models/Coverage';
import Discount, { IDiscount } from '../models/Discount';
import InsuranceSettings from '../models/InsuranceSettings'; // Step 1
import { calculateCoverages, calculateDiscounts, applySurchargeForStrongCar } from '../helpers/insuranceCalculations';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import SERVER_MESSAGE from '../constants/serverMessages';

const calculateInsurance = async (req: Request, res: Response) => {
    try {
        const { name, birthdate, city, vehiclePower, voucher, selectedCoverages, selectedDiscounts } = req.body;

        const age = new Date().getFullYear() - new Date(birthdate).getFullYear();

        // Check if insurance settings are available
        const insuranceSettings = await InsuranceSettings.findOne();
        if (!insuranceSettings) {
            return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.INSURANCE_SETTINGS_NOT_FOUND });
        }

        // Calculate base price using insurance settings
        let basePrice = age > insuranceSettings.ageThreshold ? insuranceSettings.basePriceOld : insuranceSettings.basePriceYoung;

        // Apply strong car surcharge
        basePrice = applySurchargeForStrongCar(basePrice, vehiclePower, insuranceSettings);

        // Retrieve coverages and discounts from the database
        const coverages: ICoverage[] = await Coverage.find({ _id: { $in: selectedCoverages } });
        const discounts: IDiscount[] = await Discount.find({ _id: { $in: selectedDiscounts } });

        // Calculate total coverages and discounts
        const totalCoverages = await calculateCoverages(coverages, basePrice, age, vehiclePower, insuranceSettings);
        const totalDiscounts = await calculateDiscounts(discounts, basePrice, totalCoverages, vehiclePower, insuranceSettings);

        // Apply voucher
        const voucherDiscount = voucher ? parseFloat(voucher) : 0;

        // Calculate total price
        const totalPrice = (basePrice + totalCoverages - totalDiscounts - voucherDiscount).toFixed(2);

        res.status(HTTP_STATUS_CODE.SUCCESS).json({
            basePrice,
            coverages: selectedCoverages,
            discounts: selectedDiscounts,
            totalPrice
        });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: SERVER_MESSAGE.SERVER_ERROR, error });
    }
};

export { calculateInsurance };
