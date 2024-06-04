import mongoose from 'mongoose';
import Coverage from '../models/Coverage';
import Discount from '../models/Discount';
import { config } from '../config';
import InsuranceSettings from '../models/InsuranceSettings';
import {
    AGE_THRESHOLD,
    BASE_PRICE_OLD,
    BASE_PRICE_YOUNG,
    COVERAGE_AO_PLUS,
    COVERAGE_BONUS_PROTECTION,
    COVERAGE_GLASS_PROTECTION,
    COVERAGE_PERCENTAGE_BONUS_PROTECTION,
    COVERAGE_PERCENTAGE_GLASS_PROTECTION,
    COVERAGE_PRICE_AO_PLUS_OLD,
    COVERAGE_PRICE_AO_PLUS_YOUNG,
    DISCOUNT_ADVISER,
    DISCOUNT_COMMERCIAL,
    DISCOUNT_PERCENTAGE_ADVISER,
    DISCOUNT_PERCENTAGE_COMMERCIAL,
    DISCOUNT_PERCENTAGE_VIP,
    DISCOUNT_VIP,
    STRONG_CAR_THRESHOLD,
    SURCHARGE_PERCENTAGE_STRONG_CAR,
    VIP_DISCOUNT_THRESHOLD
} from '../constants/insurance';
import SERVER_MESSAGE from '../constants/serverMessages';

export const seedData = async () => {
    try {
        // connect to db
        await mongoose.connect(config.mongo.url as string, { retryWrites: true, w: 'majority' });
        console.log(SERVER_MESSAGE.STARTING_SEEDING);

        // delete existing data if any in db, without check if data already exists for simplicity
        await Coverage.deleteMany({});
        await Discount.deleteMany({});
        await InsuranceSettings.deleteMany({});

        const coveragesData = [
            { name: COVERAGE_BONUS_PROTECTION, percentage: COVERAGE_PERCENTAGE_BONUS_PROTECTION },
            { name: COVERAGE_AO_PLUS, fixedPrice: { young: COVERAGE_PRICE_AO_PLUS_YOUNG, old: COVERAGE_PRICE_AO_PLUS_OLD } },
            { name: COVERAGE_GLASS_PROTECTION, percentage: COVERAGE_PERCENTAGE_GLASS_PROTECTION }
        ];

        const discountsData = [
            { name: DISCOUNT_COMMERCIAL, percentage: DISCOUNT_PERCENTAGE_COMMERCIAL },
            { name: DISCOUNT_ADVISER, percentage: DISCOUNT_PERCENTAGE_ADVISER },
            { name: DISCOUNT_VIP, percentage: DISCOUNT_PERCENTAGE_VIP }
        ];

        const insuranceSettingsData = {
            basePriceYoung: BASE_PRICE_YOUNG,
            basePriceOld: BASE_PRICE_OLD,
            ageThreshold: AGE_THRESHOLD,
            strongCarThreshold: STRONG_CAR_THRESHOLD,
            vipDiscountThreshold: VIP_DISCOUNT_THRESHOLD,
            surchargePercentageStrongCar: SURCHARGE_PERCENTAGE_STRONG_CAR
        };

        // insert coverages, discounts and other insurance settings in db
        await Coverage.insertMany(coveragesData);
        await Discount.insertMany(discountsData);
        await InsuranceSettings.create(insuranceSettingsData);

        console.log(SERVER_MESSAGE.SEED_FINISH_SUCCESS);
    } catch (error) {
        console.error(SERVER_MESSAGE.SEEDING_ERROR, error);
    }
};
