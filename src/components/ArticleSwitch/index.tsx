import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PagerProps {
  prev: {id: number, title: string},
  next: {id: number, title: string}
}

export function ArticleSwitch({ prev, next }: PagerProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      {prev && (
        <Button variant="ghost" asChild>
          <Link href={`/articles/details/${prev.id}`}>
            <ChevronLeft />
            {prev.title}
          </Link>
        </Button>
      )}
      {next && (
        <Button variant="ghost" className="ml-auto" asChild>
          <Link href={`/articles/details/${next.id}`}>
            {next.title}
            <ChevronRight />
          </Link>
        </Button>
      )}
    </div>
  )
}

