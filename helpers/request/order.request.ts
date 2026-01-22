import api from "@/helpers/api/api";
import { CreateOrderRequest } from "@/helpers/type/order.type";
import { Response } from "@/helpers/type/response.type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { ORDER_STATUS } from "@/helpers/generated/prisma/enums";

export class OrderRequest {
  static async GET_USER_ORDER(
    take = 5 as number,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/orders?take=${take}`);
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
  static async GET_USER_ORDER_DETAILS(
    orderId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get(`/orders/${orderId}`);
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
  static async GET_ORDER_INFORMATION(loading?: {
    loadingValue: boolean;
    setLoadingValue: Dispatch<SetStateAction<boolean>>;
  }): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.get("/order-information");
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

  static async CREATE_ORDER(
    body: CreateOrderRequest,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ) {
    try {
      loading?.setLoadingValue(true);
      const response = await api.post("/orders", body);
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

  static async UPDATE_ORDER_STATUS(
    body: { status: ORDER_STATUS },
    orderId: string,
    loading?: {
      loadingValue: boolean;
      setLoadingValue: Dispatch<SetStateAction<boolean>>;
    },
  ): Promise<Response> {
    try {
      loading?.setLoadingValue(true);
      const response = await api.patch(`/orders/${orderId}/status`, body);
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
