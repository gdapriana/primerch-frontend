import { CartContextType } from "@/helpers/type/cart.type";
import { createContext } from "react";

export const CartContext = createContext<CartContextType | null>(null);
