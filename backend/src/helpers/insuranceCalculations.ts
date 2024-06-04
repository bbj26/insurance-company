import { ICoverage } from '../models/Coverage';
import { IDiscount } from '../models/Discount';
import { IInsuranceSettings } from '../models/InsuranceSettings';
import Coverage from '../models/Coverage';
import Discount from '../models/Discount';
import { COVERAGE_AO_PLUS, COVERAGE_BONUS_PROTECTION, COVERAGE_GLASS_PROTECTION, DISCOUNT_ADVISER, DISCOUNT_COMMERCIAL, DISCOUNT_VIP } from '../constants/insurance';

export const calculateCoverages = async (selectedCoverages: ICoverage[], basePrice: number, age: number, vehiclePower: number, insuranceSettings: IInsuranceSettings): Promise<number> => {
    let totalCoverages = 0;
    for (const coverageId of selectedCoverages) {
        const coverage: ICoverage | null = await Coverage.findById(coverageId);
        if (!coverage) {
            throw new Error(`Coverage with ID ${coverageId} not found`);
        }

        switch (coverage.name) {
            case COVERAGE_BONUS_PROTECTION:
                if (typeof coverage.percentage !== 'number') {
                    throw new Error(`Percentage for coverage '${COVERAGE_BONUS_PROTECTION}' is not defined`);
                }
                totalCoverages += basePrice * coverage.percentage;
                break;
            case COVERAGE_AO_PLUS:
                if (typeof coverage.fixedPrice?.old !== 'number' || typeof coverage.fixedPrice?.young !== 'number') {
                    throw new Error(`Fixed price for coverage '${COVERAGE_AO_PLUS}' is not defined`);
                }
                totalCoverages += age > 30 ? coverage.fixedPrice.old : coverage.fixedPrice.young;
                break;
            case COVERAGE_GLASS_PROTECTION:
                if (typeof coverage.percentage !== 'number') {
                    throw new Error(`Percentage for coverage '${COVERAGE_GLASS_PROTECTION}' is not defined`);
                }
                totalCoverages += vehiclePower * coverage.percentage;
                break;
            default:
                throw new Error(`Invalid coverage name: ${coverage.name}`);
        }
    }
    return totalCoverages;
};

export const calculateDiscounts = async (selectedDiscounts: IDiscount[], basePrice: number, totalCoverages: number, vehiclePower: number, insuranceSettings: IInsuranceSettings): Promise<number> => {
    let totalDiscounts = 0;

    for (const discount of selectedDiscounts) {
        const discountFromDB = await Discount.findById(discount._id);
        if (discountFromDB) {
            let discountAmount = 0;
            switch (discountFromDB.name) {
                case DISCOUNT_COMMERCIAL:
                    discountAmount = basePrice * discountFromDB.percentage;
                    break;
                case DISCOUNT_ADVISER:
                    if (selectedDiscounts.length >= 2) {
                        discountAmount = totalCoverages * discountFromDB.percentage;
                    }
                    break;
                case DISCOUNT_VIP:
                    if (vehiclePower > insuranceSettings.vipDiscountThreshold) {
                        discountAmount = (basePrice + totalCoverages) * discountFromDB.percentage;
                    }
                    break;
            }
            totalDiscounts += discountAmount;
        }
    }
    return totalDiscounts;
};

export const applySurchargeForStrongCar = (basePrice: number, vehiclePower: number, insuranceSettings: IInsuranceSettings): number => {
    if (vehiclePower > insuranceSettings.strongCarThreshold) {
        return basePrice * (1 + insuranceSettings.surchargePercentageStrongCar);
    }
    return basePrice;
};
