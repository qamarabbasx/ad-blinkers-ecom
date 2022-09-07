import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If it contains , increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // else return new array with modified  cardItems/ new cart Item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  // intial context values
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  useEffect(() => {
    // cart count code
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};