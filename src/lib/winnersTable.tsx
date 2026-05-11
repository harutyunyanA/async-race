import type { TableColumnsType } from "antd";
import type { WinnerTableData } from "../types/winners";
import Car from "../components/car";

export const columns: TableColumnsType<WinnerTableData> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "CAR",
    dataIndex: "color",
    key: "car",
    render: (color: string) => <Car color={color} />,
    width: 120,
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "WINS",
    dataIndex: "wins",
    key: "wins",
    sorter: true,
  },
  {
    title: "BEST TIME (s)",
    dataIndex: "time",
    key: "time",
    sorter: true,
  },
];
