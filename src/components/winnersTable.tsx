import { Table } from "antd";
import React, { useEffect, useMemo } from "react";
import { useWinnerStore } from "../store/useWinnersStore";
import { useGarageStore } from "../store/useGarageStore";
import { useWinnersPagination } from "../hooks/useWinnersPagination";
import { getWinnersColumns } from "../lib/winnersColumns";
import type { WinnerTableData } from "../types/winners";

export default function WinnersTable() {
  const { winners, totalCount, getWinners } = useWinnerStore();
  const { cars, getCars } = useGarageStore();
  const { handleTableChange, page, sortBy, order } = useWinnersPagination();

  useEffect(() => {
    getWinners();
    getCars();
  }, [getWinners, getCars]);

  const winnersData = useMemo(() => {
    if (!winners.length || !cars.length) return [];

    return winners.map((w) => {
      const car = cars.find((c) => c.id === w.id);
      return {
        ...w,
        name: car?.name || "Unknown",
        color: car?.color || "#000000",
      } as WinnerTableData;
    });
  }, [winners, cars]);

  return (
    <Table
      rootClassName="transparent-table"
      style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
      rowClassName={() => "winner-row"}
      columns={getWinnersColumns(sortBy, order)}
      dataSource={winnersData}
      onChange={handleTableChange}
      pagination={{
        simple: true,
        current: page,
        total: totalCount,
        className: "neon-pagination",
        showSizeChanger: false,
        placement: ["bottomStart"],
      }}
      rowKey="id"
    />
  );
}
