import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return moneyFormatter.format(value || 0);
}

export default function ProductDetail() {
  const { id } = useParams();
  const fileRef = useRef();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5224/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);

        const main = data.images?.find((image) => image.isMain);
        setMainImage(main?.imageUrl || data.images?.[0]?.imageUrl || "");

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      });
  }, [id]);

  const currentImage = useMemo(() => {
    if (!mainImage) {
      return "";
    }

    return mainImage.startsWith("data:")
      ? mainImage
      : `http://localhost:5224/images/${mainImage}`;
  }, [mainImage]);

  const handleChooseImage = () => {
    fileRef.current.click();
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Ban co chac muon xoa?");
    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:5224/api/products/${id}`, {
        method: "DELETE"
      });

      alert("Xoa thanh cong");
      window.location.href = "/products";
    } catch (error) {
      console.log(error);
      alert("Xoa that bai");
    }
  };

  const handleEdit = async () => {
    try {
      const updated = {
        ...product,
        name: `${product.name} (edited)`
      };

      await fetch(`http://localhost:5224/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
      });

      alert("Update thanh cong");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Update loi");
    }
  };

  if (!product) {
    return (
      <div className="page-shell">
        <div className="panel">
          <div className="empty-state empty-state--fill">
            <strong>Dang tai thong tin san pham...</strong>
            <p>Du lieu se xuat hien ngay khi API phan hoi.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--rose">
        <div className="page-banner__content">
          <span className="hero-badge">Product detail</span>
          <h2>{product.name}</h2>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Danh muc</span>
            <strong>{product.categoryName || "N/A"}</strong>
            <small>Thong tin nhom san pham</small>
          </div>
          <div className="hero-stat">
            <span>Gia dang chon</span>
            <strong>{formatCurrency(selectedVariant?.price)}</strong>
            <small>Cap nhat theo bien the hien tai</small>
          </div>
          <div className="hero-stat">
            <span>Ton kho</span>
            <strong>{selectedVariant?.stock || 0}</strong>
            <small>{product.variants?.length || 0} bien the dang co</small>
          </div>
        </div>
      </section>

      <section className="detail-layout">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Gallery</span>
              <h3>Hinh anh san pham</h3>
            </div>
          </div>

          {currentImage ? (
            <img className="detail-image" src={currentImage} alt={product.name} />
          ) : (
            <div className="detail-image detail-image--placeholder">No image</div>
          )}

          <div className="thumb-row">
            {product.images?.map((image) => (
              <button
                key={image.imageUrl}
                type="button"
                className={`thumb-button${mainImage === image.imageUrl ? " is-active" : ""}`}
                onClick={() => setMainImage(image.imageUrl)}
              >
                <img src={`http://localhost:5224/images/${image.imageUrl}`} alt={product.name} />
              </button>
            ))}
          </div>

          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleImage}
          />

          <button type="button" className="btn btn--ghost" onClick={handleChooseImage}>
            Doi anh hien thi
          </button>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Information</span>
              <h3>Thong tin va bien the</h3>
            </div>
          </div>

          <div className="form-stack">
            <label className="field">
              <span>Mo ta</span>
              <input
                className="input-control"
                type="text"
                value={product.description || ""}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    description: event.target.value
                  })
                }
              />
            </label>

            <div className="field">
              <span>Chon trong luong</span>
              <div className="variant-row">
                {product.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`variant-chip${
                      selectedVariant?.id === variant.id ? " is-active" : ""
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>Price</span>
                <input
                  className="input-control"
                  type="number"
                  value={selectedVariant?.price || ""}
                  onChange={(event) => {
                    if (!selectedVariant) {
                      return;
                    }

                    setSelectedVariant({
                      ...selectedVariant,
                      price: event.target.value
                    });
                  }}
                />
              </label>

              <label className="field">
                <span>Stock</span>
                <input
                  className="input-control"
                  type="number"
                  value={selectedVariant?.stock || ""}
                  onChange={(event) => {
                    if (!selectedVariant) {
                      return;
                    }

                    setSelectedVariant({
                      ...selectedVariant,
                      stock: event.target.value
                    });
                  }}
                />
              </label>
            </div>

            <div className="toolbar toolbar--end">
              <button type="button" className="btn btn--primary" onClick={handleEdit}>
                Edit product
              </button>
              <button type="button" className="btn btn--danger" onClick={handleDelete}>
                Delete product
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
