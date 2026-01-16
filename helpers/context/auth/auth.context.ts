import { AuthContextType } from "@/helpers/type/auth.type";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);
