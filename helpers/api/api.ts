import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

interface FailedRequestPromise {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}

interface RetriedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing: boolean = false;
let failedQueue: FailedRequestPromise[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error("Token resolution failed unexpectedly."));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetriedAxiosRequestConfig;
    const statusCode = error.response ? error.response.status : null;
    if (
      statusCode === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      try {
        const refreshResponse: AxiosResponse<{
          result: { item: { newAccessToken: string } };
        }> = await api.get("/refresh-token");
        const newAccessToken = refreshResponse.data.result.item.newAccessToken;
        Cookies.set(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);
        processQueue(null, newAccessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return api(originalRequest);
      } catch (refreshError: any) {
        const refreshStatusCode = refreshError.response
          ? refreshError.response.status
          : null;
        if (refreshStatusCode === 401) {
          console.error(
            "Refresh token expired or invalid. Please login again!.",
          );
          Cookies.remove(ACCESS_TOKEN_STORAGE_KEY);
          processQueue(refreshError, null);
          // window.location.href = "/login";
        } else {
          processQueue(refreshError, null);
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
