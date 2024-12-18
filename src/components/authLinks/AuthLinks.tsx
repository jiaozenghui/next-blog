"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isProtectRoute } from "@/lib/utils";
const AuthLinks = () => {
  const pathname = usePathname();
  const router = useRouter()
  const { data: session } = useSession();
  const [needAuth, setNeedAuth] = useState(false)
  useEffect(() => {
    setNeedAuth(isProtectRoute(pathname))
  }, [pathname])

  const Logout = async () => {
    const param = needAuth ? { callbackUrl: "/login" } : {}
    const data = await signOut({
      redirect: false,
      ...param,
    });
    if (data?.url) {
      router.push(data?.url)
    }
  };
  return (
    <>
      {session && session?.user ? (
        <>
          <Link href="/articles/editor" className='header_links'>
            创作文章
          </Link>
          <span className='header_links' onClick={() => Logout()}>
            退出
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex md:hidden " size="icon">
                <User className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='header_links' align="end">
              <DropdownMenuItem>
                <Link  href="/docs" legacyBehavior passHref>
                创作文章
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => Logout()}>
                退出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link href="/login" className='header_links'>
          登录
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
