import React from "react";
import { cn } from "@/lib/utils";
import { PopularTags } from "./PopularTags";
import RankCard from "./RankCard";

const RightSidebar = () => {

  return (
    <section className={cn("right_sidebar flex-none max-h-[calc(100vh-5px)]")}>
      <RankCard title="Popular Articles" type="likeCount" sort="dsc" />
      <PopularTags className="mt-4" />
      <RankCard  title="Reading Ranking" type="viewCount" sort="dsc" />
    </section>
  );
};

export default RightSidebar;
