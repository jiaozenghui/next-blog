
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id:number
      _id: string
      name: string
      email: string
      phone: string
      department_id: number
      status: number
      last_login: string
      created_at: string
      updated_at: string

    }
  }

  interface User {
    token: string
    user: {
      _id:string,
      username: string,
      email: string,
      type: string,
      role: string,
      createdAt: string,
      updatedAt: string,
      id: number
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    user?: {
      _id:string,
      username: string,
      email: string,
      type: string,
      role: string,
      createdAt: string,
      updatedAt: string,
      id: number
    }
  }
}