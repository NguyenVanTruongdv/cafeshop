import { API_URL } from '../apiConfig.js';

// Helper function to get auth headers
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const handleResponse = async (response) => {
  const payload = await parseResponseBody(response);
  if (!response.ok) {
    const message =
      (typeof payload === 'string' && payload) ||
      payload?.message ||
      payload?.title ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return payload;
};

// Auth APIs
export const dangnhap = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const dangky = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const datlaimatkhau = async (data) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// User APIs (Admin)
export const laytatcauser = async () => {
  const response = await fetch(`${API_URL}/user/admin`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const layuserbyid = async (id) => {
  const response = await fetch(`${API_URL}/user/admin/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const capnhatuser = async (userData) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const xoauserv = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Product APIs
export const laysanpham = async (name = '') => {
  const url = name ? `${API_URL}/products?name=${encodeURIComponent(name)}` : `${API_URL}/products`;
  const response = await fetch(url);
  return response.json();
};

export const laysanphambyid = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const taosanpham = async (formData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: formData,
  });
  return handleResponse(response);
};

export const capnhatsanpham = async (id, productData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const xoasanpham = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Category APIs
export const laydanhmuc = async (name = '') => {
  const url = name ? `${API_URL}/categories?name=${encodeURIComponent(name)}` : `${API_URL}/categories`;
  const response = await fetch(url);
  return response.json();
};

export const laydanhmucbyid = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}`);
  return response.json();
};

export const taodanhmuc = async (categoryData) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const capnhatdanhmuc = async (id, categoryData) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const xoadanhmuc = async (id) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Cart APIs (Client)
export const laygiohangbyuserid = async (userId) => {
  const response = await fetch(`${API_URL}/cart/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const themitemvaogiohang = async (itemData) => {
  const response = await fetch(`${API_URL}/cart/add-item`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const capnhatitemgiohang = async (itemData) => {
  const response = await fetch(`${API_URL}/cart/update-item`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const xoaitemgiohang = async (cartItemId) => {
  const response = await fetch(`${API_URL}/cart/remove-item/${cartItemId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Order APIs
export const laydonhangbyid = async (orderId) => {
  const response = await fetch(`${API_URL}/order/${orderId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const laydonhangbyuser = async (userId) => {
  const response = await fetch(`${API_URL}/order/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const thanhtoandonhang = async (orderData) => {
  const response = await fetch(`${API_URL}/order/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
};

// Address APIs
export const taodiachi = async (addressData) => {
  const response = await fetch(`${API_URL}/address`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  return handleResponse(response);
};

export const laydiachicuatoi = async () => {
  const response = await fetch(`${API_URL}/address`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const capnhatdiachi = async (id, addressData) => {
  const response = await fetch(`${API_URL}/address/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  return response.json();
};

export const xoadichi = async (id) => {
  const response = await fetch(`${API_URL}/address/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const laytatcadiachi = async () => {
  const response = await fetch(`${API_URL}/address/address-all`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const xoadichiadmin = async (id) => {
  const response = await fetch(`${API_URL}/address/admin-delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Product Image APIs
export const layanhsanpham = async (productId) => {
  const response = await fetch(`${API_URL}/products/${productId}/images`);
  return response.json();
};

export const uploadanhsanpham = async (productId, formData) => {
  const response = await fetch(`${API_URL}/products/${productId}/images`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: formData,
  });
  return handleResponse(response);
};

export const capnhatanhsanpham = async (imageId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_URL}/products/${imageId}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: formData,
  });
  return response.json();
};

export const xoaanhsanpham = async (imageId) => {
  const response = await fetch(`${API_URL}/products/images/${imageId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const datanhchinh = async (productId, imageId) => {
  const response = await fetch(`${API_URL}/products/${productId}/images/${imageId}/set-main`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Product Variant APIs
export const laybienthesanpham = async () => {
  const response = await fetch(`${API_URL}/productvairants`); // Note: typo in backend route
  return response.json();
};

export const laybienthesanphambyid = async (id) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`);
  return response.json();
};

export const taobienthesanpham = async (variantData) => {
  const response = await fetch(`${API_URL}/productvairants`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(variantData),
  });
  return handleResponse(response);
};

export const capnhatbienthesanpham = async (id, variantData) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(variantData),
  });
  return handleResponse(response);
};

export const xoabienthesanpham = async (id) => {
  const response = await fetch(`${API_URL}/productvairants/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};