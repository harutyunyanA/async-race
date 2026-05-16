import { Flex } from "antd";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { useGarageStore } from "../store/useGarageStore";
import RacePagination from "./race-pagination.tsx";
import CarLane from "./carLane.tsx";
import WinnerBanner from "./WinnerBanner.tsx";
import { PAGE_SIZE } from "../lib/constants";

export default function RaceContent() {
  const { cars, getCars, page } = useGarageStore();

  useEffect(() => {
    getCars();
  }, [page, getCars]);

  const carsToShow = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <>
      <Flex vertical style={{ width: "100%" }} justify="space-between" className="race-content">
        <Flex vertical gap="large" className="race-lines">
          {carsToShow.length > 0 ? (
            carsToShow.map((car) => <CarLane car={car} key={car.id} />)
          ) : (
            <Title
              className="neon-title empty-garage"
              style={{ "--neon-color": "#00ffff" } as React.CSSProperties}
            >
              No cars in garage. Create new car or use `GENERATE CARS` button
            </Title>
          )}
        </Flex>
        <RacePagination />
      </Flex>
      <WinnerBanner />
    </>
  );
}
