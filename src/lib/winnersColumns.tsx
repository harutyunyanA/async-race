import type { TableColumnsType } from "antd";
import type { WinnerTableData, SortBy, Order } from "../types/winners";
import Car from "../components/car";

export const getWinnersColumns = (
  sortBy: SortBy,
  order: Order,
): TableColumnsType<WinnerTableData> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "CAR",
    dataIndex: "color",
    key: "car",
    render: (color: string) => <Car color={color} />,
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
    sortOrder: sortBy === "wins" ? (order === "ASC" ? "ascend" : "descend") : undefined,
    width: "15%",
  },
  {
    title: "BEST TIME (s)",
    dataIndex: "time",
    key: "time",
    sorter: true,
    sortDirections: ["ascend", "descend"],
    sortOrder: sortBy === "time" ? (order === "ASC" ? "ascend" : "descend") : undefined,
    width: "15%",
  },
];
