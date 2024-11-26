import React from "react";
import Card from "./Card";

import { articleListItemType } from "@/types/article";

import { Get } from "@axios";
import { type ListData } from "axios";



const CardList = async ({ page, cat }: any) => {
  let [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list"
  );

  return (
    <div className='grid  gap-y-4 ' >
      {data?.data?.list?.map((item: any) => (
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
};

export default CardList;
