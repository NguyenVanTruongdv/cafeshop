const BASE_URL = "http://localhost:5224/api";

export const api = {
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  },


};