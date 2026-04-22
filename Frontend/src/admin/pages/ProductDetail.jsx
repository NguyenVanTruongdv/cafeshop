import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import {
  laysanphambyid,
  laydanhmuc,
  capnhatsanpham,
  xoasanpham,
  layanhsanpham,
  uploadanhsanpham,
  xoaanhsanpham,
  datanhchinh,
  capnhatbienthesanpham,
  taobienthesanpham,
  xoabienthesanpham
} from "../../services/api";
import "./ProductDetail.css";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return moneyFormatter.format(value || 0);
}

function getImageSrc(raw) {
  if (!raw) return "";
  const base = API_URL.replace(/\/api$/, "");
  const normalized = String(raw).replace(/\\/g, "/");
  if (normalized.startsWith("data:") || normalized.startsWith("http")) return normalized;
  if (normalized.startsWith("/")) return `${base}${normalized}`;
  if (normalized.startsWith("images/")) return `${base}/${normalized}`;
  if (normalized.startsWith("wwwroot/images/")) return `${base}/${normalized.replace("wwwroot/", "")}`;
  return `${base}/images/${normalized}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [deletedVariantIds, setDeletedVariantIds] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    categoryId: "",
    variants: [],
    images: []
  });

  const getCategoryIdFromName = (categoryName, categoryList) => {
    if (!categoryName) return "";
    const matched = categoryList.find((item) => item.name === categoryName);
    return matched ? String(matched.id) : "";
  };

  const loadData = async () => {
    try {
      const [detailRes, imagesRes, categoriesRes] = await Promise.all([
        laysanphambyid(id),
        layanhsanpham(id),
        laydanhmuc()
      ]);

      const detail = detailRes?.data || detailRes;
      const images = imagesRes?.data || imagesRes || [];
      const categoriesData = categoriesRes?.data || categoriesRes || [];

      setCategories(categoriesData);
      setProduct(detail);
      setFormData({
        id: detail.id,
        name: detail.name || "",
        description: detail.description || "",
        categoryId: getCategoryIdFromName(detail.categoryName, categoriesData),
        variants: (detail.variants || []).map((variant) => ({
          id: variant.id,
          weight: variant.weight || "",
          price: variant.price ?? "",
          stock: variant.stock ?? 0
        })),
        images
      });
      setDeletedVariantIds([]);
      setNewImageFiles([]);
    } catch (err) {
      console.error("Lỗi khi tải product:", err);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const mainImage = useMemo(() => {
    const primary = formData.images.find((img) => img.isMain);
    return primary?.imageUrl || formData.images[0]?.imageUrl || "";
  }, [formData.images]);

  const currentImage = useMemo(() => getImageSrc(mainImage), [mainImage]);

  const handleFieldChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleVariantChange = (index, key, value) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      nextVariants[index] = {
        ...nextVariants[index],
        [key]: value
      };
      return { ...prev, variants: nextVariants };
    });
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { id: null, weight: "", price: "", stock: 0 }]
    }));
  };

  const removeVariant = (index) => {
    setFormData((prev) => {
      const variant = prev.variants[index];
      if (variant?.id) {
        setDeletedVariantIds((old) => [...old, variant.id]);
      }
      return {
        ...prev,
        variants: prev.variants.filter((_, idx) => idx !== index)
      };
    });
  };

  const handleNewImages = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setNewImageFiles(files);
  };

  const handleUploadSelectedImages = async () => {
    if (!newImageFiles.length) {
      alert("Vui lòng chọn ít nhất một ảnh để thêm.");
      return;
    }

    try {
      setIsUploadingImages(true);
      const imageForm = new FormData();
      newImageFiles.forEach((file) => imageForm.append("Files", file));
      await uploadanhsanpham(id, imageForm);
      setNewImageFiles([]);
      await loadData();
      alert("Đã thêm ảnh mới thành công.");
    } catch (error) {
      console.error("Lỗi khi thêm ảnh:", error);
      alert(`Thêm ảnh thất bại: ${error?.message || "Vui lòng thử lại."}`);
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await xoaanhsanpham(imageId);
      await loadData();
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
      alert(`Xóa ảnh thất bại: ${error?.message || "Vui lòng thử lại."}`);
    }
  };

  const handleSetMainImage = async (imageId) => {
    try {
      await datanhchinh(id, imageId);
      await loadData();
    } catch (error) {
      console.error("Lỗi khi đặt ảnh chính:", error);
      alert(`Đặt ảnh chính thất bại: ${error?.message || "Vui lòng thử lại."}`);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmDelete) return;
    try {
      await xoasanpham(id);
      alert("Xóa sản phẩm thành công.");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Xóa sản phẩm thất bại.");
    }
  };

  const handleEdit = async () => {
    if (!formData.name || !formData.categoryId) {
      alert("Vui lòng nhập tên sản phẩm và chọn danh mục.");
      return;
    }
    if (!formData.variants.length) {
      alert("Sản phẩm phải có ít nhất một biến thể.");
      return;
    }
    if (formData.variants.some((variant) => !variant.weight || variant.price === "")) {
      alert("Vui lòng nhập đầy đủ khối lượng và giá cho tất cả biến thể.");
      return;
    }

    try {
      setIsSaving(true);
      const updatePayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        // Backend DTO đang yêu cầu Images/Files, nên gửi object rỗng để tránh lỗi validation.
        images: {
          files: []
        },
        variants: []
      };
      await capnhatsanpham(id, updatePayload);

      const variantTasks = [];
      formData.variants.forEach((variant) => {
        const payload = {
          productId: Number(id),
          weight: variant.weight,
          price: Number(variant.price),
          stock: Number(variant.stock || 0)
        };
        if (variant.id) {
          variantTasks.push(capnhatbienthesanpham(variant.id, payload));
        } else {
          variantTasks.push(taobienthesanpham(payload));
        }
      });
      deletedVariantIds.forEach((variantId) => {
        variantTasks.push(xoabienthesanpham(variantId));
      });
      if (variantTasks.length) {
        await Promise.all(variantTasks);
      }

      if (newImageFiles.length) {
        const imageForm = new FormData();
        newImageFiles.forEach((file) => imageForm.append("Files", file));
        await uploadanhsanpham(id, imageForm);
      }

      await loadData();
      alert("Cập nhật sản phẩm thành công.");
    } catch (error) {
      console.log(error);
      alert(`Cập nhật thất bại: ${error?.message || "Vui lòng thử lại."}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!product) {
    return (
      <div className="page-shell">
        <div className="panel">
          <div className="empty-state empty-state--fill">
            <strong>Đang tải thông tin sản phẩm...</strong>
            <p>Dữ liệu sẽ hiển thị ngay khi API phản hồi.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell product-detail-page">
      <section className="page-banner page-banner--rose page-banner--compact product-detail-banner">
        <div className="page-banner__content">
          <span className="hero-badge">Chi tiết sản phẩm</span>
          <h2>{formData.name || product.name}</h2>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Danh mục</span>
            <strong>{product.categoryName || "Chưa phân loại"}</strong>
            <small>Thông tin nhóm sản phẩm</small>
          </div>
          <div className="hero-stat">
            <span>Giá thấp nhất</span>
            <strong>
              {formatCurrency(
                formData.variants.length
                  ? Math.min(...formData.variants.map((variant) => Number(variant.price || 0)))
                  : 0
              )}
            </strong>
            <small>Cập nhật theo danh sách biến thể</small>
          </div>
          <div className="hero-stat">
            <span>Tổng tồn kho</span>
            <strong>{formData.variants.reduce((sum, variant) => sum + Number(variant.stock || 0), 0)}</strong>
            <small>{formData.variants.length} biến thể đang có</small>
          </div>
        </div>
      </section>

      <section className="detail-layout">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Thư viện ảnh</span>
              <h3>Hình ảnh sản phẩm</h3>
            </div>
          </div>

          {currentImage ? (
            <img className="detail-image" src={currentImage} alt={formData.name || product.name} />
          ) : (
            <div className="detail-image detail-image--placeholder">Chưa có ảnh</div>
          )}

          <div className="thumb-row">
            {formData.images?.map((image) => (
              <button
                key={image.id || image.imageUrl}
                type="button"
                className={`thumb-button${image.isMain ? " is-active" : ""}`}
                onClick={() => handleSetMainImage(image.id)}
              >
                <img src={getImageSrc(image.imageUrl)} alt={formData.name || product.name} />
              </button>
            ))}
          </div>

          <label className="field">
            <span>Thêm ảnh mới</span>
            <input className="input-control input-control--file" type="file" multiple onChange={handleNewImages} />
          </label>
          {newImageFiles.length ? (
            <div className="toolbar toolbar--wrap">
              <span>Đã chọn {newImageFiles.length} ảnh.</span>
              <button
                type="button"
                className="btn btn--primary btn--small"
                onClick={handleUploadSelectedImages}
                disabled={isUploadingImages}
              >
                {isUploadingImages ? "Đang thêm ảnh..." : "Thêm ảnh đã chọn"}
              </button>
            </div>
          ) : null}

          <div className="product-edit-image-grid">
            {formData.images.map((image) => (
              <div className="product-edit-image-card" key={`image-${image.id}`}>
                <img src={getImageSrc(image.imageUrl)} alt="Ảnh sản phẩm" />
                <button
                  type="button"
                  className="btn btn--danger btn--small"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Xóa ảnh
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Thông tin sản phẩm</span>
              <h3>Cập nhật thông tin và biến thể</h3>
            </div>
          </div>

          <div className="form-stack">
            <label className="field">
              <span>Tên sản phẩm</span>
              <input className="input-control" name="name" type="text" value={formData.name} onChange={handleFieldChange} />
            </label>

            <label className="field">
              <span>Mô tả</span>
              <input
                className="input-control"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleFieldChange}
              />
            </label>

            <label className="field">
              <span>Danh mục</span>
              <select className="input-control" name="categoryId" value={formData.categoryId} onChange={handleFieldChange}>
                <option value="">-- Chọn danh mục --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="field">
              <span>Biến thể</span>
              <div className="form-stack">
                {formData.variants.map((variant, index) => (
                  <div className="form-grid product-edit-variant-row" key={variant.id || `variant-${index}`}>
                    <input
                      className="input-control"
                      placeholder="Khối lượng (ví dụ: 250g)"
                      value={variant.weight}
                      onChange={(event) => handleVariantChange(index, "weight", event.target.value)}
                    />
                    <input
                      className="input-control"
                      type="number"
                      min="0"
                      placeholder="Giá"
                      value={variant.price}
                      onChange={(event) => handleVariantChange(index, "price", event.target.value)}
                    />
                    <input
                      className="input-control"
                      type="number"
                      min="0"
                      placeholder="Tồn kho"
                      value={variant.stock}
                      onChange={(event) => handleVariantChange(index, "stock", event.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn--danger btn--small"
                      onClick={() => removeVariant(index)}
                    >
                      Xóa biến thể
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn--ghost btn--small" onClick={addVariant}>
                + Thêm biến thể
              </button>
            </div>

            <div className="toolbar toolbar--end">
              <button type="button" className="btn btn--ghost" onClick={() => navigate("/admin/products")}>
                Quay lại
              </button>
              <button type="button" className="btn btn--danger" onClick={handleDelete}>
                Xóa sản phẩm
              </button>
              <button type="button" className="btn btn--primary" onClick={handleEdit} disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
