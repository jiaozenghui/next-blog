import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { articleListItemType } from "@/types/article";
import { cn } from "@/lib/utils";
import { Get } from "@axios";
import { type ListData } from "axios";
import { redirect } from 'next/navigation'

interface pageProps {
  type?: string
  page?: number
  pageSize?: number
  query?: string | null,
  tags?: string | null
}

const CardList = async ({ type = 'all', page = 1, pageSize = 2, query = '', tags = '' }: pageProps) => {
  const [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list",
    { pageIndex: page - 1, pageSize, ...((type === 'all' || type === 'search') ? {} : { category: type }), query, tags }
  );

  return (
    <>
      <div className={cn(" min-h-[calc(100vh-180px)]")} >
        {data?.data?.list?.map((item: any) => (
          <Card item={item} key={item._id} />
        ))}
        {Number(data?.data.count) === 0 && <div className="flex justify-center w-full  pt-[50px]">暂未找到相关文章</div>}
      </div>
      {Number(data?.data.count) > 0 && <Pagination page={page} pageSize={Math.ceil(Number(data?.data.count) / pageSize)} />}
    </>
  );
};

export default CardList;
