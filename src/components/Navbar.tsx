import Image from "next/image";
import Link from "next/link";

import { HeaderMenu } from "./Menu";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import AuthLinks from "./authLinks/AuthLinks";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <section className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
      <div className="max-w-8xl mx-auto ">
        <div className="flex h-16 items-center justify-between  py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="flex">
            <MobileMenu />
            <Link href="/" className="hidden   lg:flex cursor-pointer items-center gap-1">
              <Image src="/icons/logo.png" alt="logo" width={30} height={30} />
              <h1 className="text-24 font-extrabold    ml-2">Jzh个人博客</h1>
            </Link>
            <HeaderMenu />
          </div>
          <div className="flex items-center gap-2">
            <SearchInput></SearchInput>
            <ThemeToggle />
            <AuthLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
