import { Schema, model } from 'mongoose';

interface IInsuranceSettings {
    basePriceYoung: number;
    basePriceOld: number;
    ageThreshold: number;
    strongCarThreshold: number;
    vipDiscountThreshold: number;
    surchargePercentageStrongCar: number;
}

const insuranceSettingsSchema = new Schema<IInsuranceSettings>({
    basePriceYoung: { type: Number, required: true },
    basePriceOld: { type: Number, required: true },
    ageThreshold: { type: Number, required: true },
    strongCarThreshold: { type: Number, required: true },
    vipDiscountThreshold: { type: Number, required: true },
    surchargePercentageStrongCar: { type: Number, required: true }
});

const InsuranceSettings = model<IInsuranceSettings>('InsuranceSettings', insuranceSettingsSchema);

export default InsuranceSettings;
export { IInsuranceSettings };
