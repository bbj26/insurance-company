import axios from 'axios';
import { Dispatch } from 'react';
import { ActionType } from '../Store';

// Define the base URL for the API
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchDiscounts = async (dispatch: Dispatch<ActionType>) => {
    try {
        const response = await api.get('/discounts');
        dispatch({ type: 'SET_DISCOUNTS', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch discounts:', error);
    }
};

export const fetchCoverages = async (dispatch: Dispatch<ActionType>) => {
    try {
        const response = await api.get('/coverages');
        dispatch({ type: 'SET_COVERAGES', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch coverages:', error);
    }
};

export const calculatePrice = async (data: any, dispatch: Dispatch<ActionType>) => {
    try {
        const response = await api.post('insurance/calculate', data);
        dispatch({ type: 'SET_PRICE_DETAILS', payload: response.data });
    } catch (error) {
        console.error('Failed to calculate price:', error);
    }
};
