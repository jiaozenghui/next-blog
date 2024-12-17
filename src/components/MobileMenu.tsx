import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarNav } from "./SiderBar";
import { menuList } from "@/constants";

export function MobileMenu() {
  return (
    <Sheet key='left'>
      <SheetTrigger className="lg:hidden" asChild>
        <Image
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          alt="menu"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
            >
              <Image
                src="/icons/logo.png"
                alt="logo"
                width={23}
                height={27}
              />
              <h1 className="text-24 font-extrabold    ml-2">Jzh个人博客</h1>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <SidebarNav items={menuList} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
