
declare namespace NodeJS {
  interface ProcessEnv {
    /** 环境*/
    NODE_ENV: "development" | "production";

    NEXTAUTH_URL: string
    API_BASE_URL:string
    DASHSCOPE_API_KEY:string
    JWT_SECRET:string
  }
}
