import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { ICoverage, ICustomer, IDiscount, IPriceDetails } from './types';

type StateType = {
    customer: ICustomer;
    coverages: ICoverage[];
    discounts: IDiscount[];
    priceDetails: IPriceDetails;
};

const initialState: StateType = {
    customer: { name: '', birthdate: '', city: '', vehiclePower: 0, voucher: 0 },
    coverages: [],
    discounts: [],
    priceDetails: { basePrice: 0, totalPrice: 0, appliedCoverages: [], appliedDiscounts: [], discountAmounts: {}, coverageAmounts: {} }
};

export type ActionType =
    | { type: 'SET_COVERAGES'; payload: ICoverage[] }
    | { type: 'SET_DISCOUNTS'; payload: IDiscount[] }
    | { type: 'SET_PRICE_DETAILS'; payload: IPriceDetails }
    | { type: 'TOGGLE_COVERAGE'; payload: ICoverage }
    | { type: 'TOGGLE_DISCOUNT'; payload: IDiscount }
    | { type: 'UPDATE_CUSTOMER'; payload: Partial<StateType['customer']> };

const StoreContext = createContext<{ state: StateType; dispatch: React.Dispatch<ActionType> } | undefined>(undefined);

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'SET_COVERAGES':
            return { ...state, coverages: action.payload };
        case 'SET_DISCOUNTS':
            return { ...state, discounts: action.payload };
        case 'SET_PRICE_DETAILS':
            return { ...state, priceDetails: action.payload };
        case 'TOGGLE_COVERAGE':
            const updatedCoverages = state.coverages.map((coverage: ICoverage) => (coverage.name === action.payload.name ? { ...coverage, selected: !coverage.selected } : coverage));
            return { ...state, coverages: updatedCoverages };
        case 'TOGGLE_DISCOUNT':
            const updatedDiscounts = state.discounts.map((discount: IDiscount) => (discount.name === action.payload.name ? { ...discount, selected: !discount.selected } : discount));
            return { ...state, discounts: updatedDiscounts };
        case 'UPDATE_CUSTOMER':
            return { ...state, customer: { ...state.customer, ...action.payload } };
        default:
            return state;
    }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
