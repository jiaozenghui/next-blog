import axios from "axios";
import {
  handleAuthError,
  handleConfigureAuth,
  handleGeneralError,
  handleNetworkError,
} from "./tools";

const apiClient = axios.create({
  ...(typeof window !== "undefined"
    ? {}
    : { baseURL: process.env.API_BASE_URL }),
});

type Fn = (data: FcResponse<any>) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

export interface FcResponse<T> {
  errno: number;
  message: string;
  data: T;
}
// 请求拦截器
apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      config = await handleConfigureAuth(config);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    if (typeof window !== "undefined") {
      handleAuthError(response.data.errno);
      handleGeneralError(response.data.errno, response.data.message);
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {}); // 返回一个空 Promise 取消请求不触发 catch
    }
    if (typeof window !== "undefined") {
      handleNetworkError(error?.response?.status);
    }

    return Promise.reject({
      ...error.response?.data,
      status: error.response?.status,
    });
  }
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  config: IAnyObj = {},
  clearFn?: Fn

): Promise<{e:any, r:FcResponse<T> | undefined}> =>
  new Promise((resolve) => {
    apiClient
      .get(url, { params, ...config })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve({e:null, r: res as FcResponse<T>});
      })
      .catch((err) => {
        resolve({e:err, r:undefined});
      });
  });

export const Delete = <T>(
  url: string,
  config: IAnyObj = {},
  clearFn?: Fn
): Promise<{e:any, r:FcResponse<T> | undefined}> =>
  new Promise((resolve) => {
    apiClient
      .delete(url, { ...config })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve({e:null, r:res as FcResponse<T>});
      })
      .catch((err) => {
        resolve({e:err, r:undefined});
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<{e:any, r:FcResponse<T> | undefined}> => {
  return new Promise((resolve) => {
    apiClient
      .post(url, data, { ...config })
      .then((result) => {
        resolve({e:null, r:result.data as FcResponse<T>});
      })
      .catch((err) => {
        resolve({e:err, r:undefined});
      });
  });
};

export const Patch = <T>(
  url: string,
  data: IAnyObj,
  config: IAnyObj = {}
): Promise<{e:any, r:FcResponse<T> | undefined}> => {
  return new Promise((resolve) => {
    apiClient
      .patch(url, data, { ...config })
      .then((result) => {
        resolve({e:null, r:result.data as FcResponse<T>});
      })
      .catch((err) => {
        resolve({e:err, r:undefined});
      });
  });
};

export default apiClient;
