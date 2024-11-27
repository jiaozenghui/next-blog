
'use client'
import { usePathname, useSearchParams } from 'next/navigation'
 
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShadui
} from '@/components/ui/pagination'
import { cx } from 'class-variance-authority'
 
const RANGE = 1
 
interface PaginationProps {
  pageSize: number
  page: number
  setPage: any
}
 
export default function Pagination({ pageSize, page = 3 }: PaginationProps) {
  //防止出入字符串
  pageSize = Number(pageSize)
  const pathname = usePathname()
  //const searchParams = useSearchParams()
  // const page = Number(searchParams.get('page')) || 1
 
  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false
 
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }
 
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }
 
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        const isActive = pageNumber === page
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
 
        return (
          <PaginationItem key={Math.random()}>
            <PaginationLink
              className={cx({
                'bg-gary dark:bg-primary text-white   dark:text-secondary pointer-events-none': isActive
              }, 'w-6 h-6 flex  items-center justify-center border border-gray text-gray rounded')}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        )
      })
  }
 
  return (
    <PaginationShadui>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cx({
              'pointer-events-none': page === 1,
            }, 'border-gray border p-0 pl-0.5 flex items-center justify-center h-6 w-6  rounded  text-gary')}
          />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext
            // onClick={() => setPage((page: number) => page + 1)}
            className={cx({
              'pointer-events-none': page === pageSize
            }, 'border-gray border p-0 pr-0.5 flex items-center justify-center h-6 w-6  rounded  text-gary')}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadui>
  )
}