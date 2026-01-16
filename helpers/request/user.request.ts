import api from "@/helpers/api/api";
import type { Response } from "@/helpers/type/response.type";
import type {
  UserLoginRequest,
  UserRegisterRequest,
} from "@/helpers/type/user.type";
import { AxiosError } from "axios";

export class UserRequest {
  static async LOGIN(body: UserLoginRequest): Promise<Response> {
    try {
      const response = await api.post("/login", body);
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          success: false,
          status: e.response?.status || 401,
          message: e.message,
          details: e.response?.data.details,
        };
      }
      return {
        status: 500,
        success: false,
        data: null,
        message: "something went wrong",
      };
    }
  }
  static async REGISTER(body: UserRegisterRequest): Promise<Response> {
    try {
      const response = await api.post("/register", body);
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          success: false,
          status: e.response?.status || 401,
          message: e.message,
          details: e.response?.data.details,
        };
      }
      return {
        status: 500,
        success: false,
        data: null,
        message: "something went wrong",
      };
    }
  }
  static async LOGOUT(): Promise<void> {}
}
