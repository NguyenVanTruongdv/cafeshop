import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    categoryName: "",
    image: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5224/api/products")
      .then((response) => response.json())
      .then((data) => {
        const list = data.data || data;
        setProducts(list);
      });

    fetch("http://localhost:5224/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const list = data.data || data;
        setCategories(list);
      });
  }, []);

  const categoryCoverage = useMemo(() => {
    return new Set(products.map((product) => product.categoryName).filter(Boolean)).size;
  }, [products]);

  const imageCoverage = products.filter((product) => product.urlImgMain).length;

  const handleChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value
    });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({
        ...newProduct,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description,
      categoryName: newProduct.categoryName,
      urlImgMain: newProduct.image
    };

    setProducts([newItem, ...products]);
    setNewProduct({
      name: "",
      description: "",
      categoryName: "",
      image: ""
    });
    setShowForm(false);
  };

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--rose">
        <div className="page-banner__content">
          <span className="hero-badge">Product showroom</span>
          <h2>Danh sach san pham da duoc nang cap thanh mot kho trinh bay co nhan dien ro.</h2>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Tong san pham</span>
            <strong>{products.length}</strong>
            <small>Mat hang dang hien trong kho</small>
          </div>
          <div className="hero-stat">
            <span>Danh muc phu song</span>
            <strong>{categoryCoverage}</strong>
            <small>So nhom da co san pham thuoc ve</small>
          </div>
          <div className="hero-stat">
            <span>Card co hinh</span>
            <strong>{imageCoverage}</strong>
            <small>Ty le hinh anh giup bo cuc day hon</small>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="toolbar toolbar--space-between toolbar--wrap">
          <div>
            <span className="panel__eyebrow">Catalog actions</span>
            <h3 className="toolbar__title">Quan ly san pham</h3>
          </div>

          <button type="button" className="btn btn--primary" onClick={() => setShowForm(true)}>
            Them san pham
          </button>
        </div>

        <div className="card-grid card-grid--products">
          {products.length ? (
            products.map((product) => {
              const imageSrc = product.urlImgMain?.startsWith("data:")
                ? product.urlImgMain
                : product.urlImgMain
                  ? `http://localhost:5224/images/${product.urlImgMain}`
                  : "";

              return (
                <div
                  key={product.id}
                  className="product-tile"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="product-tile__media">
                    {imageSrc ? (
                      <img className="product-tile__image" src={imageSrc} alt={product.name} />
                    ) : (
                      <div className="product-tile__placeholder">No image</div>
                    )}
                    <span className="product-tile__badge">
                      {product.categoryName || "Chua phan loai"}
                    </span>
                  </div>

                  <div className="product-tile__body">
                    <div className="product-tile__header">
                      <strong>{product.name}</strong>
                      <span>Chi tiet</span>
                    </div>
                    <p>
                      {product.description ||
                        "Mo the nay de xem thong tin chi tiet, bien the va hinh anh san pham."}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state empty-state--card-grid">
              <strong>Chua co san pham nao</strong>
              <p>Ban co the bat dau bang nut Them san pham o goc tren ben phai.</p>
            </div>
          )}
        </div>
      </section>

      {showForm ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="panel__header">
              <div>
                <span className="panel__eyebrow">Create product</span>
                <h3>Them san pham moi</h3>
              </div>
            </div>

            <div className="form-stack">
              <label className="field">
                <span>Ten san pham</span>
                <input
                  className="input-control"
                  name="name"
                  placeholder="Nhap ten san pham"
                  value={newProduct.name}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>Mo ta</span>
                <input
                  className="input-control"
                  name="description"
                  placeholder="Mo ta ngan gon de hien tren card"
                  value={newProduct.description}
                  onChange={handleChange}
                />
              </label>

              <label className="field">
                <span>Danh muc</span>
                <select
                  className="input-control"
                  name="categoryName"
                  value={newProduct.categoryName}
                  onChange={handleChange}
                >
                  <option value="">-- Chon category --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Hinh anh</span>
                <input className="input-control input-control--file" type="file" onChange={handleImage} />
              </label>

              {newProduct.image ? (
                <div className="upload-preview">
                  <img src={newProduct.image} alt="Preview" />
                </div>
              ) : null}

              <div className="toolbar toolbar--end">
                <button type="button" className="btn btn--ghost" onClick={() => setShowForm(false)}>
                  Huy
                </button>
                <button type="button" className="btn btn--primary" onClick={handleAdd}>
                  Luu san pham
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
