"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();


  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMode(mode ==='light'? 'dark': 'light')}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          
      </Button>
    </>
  ) : (
    <>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </>
  );
}
