import React, { useEffect } from 'react';
import MainForm from './components/MainForm';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { fetchDiscounts, fetchCoverages } from './api';
import { useStore } from './Store';
import PriceDetails from './components/PriceDetails';

const App: React.FC = () => {
    const { dispatch } = useStore();

    useEffect(() => {
        fetchCoverages(dispatch);
        fetchDiscounts(dispatch);
    }, [dispatch]);

    return (
        <div className="container p-4">
            <Header />
            <div className="row mt-4">
                <div className="col-md-8">
                    <MainForm />
                </div>
                <div className="col-md-4" style={{ backgroundColor: '#e6e6e6' }}>
                    <Sidebar />
                </div>
                <hr className="mt-4 mb-4" />
                <PriceDetails />
            </div>
        </div>
    );
};

export default App;
