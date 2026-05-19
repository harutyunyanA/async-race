import { Pagination } from "antd";
import Title from "antd/es/typography/Title";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";
import { PAGE_SIZE } from "../lib/constants";

export default function RacePagination() {
  const { cars, setPage, page } = useGarageStore();
  const isRacing = useRaceStore((s) => s.isRacing);
  return (
    <div className="flex flex-row items-center justify-start gap-6 max-sm:flex-wrap max-sm:gap-2">
      <Pagination
        simple
        current={page}
        pageSize={PAGE_SIZE}
        total={cars.length}
        className="neon-pagination max-sm:text-sm!"
        showSizeChanger={false}
        disabled={isRacing}
        onChange={(p) => setPage(p)}
      />
      <Title
        className="neon-title max-sm:text-2xl! max-sm:m-0!"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
      >
        GARAGE({cars.length})
      </Title>
    </div>
  );
}
