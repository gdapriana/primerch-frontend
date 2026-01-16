import api from "@/helpers/api/api";
import { Response } from "@/helpers/type/response.type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export class ProductRequest {
  static async QUERY(
    query?: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products?${query ? query : ""}`);
      return {
        status: response.status,
        message: response.data.message,
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
    } finally {
      loading?.setLoadingValue(false);
    }
  }

  static async GET(
    by: "id" | "slug",
    key: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products/get?by=${by}&key=${key}`);
      return {
        status: response.status,
        message: response.data.message,
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
    } finally {
      loading?.setLoadingValue(false);
    }
  }

  static async GET_STOCK(
    body: { productId?: string; sizeId?: string; colourId?: string },
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.post(`/products/stock`, body);
      return {
        status: response.status,
        message: response.data.message,
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
    } finally {
      loading?.setLoadingValue(false);
    }
  }
}
