import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Customization = {
  quantity?: number;

  material?: string;

  paper?: string;

  size?: string;

  lamination?: string;

  printing?: string;

  color?: string;

  notes?: string;

  file?: File;

  fileName?: string;

  fileUrl?: string;
};

export type CartItem = {
  id: number;

  name: string;

  category: string;

  image: string;

  addedAt: number;

  customized: boolean;

  customization?: Customization;
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
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("eventcanvas-cart");

    if (!savedCart) return [];

    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("eventcanvas-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, "customized" | "customization">) => {
    setItems((prev) => {
      const exists = prev.find(
        (product) =>
          product.name === item.name && product.category === item.category,
      );

      if (exists) {
        return prev;
      }

      return [
        ...prev,
        {
          ...item,
          customized: false,
          customization: {},
        },
      ];
    });
  };
  const updateCustomization = (id: number, customization: Customization) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              customized: true,
              customization,
            }
          : item,
      );

      localStorage.setItem("eventcanvas-cart", JSON.stringify(updated));

      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (!window.confirm("Are you sure you want to clear your QuoteBag?")) {
      return;
    }

    localStorage.removeItem("eventcanvas-cart");

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
