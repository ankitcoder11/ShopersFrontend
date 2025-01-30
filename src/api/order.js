import { get, post, put, del } from './apiMethods';

// Create order
export const getUserOrders = (id) => get(`orders/get-all-orders/${id}`);
export const getAllUserOrders = () => get(`orders/get-all-users-orders`);
export const createOrder = (data) => post('orders/create', data, { headers: { 'Content-Type': 'application/json' } });
export const verifyPayment = (data) => post('orders/verify-payment', data, { headers: { 'Content-Type': 'application/json' } });
export const updateStatus = (data) => put('orders/update-status', data, { headers: { 'Content-Type': 'application/json' } });
