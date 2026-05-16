import { Flex } from "antd";
import { useRef } from "react";
import type { Car } from "../types/car";
import CarControls from "./carControls.tsx";
import CarSvg from "./car.tsx";
import { useRaceStore } from "../store/useRaceStore";
import { useCarAnimation } from "../hooks/useCarAnimation";

export default function CarLane({ car }: { car: Car }) {
  const status = useRaceStore((s) => s.cars[car.id]?.status ?? "idle");
  const duration = useRaceStore((s) => s.cars[car.id]?.specs?.duration ?? 0);

  const trackRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);

  useCarAnimation({ status, duration, trackRef, moverRef });

  return (
    <Flex align="center" gap="small" className="car-lane">
      <CarControls id={car.id} />
      <div className="car-track" ref={trackRef}>
        <div className="car-mover" ref={moverRef}>
          <CarSvg color={car.color} />
        </div>
        <div className="car-finish-line" />
      </div>
    </Flex>
  );
}
