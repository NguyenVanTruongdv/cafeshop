import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiConfig";
import MapPicker from "../components/Map";

const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options);
  let data = null;
  try {
    data = await res.json();
  } catch {}
  if (!res.ok) throw new Error(data?.message || `API Error: ${res.status}`);
  return data;
};

const ThanhToan = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [route, setRoute] = useState(null);
  const [shopLocation, setShopLocation] = useState(null);
  const [shopAddress, setShopAddress] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchJson(`${API_URL}/Address`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setAddresses(res.data || []));
  }, [token]);

  const geocodeAddress = async (input) => {
    const query = encodeURIComponent(input + ", Vietnam");
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`,
    );
    const data = await res.json();
    if (!data || data.length === 0) throw new Error("Không tìm thấy địa chỉ");
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display: data[0].display_name,
    };
  };

  const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await res.json();

    if (!data || !data.display_name) return "Không rõ địa chỉ";

    return data.display_name;
  };

  const getRouteData = async (from, to) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    const route = data.routes[0];

    return {
      distance: route.distance / 1000,
      geometry: route.geometry, // 👈 cái này để vẽ
    };
  };

  const saveAddress = async (lat, lng, detail) => {
    const data = await fetchJson(`${API_URL}/Address`, {
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
    const newAddr = data.data;
    setAddresses((prev) => [...prev, newAddr]);
    return newAddr;
  };

  const getNearestAdmin = async (pos) => {
    const res = await fetchJson(
      `${API_URL}/Address/nearest-admin?lat=${pos.lat}&lng=${pos.lng}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log("API RESPONSE:", res);

    if (!res || !res.data) {
      throw new Error("Không tìm thấy shop gần bạn");
    }
    const data = res.data;

    const lat = Number(data.latitude);
    const lng = Number(data.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("Toạ độ shop không hợp lệ");
    }

    return { lat, lng };
  };

  const handleAddNewAddress = async () => {
    try {
      if (!addressInput.trim()) return setError("Nhập địa chỉ đi 😅");

      const geo = await geocodeAddress(addressInput);
      const saved = await saveAddress(geo.lat, geo.lng, geo.display);

      const pos = { lat: geo.lat, lng: geo.lng };

      setSelectedAddressId(saved.id);
      setSelectedPosition(pos);

      // 🔥 gọi API shop gần nhất
      const shop = await getNearestAdmin(pos);
      setShopLocation(shop);

      const shopAddr = await reverseGeocode(shop.lat, shop.lng);
      setShopAddress(shopAddr);

      const result = await getRouteData(shop, pos);

      setDistance(result.distance);
      setShippingFee(Math.round(result.distance * 5000));
      setRoute(result.geometry);

      setAddressInput("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectAddress = async (id) => {
    setSelectedAddressId(id);

    const addr = addresses.find((a) => a.id === Number(id));
    if (!addr) return;

    const pos = {
      lat: Number(addr.latitude),
      lng: Number(addr.longitude),
    };

    setSelectedPosition(pos);

    const shop = await getNearestAdmin(pos);
    setShopLocation(shop);

    const shopAddr = await reverseGeocode(shop.lat, shop.lng);
    setShopAddress(shopAddr);

    const result = await getRouteData(shop, pos);

    setDistance(result.distance);
    setShippingFee(Math.round(result.distance * 5000));
    setRoute(result.geometry);
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddressId) return setError("Chọn địa chỉ trước");
    setLoading(true);
    try {
      const order = await fetchJson(`${API_URL}/Order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          addressId: selectedAddressId,
          paymentMethod: "COD",
        }),
      });
      clearCart();
      alert("Đặt hàng thành công!");
      navigate(`/lich-su-don-hang/${order.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = cartTotal + shippingFee;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>THANH TOÁN</h1>

      <form onSubmit={handlePlaceOrder} style={styles.checkoutWrapper}>
        {/* LEFT */}
        <div style={styles.leftCol}>
          <h2 style={styles.sectionTitle}>ĐỊA CHỈ GIAO HÀNG</h2>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.inputGroup}>
            <input
              placeholder="Nhập địa chỉ mới..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              style={styles.input}
            />
            <button
              type="button"
              onClick={handleAddNewAddress}
              style={styles.smallBtn}
            >
              Thêm
            </button>
          </div>

          <select
            style={styles.input}
            onChange={(e) => handleSelectAddress(e.target.value)}
          >
            <option value="">-- Chọn địa chỉ --</option>
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.addressDetail}
              </option>
            ))}
          </select>

          <div style={styles.mapSection}>
            <MapPicker
              selectedPosition={selectedPosition}
              savedAddresses={addresses}
              route={route}
              shopLocation={shopLocation}
            />
          </div>

          {distance !== null && (
            <div style={styles.shipBox}>
              🚗 {distance.toFixed(2)} km
              <br />
              💰 {shippingFee.toLocaleString()}đ
              <br />
              🏪 Shop gần nhất: {shopAddress}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={styles.rightCol}>
          <div style={styles.orderBox}>
            <h2 style={styles.sectionTitle}>ĐƠN HÀNG</h2>

            {cartItems.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>{(item.price * item.qty).toLocaleString()}đ</span>
              </div>
            ))}

            <hr />

            <div style={styles.itemRow}>
              <strong>Tạm tính</strong>
              <strong>{cartTotal.toLocaleString()}đ</strong>
            </div>

            <div style={styles.itemRow}>
              <span>Ship</span>
              <span>{shippingFee.toLocaleString()}đ</span>
            </div>

            <div style={{ ...styles.itemRow, fontSize: 18, color: "#8B0000" }}>
              <strong>Tổng</strong>
              <strong>{finalTotal.toLocaleString()}đ</strong>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: 1200, margin: "40px auto", padding: 20 },
  pageTitle: { fontSize: 24, color: "#8B0000", marginBottom: 20 },
  checkoutWrapper: { display: "flex", gap: 30, flexWrap: "wrap" },
  leftCol: { flex: 2 },
  rightCol: { flex: 1 },
  sectionTitle: { marginBottom: 15 },
  inputGroup: { display: "flex", gap: 10, marginBottom: 15 },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
    width: "100%",
  },
  smallBtn: {
    padding: "10px 15px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
  },
  mapSection: {
    height: 400,
    marginTop: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  shipBox: { marginTop: 10, padding: 10, background: "#f5f5f5" },
  orderBox: { border: "1px solid #ddd", padding: 20 },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  submitBtn: {
    width: "100%",
    padding: 15,
    background: "#D16B4A",
    color: "#fff",
    border: "none",
  },
  error: { color: "red", marginBottom: 10 },
};

export default ThanhToan;
