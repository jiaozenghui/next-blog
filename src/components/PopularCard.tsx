import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Get } from "@axios";
import { type ListData } from "axios";
import { articleListItemType } from "@/types/article";

const PopularCard = async () => {
  const {r:data}= await Get<ListData<articleListItemType>>(
    "/api/articles/list",
    { SortKey: 'likeCount',customSort: 'dsc', pageIndex: 0, pageSize: 6 }
  );

  return (
    <Card>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-lg">Popular Articles</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0 divide-y divide-dashed">
        {data?.data?.list?.map((item: articleListItemType) => (
            <div key={item.id} className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">

            <div className="w-full cursor-pointer">
              <Link href={`/articles/details/${item.id}`} >
                {/* <p className="text-sm font-medium leading-none">{item.title}</p> */}
                <p className="text-sm line-clamp-1 text-muted-foreground text-ellipsis break-all ">
                {item.desc}
                </p>
              </Link>
            </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PopularCard;
