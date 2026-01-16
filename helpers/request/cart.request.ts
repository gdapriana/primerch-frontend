import api from "@/helpers/api/api";
import { AddProductToCartRequest } from "@/helpers/type/cart.type";
import { Response } from "@/helpers/type/response.type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export class CartRequest {
  static async GET(loading?: {
    loadingValue: boolean;
    setLoadingValue: Dispatch<SetStateAction<boolean>>;
  }): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get("/cart");
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

  static async ADD_PRODUCT(
    body: AddProductToCartRequest,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.post("/product-in-cart", body);
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
          message: e.response?.data.message,
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

  static async PATCH_QTY(
    mode: "inc" | "dec",
    productInCartId: string,
    loading: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
    cartRefresh: {
      setCartRefreshValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading.setLoadingValue(true);
      cartRefresh.setCartRefreshValue(true);
      const response = await api.patch(
        `/product-in-cart/${productInCartId}/quantity/${mode}`,
      );
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
      cartRefresh.setCartRefreshValue(false);
      loading.setLoadingValue(false);
    }
  }
  static async DELETE_PRODUCT(
    productInCartId: string,
    loading: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading.setLoadingValue(true);
      const response = await api.delete(`/product-in-cart/${productInCartId}`);
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
      loading.setLoadingValue(false);
    }
  }
}
