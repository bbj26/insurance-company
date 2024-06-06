import React from 'react';
import { useStore } from '../../Store';
import { calculatePrice } from '../../api';
import { isCustomerDataProvided } from '../../utils/helpers';
import { ICoverage, IDiscount } from '../../types';

const Header: React.FC = () => {
    const { state, dispatch } = useStore();

    const handleCheckboxChange = async (discount: IDiscount) => {
        dispatch({ type: 'TOGGLE_DISCOUNT', payload: discount });

        const selectedCoverages = state.coverages.filter((coverage: ICoverage) => coverage.selected).map((coverage) => coverage._id);
        const selectedDiscounts = state.discounts
            .map((d: IDiscount) => (d.name === discount.name ? { ...d, selected: !d.selected } : d))
            .filter((discount: IDiscount) => discount.selected)
            .map((discount: IDiscount) => discount._id);

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
        <div style={{ minHeight: '50px', padding: '10px 0px', backgroundColor: '#e6e6e6' }}>
            <div className="d-flex flex-wrap justify-content-between p-2">
                {state.customer.vehiclePower > 80
                    ? state.discounts.map((discount: IDiscount) => (
                          <div key={discount.name} className="form-check">
                              <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={discount.selected || false}
                                  onChange={() => handleCheckboxChange(discount)}
                                  disabled={!isCustomerDataProvided(state.customer)}
                              />
                              <label className="form-check-label">{discount.name}</label>
                          </div>
                      ))
                    : state.discounts
                          .filter((discount: IDiscount) => discount.name !== 'VIP discount')
                          .map((discount: IDiscount) => (
                              <div key={discount.name} className="form-check ">
                                  <input
                                      type="checkbox"
                                      className="form-check-input"
                                      checked={discount.selected || false}
                                      onChange={() => handleCheckboxChange(discount)}
                                      disabled={!isCustomerDataProvided(state.customer)}
                                  />
                                  <label className="form-check-label">{discount.name}</label>
                              </div>
                          ))}
                {state.customer.vehiclePower >= 100 && (
                    <div>
                        <input type="checkbox" checked={true} disabled={true} />
                        Strong car surcharge
                    </div>
                )}
                <div>
                    <span>
                        <b>Total Price: {state.priceDetails.totalPrice} EUR</b>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
