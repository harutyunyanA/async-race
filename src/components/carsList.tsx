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
  const linesBg =
    "bg-[url(/start.png),url(/finish.png)] bg-no-repeat bg-position-[left_250px_center,right_5%_center] max-sm:bg-position-[left_150px_center,right_8%_center] bg-size-[50px_100%,50px_100%] max-sm:bg-size-[24px_100%,24px_100%] max-xl:bg-size-[32px_100%,32px_100%]";
  return (
    <>
      <div className="flex flex-col justify-between w-full min-h-[40%] ">
        <div className={`flex flex-col gap-6 max-sm:gap-3 ${carsToShow.length > 0 ? linesBg : ""}`}>
          {carsToShow.length > 0 ? (
            carsToShow.map((car) => <CarLane car={car} key={car.id} />)
          ) : (
            <Title
              className="neon-title text-center! py-20! max-sm:py-8! px-6! max-sm:px-3! text-2xl! max-sm:text-base! opacity-85"
              style={{ "--neon-color": "#00ffff" } as React.CSSProperties}
            >
              No cars in garage. Create new car or use `GENERATE CARS` button
            </Title>
          )}
        </div>
        <RacePagination />
      </div>
      <WinnerBanner />
    </>
  );
}
