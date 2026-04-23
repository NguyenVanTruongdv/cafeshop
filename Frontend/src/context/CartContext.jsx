import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { laygiohangbyuserid, themitemvaogiohang, capnhatitemgiohang, xoaitemgiohang, laysanpham } from '../services/api';
import { resolveImageUrl } from '../utils/imageUrl';

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

const mapCartItemResponse = (item) => {
  const rawImage = item.image ?? item.urlImgMain ?? item.imageUrl ?? item.ImageUrl ?? '';
  return {
    id: item.id ?? item.Id,
    productId: item.productId ?? item.ProductId ?? item.productID,
    variantId: item.variantId ?? item.VariantId ?? item.VariantID,
    qty: item.quantity ?? item.Quantity ?? item.qty ?? 1,
    price: Number(item.price ?? item.Price ?? 0),
    name: item.productName ?? item.ProductName ?? item.name ?? 'Sản phẩm',
    image: resolveImageUrl(rawImage),
  };
};

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
      // Lấy giỏ hàng từ backend
      const data = await laygiohangbyuserid(user.id);
      let items = (data?.data?.cartItems ?? []).map(mapCartItemResponse);
      
      // Nếu không có items, return ngay
      if (items.length === 0) {
        setCartItems(items);
        return;
      }
      
      // Fetch danh sách tất cả sản phẩm để lấy ảnh
      try {
        const productsRes = await laysanpham();
        const products = Array.isArray(productsRes) ? productsRes : productsRes?.data || [];
        
        const productImageMap = {};
        const variantImageMap = {};
        const variantNameMap = {};

        products.forEach(product => {
          const imageSource =
            product.urlImgMain ||
            product.image ||
            product.imageUrl ||
            product.ImageUrl ||
            product.Images?.[0]?.imageUrl ||
            product.Images?.[0]?.ImageUrl ||
            product.images?.[0]?.imageUrl ||
            product.images?.[0]?.ImageUrl ||
            '';
          const resolved = resolveImageUrl(imageSource);
          if (resolved) {
            if (product.id != null) {
              productImageMap[product.id] = resolved;
            }
            if (product.name) {
              productImageMap[product.name] = resolved;
            }
          }

          const productName = product.name || product.Name || '';
          const variants = product.Variants || product.variants || [];
          variants.forEach((variant) => {
            if (variant?.id != null) {
              if (resolved) {
                variantImageMap[variant.id] = resolved;
              }
              const variantLabel = variant.weight || variant.Weight || variant.name || variant.Name || '';
              variantNameMap[variant.id] = variantLabel
                ? `${productName}${variantLabel ? ` - ${variantLabel}` : ''}`
                : productName;
            }
          });
        });
        
        items = items.map(item => ({
          ...item,
          name: variantNameMap[item.variantId] || item.name,
          image:
            item.image ||
            variantImageMap[item.variantId] ||
            productImageMap[item.productId] ||
            productImageMap[item.id] ||
            productImageMap[item.name] ||
            ''
        }));
      } catch (imgErr) {
        console.warn('Failed to fetch product images:', imgErr);
        // Nếu lỗi fetch ảnh, vẫn return items (ảnh sẽ là empty)
      }
      
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
      const productId = product.productId ?? product.id ?? product.ProductId;
      const variantId =
        product.variantId ??
        product.variantID ??
        product.VariantId ??
        product.selectedVariant?.id ??
        product.Variants?.[0]?.id;

      try {
        const response = await themitemvaogiohang({
          userId: user.id,
          productId,
          variantId,
          quantity,
        });
        if (response?.data) {
          let item = mapCartItemResponse(response.data);

          if (!item.image && product.image) {
            item = { ...item, image: product.image };
          }

          item = {
            ...item,
            productId: productId ?? item.productId,
            variantId: variantId ?? item.variantId,
            name: product.name || item.name,
          };
          
          setCartItems((prev) => {
            const existing = prev.find(
              (x) => x.productId === item.productId && x.variantId === item.variantId
            );
            if (existing) {
              return prev.map((x) =>
                x.productId === item.productId && x.variantId === item.variantId
                  ? { ...x, qty: item.qty, price: item.price, name: item.name, image: item.image || x.image }
                  : x
              );
            }
            return [...prev, item];
          });
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setCartItems((prev) => {
        const pId = product.id ?? product.productId ?? product.ProductId;
        const vId =
          product.variantId ??
          product.variantID ??
          product.VariantId ??
          product.selectedVariant?.id;

        const existingItem = prev.find((item) => item.productId === pId && item.variantId === vId);
        const updated = existingItem
          ? prev.map((item) =>
              item.productId === pId && item.variantId === vId
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
              id: `${pId}-${vId ?? 'default'}`,
              productId: pId,
              variantId: vId,
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
  };

  const updateItemQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return removeItem(cartItemId);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, qty: newQuantity, quantity: newQuantity }
          : item
      )
    );
    
    if (isAuthenticated && user) {
      try {

        const response = await capnhatitemgiohang({ cartItemId, quantity: newQuantity });
        // Nếu API trả về data khác, update lại
        if (response?.data) {
          const updated = mapCartItemResponse(response.data);
          setCartItems((prev) =>
            prev.map((item) =>
              item.id === cartItemId
                ? {
                    ...item,
                    qty: updated.qty,
                    quantity: updated.qty,
                    price: updated.price || item.price,
                  }
                : item
            )
          );
        }
      } catch (err) {
        console.error("Lỗi:", err);
        loadCart(); 
      }
    }
  };

  const removeItem = async (cartItemId) => {

    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

    
    if (isAuthenticated && user) {
      try {
        await xoaitemgiohang(cartItemId);
      } catch (err) {
        setError(err.message);
        loadCart();
      }
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