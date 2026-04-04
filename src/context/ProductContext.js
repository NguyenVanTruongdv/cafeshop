import { createContext, useState } from "react";
import productsData from "../data/products";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState(productsData);

  // THÊM
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  // XÓA
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // SỬA
  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}