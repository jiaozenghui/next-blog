import { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
type ICustomAxiosConfig = InternalAxiosRequestConfig & { needAuth?: boolean };
export const handleConfigureAuth = async (config: ICustomAxiosConfig) => {
  if (typeof window !== "undefined" && config.needAuth) {
    const session = await getSession();
    if (session && session.accessToken) {
      config.headers["authorization"] = `Bearer ${session.accessToken}` || "";
    }
  }
  return config;
};

export const handleNetworkError = (errStatus?: number): void => {
  const networkErrMap: any = {
    "400": "错误的请求", // token 失效
    "401": "未授权，请重新登录",
    "403": "拒绝访问",
    "404": "请求错误，未找到该资源",
    "405": "请求方法未允许",
    "408": "请求超时",
    "500": "服务器端出错",
    "501": "网络未实现",
    "502": "网络错误",
    "503": "服务不可用",
    "504": "网络超时",
    "505": "http版本不支持该请求",
  };
  if (errStatus) {
    toast({
      title: "网络错误",
      description: networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`,
    });
    return;
  }
  toast({
    title: "网络错误",
    description: `无法连接到服务器！`,
  });
};

export const handleAuthError = (errno: string): boolean => {
  const authErrMap: any = {
    101004: "登录失效，需要重新登录", // token 失效
  };

  //if (authErrMap.hasOwnProperty(errno)) {

  if (Object.prototype.hasOwnProperty.call(authErrMap, errno)) {
    toast({
      title: "错误",
      description: authErrMap[errno],
      variant: "destructive",
    });
    window.location.reload();
  }
  return true;
};

export const handleGeneralError = (errno: number, errmsg: string): boolean => {
  if (errno !== 0) {
    toast({
      title: "错误",
      description: errmsg,
    });
    return false;
  }

  return true;
};
