"use client";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { KeyboardEvent } from "react";

export default function SearchInput() {
  const goToSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter')
      redirect(`/articles/search/${(event.target as any).value}`)
  };
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input onKeyDown={(event) => goToSearch(event)} placeholder="Search" className="pl-8" />
    </div>
  );
}
