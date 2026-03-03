"use client";

import { usePagination } from "../../_hooks/usePagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DynamicPaginationProps = {
  totalPage: number;
};
export const DynamicPagination = ({ totalPage }: DynamicPaginationProps) => {
  const {
    currentPage,
    handleNext,
    handlePageChange,
    handlePrevious,
    totalPages,
    displayPages,
  } = usePagination();

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
        )}

        {displayPages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={handlePageChange(pageNumber)}
              className={
                pageNumber === currentPage ? "bg-gray-300" : "bg-gray-100"
              }
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
