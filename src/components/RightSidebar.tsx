"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PopularCard } from "./PopularCard";
import { PopularTags } from "./PopularTags";
import { FriendshipLink } from "./FriendshipLink";

const RightSidebar = () => {

  return (
    <section className={cn("right_sidebar flex-none max-h-[calc(100vh-5px)]")}>
      <PopularCard />
      <PopularTags className="mt-4" />
      <FriendshipLink className="mt-4" />
    </section>
  );
};

export default RightSidebar;
