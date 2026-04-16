import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("name");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer"
  });
  useEffect(() => {
    setUsers([
      { id: 1, name: "Admin", email: "admin@gmail.com", role: "Admin" },
      { id: 2, name: "Nguyen Van A", email: "user@gmail.com", role: "Customer" }
    ]);
  }, []);
  const filtered = users.filter((u) => {
    if (type === "id") {
      return u.id.toString().includes(keyword);
    }
    return u.name.toLowerCase().includes(keyword.toLowerCase());
  });
  const handleAdd = () => {
    if (!newUser.name || !newUser.email) {
      alert("Nhập đủ thông tin");
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "Customer" });
  };
  const handleDelete = (id) => {
    const ok = window.confirm("Xóa user?");
    if (!ok) return;

    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="name">Theo tên</option>
          <option value="id">Theo ID</option>
        </select>
      </div>
      <table style={table} border="2">
        <thead>
          <tr>
            <th>Mã user</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>USER{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td style={{ color: u.role === "Admin" ? "blue" : "green" }}>
                {u.role}
              </td>

              <td>
  <button
    onClick={() => handleDelete(u.id)}
    style={deleteBtn}
  >
    Xóa
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const btn = {
  background: "#000",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none"
};
const deleteBtn = {
  background: "pink",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};
const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff"
  
};