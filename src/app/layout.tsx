import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/auth";
import { META_THEME_COLORS } from "@/config/site";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Jzh个人Blog',
    default: 'Jzh个人Blog',
  },
  keywords:'html、css、js、angular、nodejs、vue、react',
  description: "个人生活、学习记录网站，用于学习前端基数，如html、css、js、angular、nodejs、vue、react等",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
            }
          } catch (_) {}
        `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <AuthProvider session={session}>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
