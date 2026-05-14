import { Flex } from "antd";
import type { Car } from "../types/car";
import CarControls from "./carControls";
import CarSvg from "./car.tsx";

export default function CarLane({ car }: { car: Car }) {
  return (
    <>
      <Flex>
        <CarControls id={car.id} />
        <CarSvg color={car.color} />
        <div className="car-track" />
      </Flex>
    </>
  );
}
