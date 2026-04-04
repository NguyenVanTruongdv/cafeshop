import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);

  const product = products.find(p => p.id === Number(id));

  const handleUpdate = (data) => {
    updateProduct(Number(id), data);
    navigate("/products");
  };

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      {product && <ProductForm initialData={product} onSubmit={handleUpdate} />}
    </div>
  );
}