import { ICoverage } from '../models/Coverage';
import { IDiscount } from '../models/Discount';
import { IInsuranceSettings } from '../models/InsuranceSettings';
import Coverage from '../models/Coverage';
import Discount from '../models/Discount';
import { BASE_PRICE_OLD, BASE_PRICE_YOUNG, COVERAGE_AO_PLUS, COVERAGE_BONUS_PROTECTION, COVERAGE_GLASS_PROTECTION, DISCOUNT_ADVISER, DISCOUNT_COMMERCIAL, DISCOUNT_VIP } from '../constants/insurance';
import BasePrice from '../models/BasePrice';

export interface IDiscountCalculationResult {
    totalDiscounts: number;
    discountAmounts: Record<string, number>;
}

export interface ICoverageCalculationResult {
    totalCoverages: number;
    coverageAmounts: Record<string, number>;
}

export const calculateCoverages = async (selectedCoverages: ICoverage[], basePrice: number, age: number, vehiclePower: number): Promise<ICoverageCalculationResult> => {
    let totalCoverages = 0;
    const coverageAmounts: Record<string, number> = {};
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
                const bonusProtectionCoverageAmount = basePrice * coverage.percentage;
                totalCoverages += bonusProtectionCoverageAmount;
                coverageAmounts[COVERAGE_BONUS_PROTECTION] = bonusProtectionCoverageAmount;
                break;
            case COVERAGE_AO_PLUS:
                if (typeof coverage.fixedPrice?.old !== 'number' || typeof coverage.fixedPrice?.young !== 'number') {
                    throw new Error(`Fixed price for coverage '${COVERAGE_AO_PLUS}' is not defined`);
                }
                const aoPlusCoverageAmount = age > 30 ? coverage.fixedPrice.old : coverage.fixedPrice.young;
                totalCoverages += aoPlusCoverageAmount;
                coverageAmounts[COVERAGE_AO_PLUS] = aoPlusCoverageAmount;
                break;
            case COVERAGE_GLASS_PROTECTION:
                if (typeof coverage.percentage !== 'number') {
                    throw new Error(`Percentage for coverage '${COVERAGE_GLASS_PROTECTION}' is not defined`);
                }
                const glassProtectionCoverageAmount = vehiclePower * coverage.percentage;
                totalCoverages += glassProtectionCoverageAmount;
                coverageAmounts[COVERAGE_GLASS_PROTECTION] = glassProtectionCoverageAmount;
                break;
            default:
                throw new Error(`Invalid coverage name: ${coverage.name}`);
        }
    }
    return { totalCoverages, coverageAmounts };
};

export const calculateDiscounts = async (
    selectedDiscounts: IDiscount[],
    basePrice: number,
    totalCoverages: number,
    vehiclePower: number,
    insuranceSettings: IInsuranceSettings,
    numberOfCoveragesSelected: number
): Promise<IDiscountCalculationResult> => {
    let totalDiscounts = 0;
    const discountAmounts: Record<string, number> = {};
    for (const discount of selectedDiscounts) {
        const discountFromDB = await Discount.findById(discount._id);
        if (discountFromDB) {
            let discountAmount = 0;
            switch (discountFromDB.name) {
                case DISCOUNT_COMMERCIAL:
                    discountAmount = basePrice * discountFromDB.percentage;
                    discountAmounts[DISCOUNT_COMMERCIAL] = discountAmount;
                    break;
                case DISCOUNT_ADVISER:
                    if (numberOfCoveragesSelected >= 2) {
                        discountAmount = totalCoverages * discountFromDB.percentage;
                        discountAmounts[DISCOUNT_ADVISER] = discountAmount;
                    }
                    break;
                case DISCOUNT_VIP:
                    if (vehiclePower > insuranceSettings.vipDiscountThreshold) {
                        discountAmount = (basePrice + totalCoverages) * discountFromDB.percentage;
                        discountAmounts[DISCOUNT_VIP] = discountAmount;
                    }
                    break;
            }
            totalDiscounts += discountAmount;
        }
    }

    return { totalDiscounts, discountAmounts };
};

export const applySurchargeForStrongCar = (basePrice: number, vehiclePower: number, insuranceSettings: IInsuranceSettings): number => {
    if (vehiclePower > insuranceSettings.strongCarThreshold) {
        return basePrice * (1 + insuranceSettings.surchargePercentageStrongCar);
    }
    return basePrice;
};

export const getBasePrices = async (city: string, age: number): Promise<number> => {
    const records = await BasePrice.find({ city }).sort({ minAge: -1 }).exec();
    const record = records.find((record) => age >= record.minAge);

    if (record) {
        return record.basePrice;
    } else {
        // if there's no given city in db, default to simple calculation based on age only
        return age < 30 ? BASE_PRICE_YOUNG : BASE_PRICE_OLD;
    }
};

export const calculateBasePrice = async (customerBirthdate: Date, customerCity: string): Promise<number> => {
    const birthdate = new Date(customerBirthdate);
    const age = new Date().getFullYear() - birthdate.getFullYear();
    const basePrice = await getBasePrices(customerCity, age);
    return basePrice;
};
