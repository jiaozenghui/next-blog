import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { tagList } from '@/constants'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


type CardProps = React.ComponentProps<typeof Card>;

export function PopularTags({ className, ...props }: CardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="card_title">
        <CardTitle className="text-lg">Popular Tags</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="grid grid-cols-3 gap-3 mt-2">
          {tagList.map((tag, index) => (
            <Badge
              className="justify-center cursor-pointer"
              key={index}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
