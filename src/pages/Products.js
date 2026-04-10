import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    categoryName: "",
    image: ""
  });
  useEffect(() => {
    fetch("http://localhost:5224/api/products")
      .then(res => res.json())
      .then(data => {
        const list = data.data || data;
        setProducts(list);
      });
    fetch("http://localhost:5224/api/categories")
      .then(res => res.json())
      .then(data => {
        const list = data.data || data;
        setCategories(list);
      });
  }, []);
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    setShowForm(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          float: "right"
        }}
      >
        + Add Product
      </button>

      <div style={{ clear: "both" }} />
      {showForm && (
        <div style={modalStyle}>
          <div style={formStyle}>
            <h3>Add Product</h3>

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />

            <input
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />
            <select name="categoryName" onChange={handleChange}>
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input type="file" onChange={handleImage} />

            {newProduct.image && (
              <img src={newProduct.image} alt="" width="100" />
            )}

            <br />

            <button onClick={handleAdd}>Save</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div style={gridStyle}>
        {products.map((p) => (
  <div
    key={p.id}
    style={cardStyle}
    onClick={() => navigate(`/products/${p.id}`)}
  >
            <img
              src={
                p.urlImgMain?.startsWith("data:")
                  ? p.urlImgMain
                  : `http://localhost:5224/images/${p.urlImgMain}`
              }
              alt=""
              style={imgStyle}
            />

            <div style={{ padding: "10px" }}>
              <h4>{p.name}</h4>
              <p>{p.categoryName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px"
};

const cardStyle = {
  background: "#fff",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
};

const imgStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const formStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};