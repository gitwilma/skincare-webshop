"use client";

import { Product } from "@prisma/client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  formData: FormData;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  isHydrated: boolean;
  clearCart: () => void;
}

interface FormData {
  name: string;
  email: string;
  address: string;
}

const CartContext = createContext({} as CartContextValue);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
  });

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const storedFormData = JSON.parse(localStorage.getItem("formData") || "{}");
  
      if (Array.isArray(storedCart)) {
        setCart(storedCart);
      }
  
      if (storedFormData && typeof storedFormData === "object") {
        setFormData(storedFormData);
      }
  
      setIsHydrated(true); // 🟢 Flagga att localStorage är laddad
    } catch (err) {
      console.error("Fel vid inläsning från localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      );

      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const clearCart = () => {
    setCart([]);
    setFormData({ name: "", email: "", address: "" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        formData,
        updateQuantity,
        updateFormData,
        clearCart,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
