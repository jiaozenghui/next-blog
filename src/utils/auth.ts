import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession, AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "+1 (555) 789012",
        },
        veriCode: {
          label: "Verification Code",
          type: "text",
          placeholder: "123456",
        },
        type: {
          label: "Type",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (credentials?.type === "account") {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          try {
            const response = await fetch(
              `${process.env.API_BASE_URL}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: credentials.email,
                  password: credentials.password,
                }),
              }
            );
            if (!response.ok) {
              return null;
            }

            const data = await response.json();
            if (data?.data?.token) {
              return {
                id: data?.data?.user?.id.toString(),
                name: data?.data?.user?.username,
                email: data?.data?.user?.email,
                token: data.data.token,
                user: data?.data?.user,
              };
            }
            return null;
          } catch (error) {
            console.log(error);
            return null;
          }
        } else {
          if (!credentials?.phoneNumber || !credentials?.veriCode) {
            return null;
          }

          try {
            const response = await fetch(
              `${process.env.API_BASE_URL}/auth/loginByphone`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  phoneNumber: credentials.phoneNumber,
                  veriCode: credentials.veriCode,
                }),
              }
            );
            if (!response.ok) {
              return null;
            }

            const data = await response.json();
            if (data?.data) {
              return {
                id: data?.data?.user?.id?.toString(),
                name: data?.data?.user?.username,
                email: data?.data?.user?.email,
                token: data.data,
                user: data?.data?.user,
              };
            }
            return null;
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/users/current`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.accessToken}` || "",
          },
        }
      );
      const data = await response.json();
      if (!response.ok || data.errno !== 0) {
        session = null;
        //throw new Error(`Can't find the user`);
      } else {
        session.user = data.data;
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
