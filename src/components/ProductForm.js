import { Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function ProductForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    retailPrice: "",
    wholesalePrice: "",
    status: "Còn hàng",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // 🔥 thêm đoạn này
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>

        <TextField
          label="Tên sản phẩm"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Phân loại"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <TextField
          label="Giá bán lẻ"
          name="retailPrice"
          type="number"
          value={formData.retailPrice}
          onChange={handleChange}
        />

        <TextField
          label="Giá bán sỉ"
          name="wholesalePrice"
          type="number"
          value={formData.wholesalePrice}
          onChange={handleChange}
        />

        <TextField
          select
          label="Trạng thái"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Còn hàng">Còn hàng</MenuItem>
          <MenuItem value="Hết hàng">Hết hàng</MenuItem>
        </TextField>

        {/* 🔥 upload ảnh */}
        <div>
          <label>Chọn ảnh sản phẩm</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                marginTop: "10px"
              }}
            />
          )}
        </div>

        <Button variant="contained" type="submit">
          Lưu
        </Button>

      </div>
    </form>
  );
}