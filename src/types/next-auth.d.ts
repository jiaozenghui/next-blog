
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id:number
      _id: string
      name: string
      email: string
      phoneNumber: string
      createdAt: string
      updatedAt: string
    }
  }

  interface User {
    token: string
    user: {
      id:number
      _id: string
      name: string
      email: string
      phoneNumber: string
      createdAt: string
      updatedAt: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    user?: {
      id:number
      _id: string
      name: string
      email: string
      phoneNumber: string
      createdAt: string
      updatedAt: string
    }
  }
}