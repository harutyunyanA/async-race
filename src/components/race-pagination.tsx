import { Flex, Pagination } from "antd";
import Title from "antd/es/typography/Title";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";
import { PAGE_SIZE } from "../lib/constants";

export default function RacePagination() {
  const { cars, setPage, page } = useGarageStore();
  const isRacing = useRaceStore((s) => s.isRacing);
  return (
    <Flex justify="start" align="center" gap="large">
      <Pagination
        simple
        current={page}
        pageSize={PAGE_SIZE}
        total={cars.length}
        className="neon-pagination"
        showSizeChanger={false}
        disabled={isRacing}
        onChange={(p) => setPage(p)}
      />
      <Title className="neon-title" style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}>
        GARAGE({cars.length})
      </Title>
    </Flex>
  );
}
