"use client";
import { Patch } from "@axios";
import { Star } from "lucide-react";
import { articleListItemType } from "@/types/article";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LikeProps extends React.HTMLAttributes<HTMLDivElement> {
  articleId: number;
  likeCount: number;
}
export default function Like({
  className,
  articleId,
  likeCount = 0,
  ...props
}: LikeProps) {
  const [likesCount, setLikeCount] = useState(likeCount);


  const updateLikeCount = async () => {
    const {r} = await Patch<articleListItemType>(
      `/api/articles/change/likeCount/${articleId}`,
      {}
    );
    if (r && r.errno === 0) {
      setLikeCount(r.data.likeCount);
    }
  };
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Star onClick={updateLikeCount} className="mr-1 h-3 w-3 cursor-pointer" />
      {likesCount}
    </div>
  );
}
