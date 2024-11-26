"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderMenu } from "./Menu";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import AuthLinks from "./authLinks/AuthLinks";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
      <div className="max-w-8xl mx-auto ">
        <div className="flex h-16 items-center justify-between  py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <MobileMenu />
          <Link href="/" className="flex cursor-pointer items-center gap-1">
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold    ml-2">Jzh个人博客</h1>
          </Link>

          <div className="flex items-center gap-2">
            <HeaderMenu />
            <ThemeToggle />
            <AuthLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
