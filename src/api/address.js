import { get, post, put, del } from './apiMethods';

export const fetchAddress = (userId) => get(`address/getaddress/${userId}`);

export const addAddress = (data) => post('address/create', data, { headers: { 'Content-Type': 'application/json' } });