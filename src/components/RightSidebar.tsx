import React from "react";
import { cn } from "@/lib/utils";
import { PopularTags } from "./PopularTags";
import RankCard from "./RankCard";

const RightSidebar = () => {

  return (
    <section className={cn("right_sidebar flex-none")}>
      <RankCard title="Popular Articles" type="likeCount" sort="dsc" />
      <PopularTags className="mt-4" />
      <RankCard className="mt-4" title="Reading Ranking" type="viewCount" sort="dsc" />
    </section>
  );
};

export default RightSidebar;
