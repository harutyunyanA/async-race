import { Table } from "antd";
import React, { useEffect, useMemo } from "react";
import { useWinnerStore } from "../store/useWinnersStore";
import { useGarageStore } from "../store/useGarageStore";
import { columns } from "../lib/winnersTable";
import type { WinnerTableData } from "../types/winners";

export default function WinnersTable() {
  const { winners, getWinners } = useWinnerStore();
  const { cars, getCars } = useGarageStore();

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
      columns={columns}
      dataSource={winnersData}
      pagination={{
        defaultPageSize: 10,
        className: "neon-pagination",
        showSizeChanger: false,
      }}
      rowKey="id"
    />
  );
}
