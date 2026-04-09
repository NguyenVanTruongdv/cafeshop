import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRouter />
      </Router>
    </CartProvider>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import Login from "./components/Login";

const API_URL = "http://localhost:5224/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [addresses, setAddresses] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAddresses([]);
  };

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${API_URL}/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) return handleLogout();
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  const saveAddress = async (lat, lng, detail) => {
    try {
      const res = await fetch(`${API_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          addressDetail: detail,
          latitude: lat,
          longitude: lng,
        }),
      });

      const newAddress = await res.json();
      setAddresses((prev) => [...prev, newAddress]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    saveAddress(lat, lng, "Chọn trên bản đồ");
    setSelectedPosition({ lat, lng });
  };

  const cleanAddress = (input) => {
    return input.replace(/^\d+[A-Za-z\-\/]*/, "").trim();
  };

  const handleSearchAddress = async () => {
    if (!addressInput.trim()) {
      alert("Nhập địa chỉ đi 😅");
      return;
    }

    try {
      const cleaned = cleanAddress(addressInput);

      const query = encodeURIComponent(cleaned + ", Vietnam");

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`,
        {
          headers: {
            "User-Agent": "my-app (email@example.com)",
          },
        },
      );

      const data = await res.json();
      console.log("DEBUG:", data);

      if (!data || data.length === 0) {
        alert("Không tìm thấy địa chỉ");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      await saveAddress(lat, lng, addressInput);

      setSelectedPosition({ lat, lng });

      setAddressInput("");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tìm địa chỉ");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchAddress();
    }
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleLogout}>Logout</button>

      <h2>Map của bạn</h2>

      {/* SEARCH */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Nhập địa chỉ..."
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: "300px", marginRight: "10px" }}
        />

        <button onClick={handleSearchAddress}>Tìm & lưu</button>
      </div>

      {/* MAP */}
      <Map
        onSelect={handleMapClick}
        savedAddresses={addresses}
        selectedPosition={selectedPosition}
      />
    </div>
  );
}

export default App;

