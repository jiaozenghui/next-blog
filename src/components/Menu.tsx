"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { menuList, menuProps, tagProps } from "@/constants";


export function HeaderMenu() {
  return (
    <NavigationMenu className="hidden md:flex ml-[30px]">
      <NavigationMenuList>
        {menuList.map((item: menuProps) => (
          <NavigationMenuItem key={item.id}>
            {item.children ? (
              <>
                <Link href={`/articles/${item.id}`} legacyBehavior passHref>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <ul className="grid  gap-3 p-4  md:grid-cols-3 w-[300px] ">
                    {item.children.map((tag: tagProps) => (
                      <ListItem
                        key={tag.id}
                        title={tag.label}
                        href={`/articles/${item.id}/${tag.id}`}
                      >
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.external ? `${item.id}` : `/articles/${item.id}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}

      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
