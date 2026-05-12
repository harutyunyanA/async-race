import type { TableProps } from "antd";
import { useWinnerStore } from "../store/useWinnersStore";
import type { WinnerTableData, SortBy, Order } from "../types/winners";

export const useWinnersPagination = () => {
  const { page, sortBy, order, setPage, setSorting } = useWinnerStore();

  const handleTableChange: TableProps<WinnerTableData>["onChange"] = (
    pagination,
    _filters,
    sorter,
  ) => {
    if (pagination.current && pagination.current !== page) {
      setPage(pagination.current);
    }

    if (Array.isArray(sorter)) return;

    const newSortBy = sorter.columnKey as SortBy;

    const newOrder: Order = sorter.order === "ascend" ? "ASC" : "DESC";

    if (newSortBy !== sortBy || newOrder !== order) {
      setSorting(newSortBy, newOrder);
    }
  };

  return { handleTableChange, page, sortBy, order };
};
