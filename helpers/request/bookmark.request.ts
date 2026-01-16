import api from "@/helpers/api/api";
import { Response } from "@/helpers/type/response.type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export class BookmarkRequest {
  static async CHECK(
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products/${productId}/bookmarked-check`);
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
  static async QUERY(
    query?: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/bookmarked`);
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

  static async COUNT_ALL(
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products/${productId}/bookmark-count`);
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

  static async TOGGLE(
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.post(`/products/${productId}/bookmark-toggle`);
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
