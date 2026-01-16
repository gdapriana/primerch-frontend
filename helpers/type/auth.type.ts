import { User } from "@/helpers/generated/prisma/client";
import { UserLoginRequest } from "@/helpers/type/user.type";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (payload: UserLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
