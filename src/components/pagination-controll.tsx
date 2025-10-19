import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";


interface PaginationControllProps {
    href?: string;
    onNextPage: () => void;
    onPreviousPage: () => void;
    currentPage: number;
    hasPreviousPage: boolean, 
    hasNextPage: boolean
}

export function PaginationControll({
  href,
  onNextPage,
  onPreviousPage,
  currentPage,
  hasPreviousPage, 
  hasNextPage
}: PaginationControllProps) {
 
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={href}
            size="sm"
            onClick={onPreviousPage}
            className="cursor-pointer"
          />
        </PaginationItem>
        {hasPreviousPage && <PaginationItem>{currentPage - 1}</PaginationItem>}
        <PaginationItem>
          <PaginationLink href={href} size="sm" className="font-bold border-2">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage && <PaginationItem>{currentPage + 1}</PaginationItem>}
        <PaginationItem>
          <PaginationNext
            href={href}
            size="sm"
            onClick={onNextPage}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}