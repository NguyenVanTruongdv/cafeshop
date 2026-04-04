import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAdd = (data) => {
    addProduct(data);
    navigate("/products");
  };

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}