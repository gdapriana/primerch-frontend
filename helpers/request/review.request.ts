import api from "@/helpers/api/api";
import { Response } from "@/helpers/type/response.type";
import { CreateReviewRequest } from "@/helpers/type/review.type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export class ReviewRequest {
  static async QUERY(
    productId: string,
    query?: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(
        `/products/${productId}/reviews?${query ? query : ""}`,
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
      loading?.setLoadingValue(false);
    }
  }
  static async TOTAL(
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products/${productId}/total-reviews`);
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
  static async CHECK_IS_REVIEWED(
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/products/${productId}/check-review`);
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
  static async CREATE(
    body: CreateReviewRequest,
    productId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.post(`/products/${productId}/review`, body);
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
