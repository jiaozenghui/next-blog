import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { tagList } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function PopularTags({ className, ...props }: CardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="card_title">
        <CardTitle className="text-lg">热门标签</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {tagList.map((tag, index) => (
            <Link
              key={index}
              href={`/articles/technology/${tag.id}`}
              legacyBehavior
              passHref
            >
              <Badge className="justify-center cursor-pointer">
                {tag.label}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
