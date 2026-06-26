import { createContext, useContext, useState, type ReactNode } from "react";

export type Customization = {
  quantity?: number;
  size?: string;
  material?: string;
  paper?: string;
  printing?: string;
  lamination?: string;
  notes?: string;
  file?: string;
};

export type CartItem = {
  id: number;
  name: string;
  category: string;
  image: string;

  // New
  customized: boolean;
  customization: Customization | null;
};

type CartContextType = {
  items: CartItem[];

  addToCart: (item: Omit<CartItem, "customized" | "customization">) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;

  updateCustomization: (id: number, customization: Customization) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "customized" | "customization">) => {
    setItems((prev) => {
      const alreadyExists = prev.find(
        (product) =>
          product.name === item.name && product.category === item.category,
      );

      if (alreadyExists) return prev;

      return [
        ...prev,
        {
          ...item,
          customized: false,
          customization: null,
        },
      ];
    });
  };

  const updateCustomization = (id: number, customization: Customization) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              customized: true,
              customization,
            }
          : item,
      ),
    );
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        updateCustomization,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
