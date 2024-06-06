import React from 'react';
import { useStore } from '../../Store';

const PriceDetails: React.FC = () => {
    const { state } = useStore();
    const { basePrice, totalPrice, discountAmounts, coverageAmounts } = state.priceDetails;

    return (
        <div className="price-details mt-4">
            <h3>Price Details</h3>
            <div className="price-detail">
                <h5>Basic Price:</h5> {basePrice} EUR
            </div>
            {Object.keys(discountAmounts).length > 0 && (
                <div className="price-detail">
                    <h5>Discounts</h5>
                    <ul>
                        {Object.entries(discountAmounts).map(([discountName, amount]) => (
                            <li key={discountName}>
                                {discountName}: {amount} EUR
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {Object.keys(coverageAmounts).length > 0 && (
                <div className="price-detail">
                    <h5>Coverages</h5>
                    <ul>
                        {Object.entries(coverageAmounts).map(([coverageName, amount]) => (
                            <li key={coverageName}>
                                {coverageName}: {amount} EUR
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="price-detail">
                <strong>Total Price:</strong> {totalPrice} EUR
            </div>
        </div>
    );
};

export default PriceDetails;
