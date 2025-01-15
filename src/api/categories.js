import { get, post, put, del } from './apiMethods';

// Fetch all categories
export const fetchCategories = () => get('/categories');

// Fetch a single category by ID
export const fetchCategoryById = (id) => get(`/categories/${id}`);

// Create a new category
export const createCategory = (data) => post('/categories', data);

// Update an existing category by ID
export const updateCategory = (id, data) => put(`/categories/${id}`, data);

// Delete a category by ID
export const deleteCategory = (id) => del(`/categories/${id}`);
