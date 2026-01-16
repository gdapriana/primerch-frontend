import { CartContext } from "@/helpers/context/cart/cart.context";
import { useContext } from "react";

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
