import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonPropss extends React.ComponentProps<typeof Skeleton> {
  rows:number
}
export function Skeletons({ className, rows=1, ...props }: SkeletonPropss) {
  const arr = new Array(rows).fill(null)
  return (
    <>
      {arr.map((v, n) => (
        <Skeleton key={n} className={cn(className)} {...props} />
      ))}
    </>
  )
}
