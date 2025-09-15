"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  query: { page: number; pageSize: number };
  onQueryChangeAction: (query: { page: number; pageSize: number }) => void;
  total: number;
};

export default function Pagination({
  query,
  onQueryChangeAction,
  total,
}: PaginationProps) {
  const { page, pageSize } = query;

  const totalPages = Math.ceil(total / pageSize);

  const setPage = (newPage: number) => {
    onQueryChangeAction({ page: newPage, pageSize });
  };

  const setSize = (newSize: number) => {
    onQueryChangeAction({ page, pageSize: newSize });
  };

  return (
    <div className="flex gap-2">
      <div className="flex">
        <span>每頁</span>
        <Select onValueChange={(value) => setSize(Number(value))}>
          <SelectTrigger>{pageSize}</SelectTrigger>
          <SelectContent>
            {["5", "10", "15", "20", "50"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>筆</span>
      </div>
      <Button
        variant="outline"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        上一頁
      </Button>
      <div className="flex">
        <Select onValueChange={(value) => setPage(Number(value))}>
          <SelectTrigger>{page}</SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalPages }).map((_, index) => (
              <SelectItem key={index} value={String(index + 1)}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        disabled={page === Math.ceil(total / pageSize) - 1}
        onClick={() => setPage(page + 1)}
      >
        下一頁
      </Button>
    </div>
  );
}
