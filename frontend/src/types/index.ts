export type IDiscount = {
    _id?: string;
    name: string;
    percentage: number;
    selected?: boolean;
};

export type ICoverage = {
    _id?: string;
    name: string;
    fixedPrice?: { old: number; young: number };
    percentage?: number;
    selected?: boolean;
};

export type ICustomer = { name: string; birthdate: string; city: string; vehiclePower: number; voucher: number };

export type IPriceDetails = { basePrice: number; totalPrice: number; appliedCoverages: ICoverage[]; appliedDiscounts: IDiscount[] };
