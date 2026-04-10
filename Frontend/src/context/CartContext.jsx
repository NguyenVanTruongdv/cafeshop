// File: src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:5224/api';

export const CartContext = createContext();

const getStoredCart = () => {
  const stored = localStorage.getItem('cartItems');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const mapCartItemResponse = (item) => ({
  id: item.id ?? item.Id,
  variantId: item.variantId ?? item.VariantId ?? item.VariantID,
  qty: item.quantity ?? item.Quantity ?? item.qty ?? 1,
  price: Number(item.price ?? item.Price ?? 0),
  name: item.productName ?? item.ProductName ?? item.name ?? 'Sản phẩm',
  image: item.image ?? item.urlImgMain ?? item.imageUrl ?? item.ImageUrl ?? ''
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, isAuthenticated, token } = useAuth();

  const saveLocalCart = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const handleApiError = async (res) => {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || 'Lỗi kết nối giỏ hàng');
  };

  const loadCart = async () => {
    if (!isAuthenticated || !user) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/cart/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return handleApiError(res);
      const data = await res.json();
      const items = (data?.data?.cartItems ?? []).map(mapCartItemResponse);
      setCartItems(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCartItems(getStoredCart());
    }
  }, [isAuthenticated, user]);

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated && user) {
      const variantId = product.variantId ?? product.Variants?.[0]?.id ?? product.variantID ?? product.id;
      try {
        const res = await fetch(`${API_URL}/cart/add-item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            variantId,
            quantity,
          }),
        });
        if (!res.ok) return handleApiError(res);
        const response = await res.json();
        const item = mapCartItemResponse(response?.data ?? {});
        setCartItems((prev) => {
          const existing = prev.find((x) => x.id === item.id || x.variantId === item.variantId);
          if (existing) {
            return prev.map((x) =>
              x.id === existing.id || x.variantId === existing.variantId
                ? { ...x, qty: item.qty, price: item.price, name: item.name }
                : x
            );
          }
          return [...prev, item];
        });
      } catch (err) {
        setError(err.message);
      }
    } else {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id || item.variantId === product.variantId);
        const updated = existingItem
          ? prev.map((item) =>
              item.id === existingItem.id
                ? {
                    ...item,
                    qty: item.qty + quantity,
                    price: Number(product.price ?? item.price),
                    name: product.name ?? item.name,
                    image: product.image ?? item.image,
                  }
                : item
            )
          : [
              ...prev,
              {
                id: product.id ?? product.variantId,
                variantId: product.variantId,
                qty: quantity,
                price: Number(product.price ?? 0),
                name: product.name ?? 'Sản phẩm',
                image: product.image ?? '',
              },
            ];
        saveLocalCart(updated);
        return updated;
      });
    }
    alert(`Đã thêm ${product.name ?? 'sản phẩm'} vào giỏ!`);
  };

  const updateItemQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return removeItem(cartItemId);

    if (isAuthenticated && user) {
      try {
        const res = await fetch(`${API_URL}/cart/update-item`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartItemId,
            quantity,
          }),
        });
        if (!res.ok) return handleApiError(res);
        const response = await res.json();
        const item = mapCartItemResponse(response?.data ?? {});
        setCartItems((prev) =>
          prev.map((x) =>
            x.id === item.id || x.variantId === item.variantId
              ? { ...x, qty: item.qty, price: item.price, name: item.name }
              : x
          )
        );
      } catch (err) {
        setError(err.message);
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.map((item) =>
          item.id === cartItemId || item.variantId === cartItemId
            ? { ...item, qty: quantity }
            : item
        );
        saveLocalCart(updated);
        return updated;
      });
    }
  };

  const removeItem = async (cartItemId) => {
    if (isAuthenticated && user) {
      try {
        const res = await fetch(`${API_URL}/cart/remove-item/${cartItemId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return handleApiError(res);
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId && item.variantId !== cartItemId));
      } catch (err) {
        setError(err.message);
      }
    } else {
      setCartItems((prev) => {
        const updated = prev.filter((item) => item.id !== cartItemId && item.variantId !== cartItemId);
        saveLocalCart(updated);
        return updated;
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    saveLocalCart([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        loadCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};