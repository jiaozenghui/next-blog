import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { articleListItemType } from "@/types/article";

import { Get } from "@axios";
import { type ListData } from "axios";
import { redirect } from 'next/navigation'

interface pageProps {
  page:number
  pageSize?: {
    type:number,
    defualt:10
  }
}

const CardList = async ({ page, pageSize }: pageProps) => {
  const [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list",
    { pageIndex: page, pageSize }
  );
  

  return (
    <div className='grid  gap-y-4 ' >
      {data?.data?.list?.map((item: any) => (
        <Card item={item} key={item._id} />
      ))}
      {Number(data?.data.count)> 0 && <Pagination pageSize={Number(data?.data.count)} page={page + 1}  />}
    </div>
  );
};

export default CardList;
