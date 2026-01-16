"use client";

import { CartContext } from "@/helpers/context/cart/cart.context";
import { CartContextType } from "@/helpers/type/cart.type";
import { ReactNode, useState } from "react";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartRefresh, setCartRefresh] = useState(true);

  const value: CartContextType = {
    cartRefresh,
    setCartRefresh,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
