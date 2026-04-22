import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../apiConfig";
import {
  laydanhmuc,
  laysanpham,
  taodanhmuc,
  capnhatdanhmuc,
  xoadanhmuc
} from "../../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const getImageSrc = (raw) => {
    if (!raw) return "";
    const base = API_URL.replace(/\/api$/, "");
    const normalized = String(raw).replace(/\\/g, "/");
    const marker = "/wwwroot/images/";
    if (normalized.includes(marker)) {
      const fileName = normalized.split(marker).pop();
      return fileName ? `${base}/images/${fileName}` : "";
    }
    if (normalized.startsWith("data:") || normalized.startsWith("http")) return normalized;
    if (normalized.startsWith("/")) return `${base}${normalized}`;
    if (normalized.startsWith("images/")) return `${base}/${normalized}`;
    if (normalized.startsWith("wwwroot/images/")) return `${base}/${normalized.replace("wwwroot/", "")}`;
    return `${base}/images/${normalized}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([laydanhmuc(), laysanpham()]);
        const list = categoryRes?.data || categoryRes || [];
        setCategories(list);
        setSelected((current) => current || list[0] || null);
        setProducts(productRes?.data || productRes || []);
      } catch (error) {
        console.error("Lỗi tải category/product:", error);
        alert("Tải dữ liệu thất bại. Vui lòng thử lại.");
      }
    };

    loadData();
  }, []);

  const linkedCategoryCount = useMemo(() => {
    return categories.filter((category) =>
      products.some((product) => product.categoryName === category.name)
    ).length;
  }, [categories, products]);

  const filteredProducts = products.filter(
    (product) => product.categoryName === selected?.name
  );

  const handleAdd = async () => {
    if (!newName) {
      alert("Nhap ten category");
      return;
    }

    try {
      const response = await taodanhmuc({
        name: newName,
        description: newDesc
      });
      const created = response?.data || response;
      setCategories([...categories, created]);
      setSelected(created);
      setNewName("");
      setNewDesc("");
    } catch (error) {
      console.error("Lỗi tạo danh mục:", error);
      alert("Tạo danh mục thất bại.");
    }
  };

  const handleDelete = async (category) => {
    const hasProduct = products.some(
      (product) => product.categoryName === category.name
    );

    if (hasProduct) {
      alert("Khong the xoa vi con san pham");
      return;
    }

    try {
      await xoadanhmuc(category.id);
      setCategories(categories.filter((item) => item.id !== category.id));
      if (selected?.id === category.id) {
        setSelected(null);
      }
    } catch (error) {
      console.error("Lỗi xóa danh mục:", error);
      alert("Xóa danh mục thất bại.");
    }
  };

  const handleEdit = async (category) => {
    const updatedName = prompt("Ten moi:", category.name);
    if (!updatedName) {
      return;
    }

    try {
      const response = await capnhatdanhmuc(category.id, {
        name: updatedName,
        description: category.description || ""
      });
      const updatedCategory = response?.data || response || { ...category, name: updatedName };
      const updated = categories.map((item) =>
        item.id === category.id ? updatedCategory : item
      );

      setCategories(updated);
      setSelected((current) =>
        current?.id === category.id ? updatedCategory : current
      );
    } catch (error) {
      console.error("Lỗi cập nhật danh mục:", error);
      alert("Cập nhật danh mục thất bại.");
    }
  };

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--sage">
        <div className="page-banner__content">
          <span className="hero-badge">Category structure</span>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Tong danh muc</span>
            <strong>{categories.length}</strong>
            <small>So nhom san pham dang quan ly</small>
          </div>
          <div className="hero-stat">
            <span>Danh muc co lien ket</span>
            <strong>{linkedCategoryCount}</strong>
            <small>Da co san pham thuoc ve</small>
          </div>
          <div className="hero-stat">
            <span>San pham hien xem</span>
            <strong>{filteredProducts.length}</strong>
            <small>{selected ? `Trong ${selected.name}` : "Chon mot danh muc de xem"}</small>
          </div>
        </div>
      </section>

      <section className="content-grid content-grid--wide">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Create & organize</span>
              <h3>Danh sach danh muc</h3>
            </div>
          </div>

          <div className="form-stack form-stack--compact">
            <label className="field">
              <span>Ten danh muc</span>
              <input
                className="input-control"
                placeholder="Vi du: Hat rang moc"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </label>

            <label className="field">
              <span>Mo ta ngan</span>
              <input
                className="input-control"
                placeholder="Them mo ta ngan de phan biet"
                value={newDesc}
                onChange={(event) => setNewDesc(event.target.value)}
              />
            </label>

            <button type="button" className="btn btn--primary" onClick={handleAdd}>
              Them category
            </button>
          </div>

          <div className="stack-list">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`list-card${selected?.id === category.id ? " list-card--active" : ""}`}
                onClick={() => setSelected(category)}
              >
                <div className="list-card__content">
                  <strong>{category.name}</strong>
                  <p>{category.description || "Chua co mo ta cho danh muc nay."}</p>
                </div>

                <div className="list-card__actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--small"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(category);
                    }}
                  >
                    Sua
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger btn--small"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(category);
                    }}
                  >
                    Xoa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          {selected ? (
            <>
              <div className="panel__header">
                <div>
                  <span className="panel__eyebrow">Selected category</span>
                  <h3>{selected.name}</h3>
                </div>
                <p>{selected.description || "Danh muc nay chua co mo ta chi tiet."}</p>
              </div>

              <div className="summary-list summary-list--compact">
                <div className="summary-item summary-item--soft">
                  <div>
                    <strong>San pham hien co</strong>
                    <span>So item thuoc danh muc da chon</span>
                  </div>
                  <b>{filteredProducts.length}</b>
                </div>
                <div className="summary-item summary-item--soft">
                  <div>
                    <strong>Trang thai</strong>
                    <span>Da san sang de tiep tuc sap xep</span>
                  </div>
                  <b>Active</b>
                </div>
              </div>

              <div className="card-grid card-grid--products">
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="product-tile product-tile--compact">
                      <div className="product-tile__media">
                        <img className="product-tile__image" src={getImageSrc(product.urlImgMain)} alt={product.name} />
                      </div>
                      <div className="product-tile__body">
                        <strong>{product.name}</strong>
                        <p>{product.categoryName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state empty-state--card-grid">
                    <strong>Danh muc nay chua co san pham</strong>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="empty-state empty-state--fill">
              <strong>Chon mot danh muc o ben trai</strong>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
