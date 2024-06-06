import React, { useState, useEffect } from 'react';
import { useStore } from '../../Store';
import { calculatePrice } from '../../api';
import { ICoverage, ICustomer, IDiscount } from '../../types';

const MainForm: React.FC = () => {
    const { state, dispatch } = useStore();
    const [form, setForm] = useState<ICustomer>({ name: '', birthdate: '', city: '', vehiclePower: 0, voucher: 0 });

    useEffect(() => {
        setForm(state.customer);
    }, [state.customer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };
        setForm(updatedForm);
        dispatch({ type: 'UPDATE_CUSTOMER', payload: { [name]: value } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedCoverages = state.coverages.filter((coverage: ICoverage) => coverage.selected).map((coverage) => coverage._id);
        const selectedDiscounts = state.discounts.filter((discount: IDiscount) => discount.selected).map((discount) => discount._id);

        const requestData = {
            ...form,
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
        <>
            <h3>User Data</h3>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <div className="form-group">
                    <label>Name*</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Birthdate*</label>
                    <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>City*</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Vehicle Power*</label>
                    <input type="number" name="vehiclePower" value={form.vehiclePower} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Voucher</label>
                    <input type="number" name="voucher" value={form.voucher} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                    Save
                </button>
            </form>
        </>
    );
};

export default MainForm;
