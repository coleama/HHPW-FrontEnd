/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');

    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  const addItemToCart = (item) => {
    setCartData([...cartData, item]);
  };

  const removeItemFromCart = (itemId) => {
    setCartData(cartData.filter((item) => item.id !== itemId));
  };

  console.warn(cartData);
  return (
    <CartContext.Provider value={{ cartData, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
