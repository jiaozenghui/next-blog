import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Get } from "@axios";
import { type ListData } from "axios";
import { articleListItemType } from "@/types/article";
import { cn } from "@/lib/utils";
interface cardProps {
  title: string;
  type: string;
  sort:string;
  className?: string
}
const RankCard = async ({title, type, sort, className}: cardProps) => {
  const [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list",
    { SortKey: type, customSort: sort, pageIndex: 0, pageSize: 6 }
  );

  return (
    <Card className={cn(className)}>
      <CardHeader className="card_title">
        <CardTitle className="text-lg">{title}</CardTitle>
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

export default RankCard;
