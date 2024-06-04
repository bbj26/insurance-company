// seeder.ts
import mongoose from 'mongoose';
import Coverage, { ICoverage } from '../models/Coverage';
import Discount, { IDiscount } from '../models/Discount';
import { config } from '../config';
import InsuranceSettings from '../models/InsuranceSettings';

export const seedData = async () => {
    try {
        // connect to db
        await mongoose.connect(config.mongo.url as string, { retryWrites: true, w: 'majority' });
        console.log('Connected to MongoDB. Starting data seed');

        // delete existing data
        await Coverage.deleteMany({});
        await Discount.deleteMany({});
        await InsuranceSettings.deleteMany({});

        const coveragesData = [
            { name: 'Bonus Protection', percentage: 0.12 },
            { name: 'AO+', fixedPrice: { young: 55, old: 105 } },
            { name: 'Glass Protection', percentage: 0.8 }
        ];

        const discountsData = [
            { name: 'Commercial discount', percentage: 0.1 },
            { name: 'Adviser discount', percentage: 0.2 },
            { name: 'VIP discount', percentage: 0.05 }
        ];

        const insuranceSettingsData = {
            basePriceYoung: 150,
            basePriceOld: 200,
            ageThreshold: 30,
            strongCarThreshold: 100,
            vipDiscountThreshold: 80,
            surchargePercentageStrongCar: 0.1
        };

        // insert coverages, discounts and other insurance settings in db
        await Coverage.insertMany(coveragesData);
        await Discount.insertMany(discountsData);
        await InsuranceSettings.create(insuranceSettingsData);

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
