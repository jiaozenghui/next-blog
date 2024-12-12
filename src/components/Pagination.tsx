
'use client'
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
}
 
export default function Pagination({ pageSize, page = 3 }: PaginationProps) {
  pageSize = Number(pageSize)
 
  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false
 
    const renderDotBefore = () => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <PaginationItem key={Math.random()}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }
 
    const renderDotAfter = () => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <PaginationItem key={Math.random()}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }
 
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter()
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore()
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter()
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore()
        }
 
        return (
          <PaginationItem  key={Math.random()}>
            <PaginationLink
              isActive={pageNumber === page}
              href={`/articles/${pageNumber}`}
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
        <PaginationItem key={Math.random()}>
          <PaginationPrevious
            href={`/articles/${page -1}`}
            className={cx({
              'pointer-events-none': page === 1
            }, '')}
          />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem key={Math.random()}>
          <PaginationNext
            href={`/articles/${page +1}`}
            className={cx({
              'pointer-events-none': page === pageSize
            }, '')}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadui>
  )
}