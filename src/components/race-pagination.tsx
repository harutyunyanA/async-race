import { Flex, Pagination } from "antd";
import { useGarageStore } from "../store/useGarageStore";
import Title from "antd/es/typography/Title";

export default function RacePagination() {
  const { cars, setPage, page } = useGarageStore();

  return (
    <>
      <Flex justify="start" align="center" gap={"large"}>
        <Pagination
          simple
          defaultCurrent={page}
          defaultPageSize={7}
          total={cars.length}
          className="neon-pagination"
          showSizeChanger={false}
          onChange={(page) => setPage(page)}
        />
        <Title className="neon-title" style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}>
          GARAGE({cars.length})
        </Title>
      </Flex>
    </>
  );
}
