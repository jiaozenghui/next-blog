import React from "react";
import { cn } from "@/lib/utils";
import { PopularTags } from "./PopularTags";
import RankCard from "./RankCard";

const RightSidebar = () => {

  return (
    <aside className="sticky top-20 pr-[10px] flex-none w-[260px] xl:w-[300px]  overflow-y-auto  -mt-6 h-[calc(100vh-3.5rem)] pt-0 no-scrollbar hidden md:block">
      <section className={cn(" flex-none")}>
        <RankCard title="热门文章" type="likeCount" sort="dsc" />
        <PopularTags className="mt-4" />
        <RankCard className="mt-4" title="阅读排行" type="viewCount" sort="dsc" />
      </section>
    </aside>
  );
};

export default RightSidebar;
