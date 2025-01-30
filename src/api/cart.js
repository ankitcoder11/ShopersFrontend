import { get, post, put, del } from './apiMethods';

// Fetch the cart for a specific user
export const fetchCart = (userId) => get(`cart/${userId}`);

// Add a product to the user's cart
export const addToCart = (data) => post('cart/add', data, { headers: { 'Content-Type': 'application/json' } });

// Remove an item from the user's cart
export const removeFromCart = (data) => del('cart/remove', { data });

// Remove an item from the user's cart
export const clearCart = (data) => del('cart/clearcart', { data });

// Update the quantity of a product in the cart
export const updateQuantityOfProduct = (data) => post('cart/updatequantity', data, { headers: { 'Content-Type': 'application/json' } });
