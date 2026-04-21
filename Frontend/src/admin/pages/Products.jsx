import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import { laysanpham, laydanhmuc, taosanpham, xoasanpham } from "../../services/api";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
    variantWeight: "",
    variantPrice: "",
    variantStock: "",
    image: "",
    file: undefined
  });
  const navigate = useNavigate();

  const getImageSrc = (raw) => {
    if (!raw) return "";
    const base = API_URL.replace(/\/api$/, "");
    const normalized = String(raw).replace(/\\/g, "/");
    if (normalized.startsWith("data:") || normalized.startsWith("http")) return normalized;
    if (normalized.startsWith("/")) return `${base}${normalized}`;
    if (normalized.startsWith("/images")) return `${base}/${normalized}`;
    if (normalized.startsWith("wwwroot/images/")) return `${base}/${normalized.replace("wwwroot/", "")}`;
    return `${base}/images/${normalized}`;
  };

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([laysanpham(), laydanhmuc()]);
      setProducts(prodRes?.data || prodRes || []);
      setCategories(catRes?.data || catRes || []);
    } catch (err) {
      console.error("Lỗi khi tải products/categories:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setNewProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setNewProduct((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
      file
    }));
  };

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.categoryId) {
      alert("Vui lòng nhập tên và chọn danh mục.");
      return;
    }

    if (!newProduct.variantWeight || !newProduct.variantPrice) {
      alert("Vui lòng nhập ít nhất 1 biến thể (khối lượng, giá).");
      return;
    }

    try {
      setIsSubmitting(true);
      const form = new FormData();
      form.append("Name", newProduct.name.trim());
      form.append("Description", newProduct.description.trim());
      form.append("CategoryId", newProduct.categoryId);
      form.append("Variants[0].Weight", newProduct.variantWeight.trim());
      form.append("Variants[0].Price", newProduct.variantPrice);
      form.append("Variants[0].Stock", newProduct.variantStock || "0");
      if (newProduct.file) {
        form.append("Images.Files", newProduct.file);
      }

      await taosanpham(form);
      await loadData();
      setNewProduct({
        name: "",
        description: "",
        categoryId: "",
        variantWeight: "",
        variantPrice: "",
        variantStock: "",
        image: "",
        file: undefined
      });
      setShowForm(false);
      alert("Tạo sản phẩm thành công.");
    } catch (err) {
      console.error("Lỗi khi tạo product:", err);
      alert(`Tạo sản phẩm thất bại: ${err?.message || "Vui lòng kiểm tra lại dữ liệu."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}"?`);
    if (!confirmed) return;
    try {
      await xoasanpham(productId);
      await loadData();
      alert("Xóa sản phẩm thành công.");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert(`Xóa sản phẩm thất bại: ${error?.message || "Vui lòng thử lại."}`);
    }
  };

  return (
    <div className="page-shell products-page">
      <section className="page-banner page-banner--rose page-banner--compact">
        <div className="page-banner__content">
          <span className="hero-badge">Kho sản phẩm</span>
          <h2>Quản lý sản phẩm nhanh, rõ ràng và đầy đủ thao tác.</h2>
          <p>
            Danh sách tập trung để theo dõi, còn chỉnh sửa chi tiết thực hiện trong trang sản phẩm.
          </p>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Tổng sản phẩm</span>
            <strong>{products.length}</strong>
            <small>Mặt hàng đang hiển thị trong hệ thống</small>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="toolbar toolbar--space-between toolbar--wrap">
          <div>
            <span className="panel__eyebrow">Thao tác nhanh</span>
            <h3 className="toolbar__title">Quản lý sản phẩm</h3>
          </div>

          <button type="button" className="btn btn--primary" onClick={() => setShowForm(true)}>
            Thêm sản phẩm
          </button>
        </div>

        <div className="table-wrap">
          {products.length ? (
            <table className="data-table product-admin-table">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá tham khảo</th>
                  <th>Mô tả</th>
                  <th>Sửa</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const imageSrc = product.urlImgMain ? getImageSrc(product.urlImgMain) : "";
                  return (
                    <tr key={product.id}>
                      <td>
                        {imageSrc ? (
                          <img className="product-admin-table__thumb" src={imageSrc} alt={product.name} />
                        ) : (
                          <div className="product-admin-table__thumb product-admin-table__thumb--placeholder">
                            Không ảnh
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                        >
                          {product.name}
                        </button>
                      </td>
                      <td>{product.categoryName || "Chưa phân loại"}</td>
                      <td>{Number(product.price || 0).toLocaleString("vi-VN")} đ</td>
                      <td className="product-admin-table__description">
                        {product.description || "Chưa có mô tả"}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn--ghost btn--small"
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                        >
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn--danger btn--small"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <strong>Chưa có sản phẩm nào</strong>
              <p>Bạn có thể bắt đầu bằng nút Thêm sản phẩm ở góc trên bên phải.</p>
            </div>
          )}
        </div>
      </section>

      {showForm ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="panel__header">
              <div>
                <span className="panel__eyebrow">Tạo sản phẩm</span>
                <h3>Thêm sản phẩm mới</h3>
              </div>
            </div>

            <div className="form-stack">
              <label className="field">
                <span>Tên sản phẩm</span>
                <input
                  className="input-control"
                  name="name"
                  placeholder="Nhập tên sản phẩm"
                  value={newProduct.name}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>Mô tả</span>
                <input
                  className="input-control"
                  name="description"
                  placeholder="Mô tả ngắn gọn để hiển thị trên thẻ"
                  value={newProduct.description}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>Danh mục</span>
                <select
                  className="input-control"
                  name="categoryId"
                  value={newProduct.categoryId}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-grid">
                <label className="field">
                  <span>Khối lượng biến thể</span>
                  <input
                    className="input-control"
                    name="variantWeight"
                    placeholder="Ví dụ: 250g"
                    value={newProduct.variantWeight}
                    onChange={handleChange}
                  />
                </label>

                <label className="field">
                  <span>Giá biến thể</span>
                  <input
                    className="input-control"
                    type="number"
                    min="0"
                    name="variantPrice"
                    placeholder="Ví dụ: 95000"
                    value={newProduct.variantPrice}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className="field">
                <span>Tồn kho biến thể</span>
                <input
                  className="input-control"
                  type="number"
                  min="0"
                  name="variantStock"
                  placeholder="Ví dụ: 10"
                  value={newProduct.variantStock}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>Hình ảnh</span>
                <input className="input-control input-control--file" type="file" onChange={handleImage} />
              </label>

              {newProduct.image ? (
                <div className="upload-preview">
                  <img src={newProduct.image} alt="Preview" />
                </div>
              ) : null}

              <div className="toolbar toolbar--end">
                <button type="button" className="btn btn--ghost" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleAdd}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
