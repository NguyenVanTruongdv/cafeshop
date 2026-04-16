import { API_URL } from '../apiConfig.js';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

// Auth APIs
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const resetPassword = async (data) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// User APIs
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/user/admin`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/user/admin/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const updateUser = async (userData) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Product APIs
export const getProducts = async (name = '') => {
  const url = name ? `${API_URL}/products?name=${encodeURIComponent(name)}` : `${API_URL}/products`;
  const response = await fetch(url);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const createProduct = async (formData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(), // Assuming auth required, adjust if not
    body: formData, // FormData for file uploads
  });
  return response.json();
};

export const updateProduct = async (id, formData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Category APIs
export const getCategories = async (name = '') => {
  const url = name ? `${API_URL}/categories?name=${encodeURIComponent(name)}` : `${API_URL}/categories`;
  const response = await fetch(url);
  return response.json();
};

export const getCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}`);
  return response.json();
};

export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const updateCategory = async (id, categoryData) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Cart APIs
export const getCartByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/cart/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const addCartItem = async (itemData) => {
  const response = await fetch(`${API_URL}/cart/add-item`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const updateCartItem = async (itemData) => {
  const response = await fetch(`${API_URL}/cart/update-item`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const removeCartItem = async (cartItemId) => {
  const response = await fetch(`${API_URL}/cart/remove-item/${cartItemId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Order APIs
export const getOrderById = async (orderId) => {
  const response = await fetch(`${API_URL}/order/${orderId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const getOrdersByUser = async (userId) => {
  const response = await fetch(`${API_URL}/order/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const checkoutOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/order/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  return response.json();
};

// Address APIs
export const createAddress = async (addressData) => {
  const response = await fetch(`${API_URL}/address`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  return response.json();
};

export const getMyAddresses = async () => {
  const response = await fetch(`${API_URL}/address`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const updateAddress = async (id, addressData) => {
  const response = await fetch(`${API_URL}/address/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  return response.json();
};

export const deleteAddress = async (id) => {
  const response = await fetch(`${API_URL}/address/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const getAllAddresses = async () => {
  const response = await fetch(`${API_URL}/address/address-all`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const deleteAddressAdmin = async (id) => {
  const response = await fetch(`${API_URL}/address/admin-delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Product Image APIs
export const getProductImages = async (productId) => {
  const response = await fetch(`${API_URL}/products/${productId}/images`);
  return response.json();
};

export const uploadProductImages = async (productId, formData) => {
  const response = await fetch(`${API_URL}/products/${productId}/images`, {
    method: 'POST',
    headers: getAuthHeaders(), // Adjust if auth not needed
    body: formData,
  });
  return response.json();
};

export const updateProductImage = async (imageId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_URL}/products/${imageId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  return response.json();
};

export const deleteProductImage = async (imageId) => {
  const response = await fetch(`${API_URL}/products/images/${imageId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const setMainImage = async (productId, imageId) => {
  const response = await fetch(`${API_URL}/products/${productId}/images/${imageId}/set-main`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Product Variant APIs
export const getProductVariants = async () => {
  const response = await fetch(`${API_URL}/productvairants`); // Note: typo in backend route
  return response.json();
};

export const getProductVariantById = async (id) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`);
  return response.json();
};

export const createProductVariant = async (variantData) => {
  const response = await fetch(`${API_URL}/productvairants`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(variantData),
  });
  return response.json();
};

export const updateProductVariant = async (id, variantData) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(variantData),
  });
  return response.json();
};

export const deleteProductVariant = async (id) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};