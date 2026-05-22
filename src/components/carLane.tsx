import { useRef } from "react";
import type { Car } from "../types/car";
import CarControls from "./carControls.tsx";
import CarSvg from "./car.tsx";
import { useRaceStore } from "../store/useRaceStore";
import { useCarAnimation } from "../hooks/useCarAnimation";

export default function CarLane({ car }: { car: Car }) {
  const status = useRaceStore((s) => s.cars[car.id]?.status ?? "idle");
  const duration = useRaceStore((s) => s.cars[car.id]?.specs?.duration ?? 0);
  const brokenAtFraction = useRaceStore((s) => s.cars[car.id]?.brokenAtFraction ?? null);

  const trackRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);

  useCarAnimation({ status, duration, brokenAtFraction, trackRef, moverRef });

  return (
    <div className="flex flex-row items-center gap-2 max-sm:gap-1.5 w-full">
      <CarControls id={car.id} />
      <div
        ref={trackRef}
        className="relative flex-1 min-w-0 h-20 max-sm:h-14 overflow-hidden border-b-2 border-white/25"
      >
        <span className="absolute inset-0 flex items-center justify-center max-sm:justify-center max-sm:pr-3 text-2xl max-xl:text-sm font-bold uppercase tracking-widest max-sm:tracking-normal text-white/30 select-none">
          {car.name}
        </span>
        <div
          ref={moverRef}
          className="absolute left-0 bottom-2 max-sm:bottom-1 w-25 h-15 max-sm:w-15 max-sm:h-9 will-change-transform"
        >
          <CarSvg color={car.color} />
        </div>
      </div>
    </div>
  );
}
