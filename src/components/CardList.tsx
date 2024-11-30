import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { articleListItemType } from "@/types/article";
import { cn } from "@/lib/utils";
import { Get } from "@axios";
import { type ListData } from "axios";
import { redirect } from 'next/navigation'

interface pageProps {
  page: number
  pageSize?: number
}

const CardList = async ({ page, pageSize = 2 }: pageProps) => {
  const [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list",
    { pageIndex: page - 1, pageSize }
  );

  return (
    <>
      <div className={cn(" min-h-[calc(100vh-180px)]")} >
        {data?.data?.list?.map((item: any) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      {Number(data?.data.count) > 0 && <Pagination page={page} pageSize={Math.ceil(Number(data?.data.count) / pageSize)} />}
    </>
  );
};

export default CardList;
