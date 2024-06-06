import { ICustomer } from '../types/index';

export const isCustomerDataProvided = (customer: ICustomer) => {
    const { name, city, birthdate, vehiclePower } = customer;
    return !!name && !!city && !!birthdate && !!vehiclePower;
};
