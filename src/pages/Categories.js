import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  useEffect(() => {
    fetch("http://localhost:5224/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data.data || data));

    fetch("http://localhost:5224/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.data || data));
  }, []);

  const handleSelect = (cat) => {
    setSelected(cat);
  };
  const handleAdd = () => {
    if (!newName) return alert("Nhập tên");

    const newItem = {
      id: Date.now(),
      name: newName,
      description: newDesc
    };

    setCategories([...categories, newItem]);
    setNewName("");
    setNewDesc("");
  };
  const handleDelete = (cat) => {
    const hasProduct = products.some(
      p => p.categoryName === cat.name
    );

    if (hasProduct) {
      alert("Không thể xóa vì còn sản phẩm");
      return;
    }

    setCategories(categories.filter(c => c.id !== cat.id));
  };
  const handleEdit = (cat) => {
    const newName = prompt("Tên mới:", cat.name);
    if (!newName) return;

    const updated = categories.map(c =>
      c.id === cat.id ? { ...c, name: newName } : c
    );

    setCategories(updated);
  };
  const filteredProducts = products.filter(
    p => p.categoryName === selected?.name
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Tên category"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />

        <input
          placeholder="Mô tả"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />

        <button style={btn} onClick={handleAdd}>
          + Add
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "300px" }}>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat)}
              style={{
                 border: "4px solid #0f0f0f",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  selected?.id === cat.id ? "#1c9464" : "#f1f1f1",
                color:
                  selected?.id === cat.id ? "#fff" : "#000"
              }}
            >
              <b>{cat.name}</b>
              <p style={{ fontSize: "12px" }}>{cat.description}</p>

              <div style={{ marginTop: "5px" }}>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button
                  onClick={() => handleDelete(cat)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>
            Products of: {selected?.name || "..." }
          </h3>

          <div style={grid}>
            {filteredProducts.map(p => (
              <div key={p.id} style={card}>
                <img
                  src={`http://localhost:5224/images/${p.urlImgMain}`}
                  alt=""
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h4>{p.name}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
const btn = {
  background: "#000",
  color: "#fff",
  padding: "6px 12px",
  marginLeft: "5px",
  borderRadius: "6px",
  border: "none"
};

const grid = {
 
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "10px"
};

const card = {
  
  background: "#fff",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
};