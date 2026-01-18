import { User } from "@/helpers/generated/prisma/client";
import { UserLoginRequest } from "@/helpers/type/user.type";
import { Response } from "@/helpers/type/response.type";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (payload: UserLoginRequest) => Promise<Response>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
