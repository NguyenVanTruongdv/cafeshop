import { useState } from "react";
import { Button } from "@mui/material";

export default function Categories() {
  const [categories, setCategories] = useState([
    "Cà phê hạt",
    "Cà phê bột",
    "Espresso"
  ]);

  const addCategory = () => {
    const name = prompt("Nhập tên danh mục");
    if (name) setCategories([...categories, name]);
  };

  return (
    <div>
      <h2>🏷️ Danh mục</h2>

      <Button variant="contained" onClick={addCategory}>
        + Thêm danh mục
      </Button>

      <div style={{ marginTop: "20px" }}>
        {categories.map((c, i) => (
          <div key={i} style={{
            background: "#fff",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "10px"
          }}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}