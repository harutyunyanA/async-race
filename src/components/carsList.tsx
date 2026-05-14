import { Flex } from "antd";
import { useEffect } from "react";
import { useGarageStore } from "../store/useGarageStore";
import RacePagination from "./race-pagination";
import CarLane from "./carLane";
import Title from "antd/es/typography/Title";

const PAGE_SIZE = 7;

export default function RaceContent() {
  const { cars, getCars, page } = useGarageStore();

  useEffect(() => {
    getCars().catch(console.error);
  }, [page]);

  const carsToShow = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <>
      <Flex vertical style={{ width: "100%" }} justify="space-between" className="race-content">
        <Flex vertical gap={"large"} className="race-lines">
          {carsToShow.length > 0 ? (
            carsToShow.map((car) => <CarLane car={car} key={car.id} />)
          ) : (
            <Title
              className="neon-title empty-garage"
              style={{ "--neon-color": "#00ffff" } as React.CSSProperties}
            >
              No cars in garage. Create new car or use 'GENERATE CARS' button
            </Title>
          )}
        </Flex>
        <RacePagination />
      </Flex>
    </>
  );
}
