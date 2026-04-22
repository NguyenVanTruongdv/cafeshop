import { useEffect, useMemo, useState } from "react";
import { laytatcauser, xoauserv } from "../../services/api";

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
    async function fetchUsers() {
      try {
        const data = await laytatcauser();
        setUsers(data.data || []);
      } catch (error) {
        console.error('Loi khi lay danh sach user:', error);
      }
    }

    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((user) => {
      if (type === "id") {
        return user.id.toString().includes(keyword);
      }

      return user.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [keyword, type, users]);

  const adminCount = users.filter((user) => user.role === "Admin").length;
  const customerCount = users.length - adminCount;

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) {
      alert("Nhap du thong tin");
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "Customer" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Xoa user?");
    if (!ok) {
      return;
    }

    try {
      await xoauserv(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Xoa user khong thanh cong:', error);
      alert('Khong the xoa user. Vui long thu lai');
    }
  };

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--warm">
        <div className="page-banner__content">
          <span className="hero-badge">User center</span>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Tong tai khoan</span>
            <strong>{users.length}</strong>
            <small>Dang hien thi trong bo nho tam</small>
          </div>
          <div className="hero-stat">
            <span>Quan tri vien</span>
            <strong>{adminCount}</strong>
            <small>Danh sach co role Admin</small>
          </div>
          <div className="hero-stat">
            <span>Ket qua tim thay</span>
            <strong>{filtered.length}</strong>
            <small>Cap nhat theo tu khoa va bo loc</small>
          </div>
        </div>
      </section>

      <section className="content-grid content-grid--wide">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Quick create</span>
              <h3>Them nguoi dung moi</h3>
            </div>
          </div>

          <div className="form-stack">
            <label className="field">
              <span>Ho va ten</span>
              <input
                className="input-control"
                placeholder="Nhap ten nguoi dung"
                value={newUser.name}
                onChange={(event) =>
                  setNewUser({ ...newUser, name: event.target.value })
                }
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                className="input-control"
                placeholder="user@example.com"
                value={newUser.email}
                onChange={(event) =>
                  setNewUser({ ...newUser, email: event.target.value })
                }
              />
            </label>

            <label className="field">
              <span>Vai tro</span>
              <select
                className="input-control"
                value={newUser.role}
                onChange={(event) =>
                  setNewUser({ ...newUser, role: event.target.value })
                }
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </label>

            <button type="button" className="btn btn--primary" onClick={handleAdd}>
              Them nguoi dung
            </button>
          </div>
        </article>

        <article className="panel">
          <div className="toolbar toolbar--wrap">
            <div className="toolbar__group toolbar__group--grow">
              <input
                className="input-control"
                placeholder="Tim theo ten hoac ma ID"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <select
                className="input-control input-control--select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="name">Theo ten</option>
                <option value="id">Theo ID</option>
              </select>
            </div>

            <div className="toolbar__group">
              <span className="status-badge status-badge--neutral">{customerCount} customer</span>
              <span className="status-badge status-badge--accent">{adminCount} admin</span>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ma user</th>
                  <th>Ten</th>
                  <th>Email</th>
                  <th>Vai tro</th>
                  <th>Thao tac</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length ? (
                  filtered.map((user) => (
                    <tr key={user.id}>
                      <td>USER{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.role === "Admin"
                              ? "status-badge--accent"
                              : "status-badge--success"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn--danger btn--small"
                          onClick={() => handleDelete(user.id)}
                        >
                          Xoa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state empty-state--table">
                        <strong>Khong tim thay nguoi dung phu hop</strong>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}
