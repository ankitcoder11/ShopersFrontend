import { get, post, put, del } from './apiMethods';

// Fetch products by category mens,womens and electronics
export const fetchProducts = (id) => get(`getproduct/get-${id}`);

export const createProduct = (id, data) => post(`createproduct/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

export const updateProduct = (data) => put(`createproduct/update`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

// Fetch a single product by ID
// export const fetchProductById = (id) => get(`/products/${id}`);

// Create a new product

// Update an existing product by ID
// export const updateProduct = (id, data) => put(`/products/${id}`, data);

// Delete a product by ID
// export const deleteProduct = (id) => del(`/products/${id}`);
