"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthLinks = () => {
  const router = useRouter();
  const { status } = useSession();
  const Logout = async () => {
    await signOut()
    router.push('/login')
  }
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/articles/editor" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={() => Logout()}>
            Logout
          </span>
        </>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex md:hidden " size="icon">
            <User className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              Write
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>LogOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AuthLinks;
