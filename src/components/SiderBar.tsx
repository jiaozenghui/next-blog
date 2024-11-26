import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    route: string
    label: string
  }[]
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
          key={item.route}
          href={item.route}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.route
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
