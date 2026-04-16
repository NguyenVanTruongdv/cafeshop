import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles.css";
import { ProductContext } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ProductContext.Provider
    value={{
      products: [],
      addProduct: () => {},
      deleteProduct: () => {}
    }}
  >
    <App />
  </ProductContext.Provider>
);
