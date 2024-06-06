import React from 'react';
import { useStore } from '../../Store';
import { calculatePrice } from '../../api';
import { isCustomerDataProvided } from '../../utils/helpers';
import { ICoverage, IDiscount } from '../../types';

const Sidebar: React.FC = () => {
    const { state, dispatch } = useStore();

    const handleCheckboxChange = async (coverage: ICoverage) => {
        dispatch({ type: 'TOGGLE_COVERAGE', payload: coverage });

        const selectedCoverages = state.coverages
            .map((c: ICoverage) => (c.name === coverage.name ? { ...c, selected: !c.selected } : c))
            .filter((coverage: ICoverage) => coverage.selected)
            .map((coverage: ICoverage) => coverage._id);
        const selectedDiscounts = state.discounts.filter((discount: IDiscount) => discount.selected).map((discount: IDiscount) => discount._id);

        const requestData = {
            ...state.customer,
            selectedCoverages,
            selectedDiscounts
        };
        requestData.voucher = Number(requestData.voucher) || 0;

        try {
            await calculatePrice(requestData, dispatch);
        } catch (error) {
            console.error('Failed to calculate price:', error);
        }
    };

    return (
        <div className="mt-4">
            <h3>Coverages</h3>
            {state.coverages.map((coverage: ICoverage) => (
                <div key={coverage.name}>
                    <input type="checkbox" checked={coverage.selected || false} onChange={() => handleCheckboxChange(coverage)} disabled={!isCustomerDataProvided(state.customer)} />
                    {coverage.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
