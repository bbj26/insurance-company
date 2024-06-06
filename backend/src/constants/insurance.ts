export interface BasePriceRecord {
    city: string;
    minAge: number;
    basePrice: number;
}

export const BASE_PRICE_YOUNG = 100;
export const BASE_PRICE_OLD = 150;
export const AGE_THRESHOLD_BOTTOM = 18;
export const AGE_THRESHOLD_UP = 30;
export const STRONG_CAR_THRESHOLD = 100;
export const VIP_DISCOUNT_THRESHOLD = 80;

export const COVERAGE_BONUS_PROTECTION = 'Bonus Protection';
export const COVERAGE_AO_PLUS = 'AO+';
export const COVERAGE_GLASS_PROTECTION = 'Glass Protection';

export const DISCOUNT_COMMERCIAL = 'Commercial discount';
export const DISCOUNT_ADVISER = 'Adviser discount';
export const DISCOUNT_VIP = 'VIP discount';

export const COVERAGE_PERCENTAGE_BONUS_PROTECTION = 0.12;
export const COVERAGE_PRICE_AO_PLUS_YOUNG = 55;
export const COVERAGE_PRICE_AO_PLUS_OLD = 105;
export const COVERAGE_PERCENTAGE_GLASS_PROTECTION = 0.8;

export const DISCOUNT_PERCENTAGE_COMMERCIAL = 0.1;
export const DISCOUNT_PERCENTAGE_ADVISER = 0.2;
export const DISCOUNT_PERCENTAGE_VIP = 0.05;
export const SURCHARGE_PERCENTAGE_STRONG_CAR = 0.1;

export const BASE_PRICE_RECORDS: BasePriceRecord[] = [
    { city: 'Zagreb', minAge: AGE_THRESHOLD_BOTTOM, basePrice: 100 },
    { city: 'Zagreb', minAge: AGE_THRESHOLD_UP, basePrice: 150 },
    { city: 'Split', minAge: AGE_THRESHOLD_BOTTOM, basePrice: 110 },
    { city: 'Split', minAge: AGE_THRESHOLD_UP, basePrice: 160 },
    { city: 'Rijeka', minAge: AGE_THRESHOLD_BOTTOM, basePrice: 120 },
    { city: 'Rijeka', minAge: AGE_THRESHOLD_UP, basePrice: 170 },
    { city: 'Osijek', minAge: AGE_THRESHOLD_BOTTOM, basePrice: 130 },
    { city: 'Split', minAge: AGE_THRESHOLD_UP, basePrice: 180 }
];
