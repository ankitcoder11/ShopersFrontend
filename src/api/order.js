import { get, post, put, del } from './apiMethods';

// Create order
export const createOrder = (data) => post('orders/create', data, { headers: { 'Content-Type': 'application/json' } });
export const verifyPayment = (data) => post('orders/verify-payment', data, { headers: { 'Content-Type': 'application/json' } });
