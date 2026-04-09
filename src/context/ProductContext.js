import { createContext } from "react";

export const ProductContext = createContext({
  products: [],
  addProduct: () => {},
  deleteProduct: () => {}
});