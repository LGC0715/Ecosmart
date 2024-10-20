// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const addToCart = (item) => {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex >= 0) {
      // Se o item já está no carrinho, aumenta a quantidade
      const newQuantities = [...quantities];
      newQuantities[itemIndex] += 1;
      setQuantities(newQuantities);
    } else {
      // Adiciona novo item ao carrinho
      setCart([...cart, item]);
      setQuantities([...quantities, 1]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    const newQuantities = [...quantities];
    newCart.splice(index, 1);
    newQuantities.splice(index, 1);
    setCart(newCart);
    setQuantities(newQuantities);
  };

  const updateQuantity = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const clearCart = () => {
    setCart([]);
    setQuantities([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        quantities,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
