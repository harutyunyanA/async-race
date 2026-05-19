import type { TableColumnsType } from "antd";
import type { WinnerTableData, SortBy, Order } from "../types/winners";
import Car from "../components/car.tsx";

const getSortOrder = (columnKey: SortBy, sortBy: SortBy, order: Order) => {
  if (columnKey !== sortBy) return undefined;

  if (order === "ASC") return "ascend";
  if (order === "DESC") return "descend";
  return undefined;
};

export const getWinnersColumns = (
  sortBy: SortBy,
  order: Order,
): TableColumnsType<WinnerTableData> => [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "CAR",
    dataIndex: "color",
    key: "car",
    render: (color: string) => (
      <div className="w-20 h-12 max-sm:w-10 max-sm:h-6">
        <Car color={color} />
      </div>
    ),
    width: "10%",
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    width: "40%",
  },
  {
    title: "WINS",
    dataIndex: "wins",
    key: "wins",
    sorter: true,
    sortDirections: ["ascend", "descend"],
    sortOrder: getSortOrder("wins", sortBy, order),
    width: "15%",
  },
  {
    title: "BEST TIME (sec)",
    dataIndex: "time",
    key: "time",
    sorter: true,
    sortDirections: ["ascend", "descend"],
    sortOrder: getSortOrder("time", sortBy, order),
    width: "15%",
  },
];
