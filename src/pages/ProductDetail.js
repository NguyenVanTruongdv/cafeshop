import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const fileRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5224/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);

        const main = data.images?.find(i => i.isMain);
        setMainImage(main?.imageUrl);

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      });
  }, [id]);
  const handleChooseImage = () => {
    fileRef.current.click();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5224/api/products/${id}`, {
        method: "DELETE"
      });

      alert("Xóa thành công");
      window.location.href = "/products";
    } catch (err) {
      console.log(err);
      alert("Xóa thất bại");
    }
  };
  const handleEdit = async () => {
    try {
      const updated = {
        ...product,
        name: product.name + " (edited)"
      };

      await fetch(`http://localhost:5224/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
      });

      alert("Update thành công");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Update lỗi");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px", display: "flex", gap: "40px" }}>
      <div>
        <img
          src={
            mainImage?.startsWith("data:")
              ? mainImage
              : `http://localhost:5224/images/${mainImage}`
          }
          alt=""
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {product.images?.map((img) => (
            <img
              key={img.imageUrl}
              src={`http://localhost:5224/images/${img.imageUrl}`}
              alt=""
              width="70"
              height="70"
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
              onClick={() => setMainImage(img.imageUrl)}
            />
          ))}
        </div>
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={handleImage}
        />

        <button onClick={handleChooseImage} style={{ marginTop: "10px" }}>
          Edit Images
        </button>
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.categoryName}</p>
        <div style={{ marginTop: "10px" }}>
  <label>Description: </label>
  <input
    type="text"
    value={product.description || ""}
    onChange={(e) =>
      setProduct({
        ...product,
        description: e.target.value
      })
    }
    style={{
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "300px",
      marginLeft: "10px"
    }}
  />
</div>

        <h4>Chọn trọng lượng:</h4>

        <div style={{ display: "flex", gap: "10px" }}>
          {product.variants?.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border:
                  selectedVariant?.id === v.id
                    ? "2px solid black"
                    : "1px solid #ccc",
                background:
                  selectedVariant?.id === v.id ? "#000" : "#fff",
                color:
                  selectedVariant?.id === v.id ? "#fff" : "#000"
              }}
            >
              {v.weight}
            </button>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
  <label>Price: </label>
  <input
    type="number"
    value={selectedVariant?.price || ""}
    onChange={(e) => {
      const newPrice = e.target.value;

      setSelectedVariant({
        ...selectedVariant,
        price: newPrice
      });
    }}
    style={{
      padding: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "120px",
      marginLeft: "10px"
    }}
  />
  <span> đ</span>
</div>

        <div style={{ marginTop: "10px" }}>
  <label>Stock: </label>
  <input
    type="number"
    value={selectedVariant?.stock || ""}
    onChange={(e) => {
      const newStock = e.target.value;

      setSelectedVariant({
        ...selectedVariant,
        stock: newStock
      });
    }}
    style={{
      padding: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "80px",
      marginLeft: "10px"
    }}
  />
</div>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={handleEdit}
            style={{
              background: "blue",
              color: "#fff",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            Edit Product
          </button>

          <button
            onClick={handleDelete}
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}