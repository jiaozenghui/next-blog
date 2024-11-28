"use client";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewsProps extends React.HTMLAttributes<HTMLDivElement> {
  viewCount: number;
}
export default function Views({
  className,
  viewCount = 0,
  ...props
}: ViewsProps) {


  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Eye  className="mr-1 h-3 w-3" />
      {viewCount}
    </div>
  );
}
