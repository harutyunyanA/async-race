import React from "react";
import { Button } from "antd";
import { Play, RotateCcw } from "lucide-react";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";
import { PAGE_SIZE } from "../lib/constants";

export default function RaceControls() {
  const { cars, page } = useGarageStore();
  const { isRacing, cars: raceCars, startRace, resetRace } = useRaceStore();
  const carsOnPage = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allIdle = carsOnPage.every((c) => (raceCars[c.id]?.status ?? "idle") === "idle");

  const isDriving = carsOnPage.some(
    (c) => raceCars[c.id]?.status === "starting" || raceCars[c.id]?.status === "driving",
  );

  return (
    <div id="race-controls" className="flex flex-row gap-2 max-sm:w-full">
      <Button
        size="large"
        className="neon-btn max-xl:flex-1"
        style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
        disabled={isRacing || carsOnPage.length === 0 || !allIdle}
        onClick={async () => startRace(carsOnPage)}
      >
        RACE
        <Play size={18} />
      </Button>
      <Button
        size="large"
        className="neon-btn max-xl:flex-1"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
        disabled={isRacing || allIdle || isDriving}
        onClick={async () => resetRace(carsOnPage.map((c) => c.id))}
      >
        RESET
        <RotateCcw size={18} />
      </Button>
    </div>
  );
}
