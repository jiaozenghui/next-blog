"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { menuProps } from "@/constants";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: menuProps[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex flex-col space-x-0 space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.id}

          href={item.external ? `${item.id}` : `/articles/${item.id}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.id
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
