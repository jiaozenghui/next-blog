import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function authMiddleware(req, res, next) {
  // 获取当前会话
  const session = await getToken(req);
  console.log(session);
  // 如果没有会话，则重定向到登录页面
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  } else {
    NextResponse.next();
  }
}

export const config = {
  matcher: ["/articles/:path*", "/dashboard/:path*"],
};
