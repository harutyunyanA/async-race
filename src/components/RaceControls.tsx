import React from "react";
import { Button, Flex } from "antd";
import { Play, RotateCcw } from "lucide-react";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";
import { PAGE_SIZE } from "../lib/constants";

export default function RaceControls() {
  const { cars, page } = useGarageStore();
  // const page = useGarageStore((s) => s.page);
  const { isRacing, cars: raceCars, startRace, resetRace } = useRaceStore();
  // const raceCars = useRaceStore((s) => s.cars);
  // const startRace = useRaceStore((s) => s.startRace);
  // const resetRace = useRaceStore((s) => s.resetRace);

  const carsOnPage = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allIdle = carsOnPage.every((c) => (raceCars[c.id]?.status ?? "idle") === "idle");

  return (
    <Flex gap="small" id="race-controls">
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
        disabled={isRacing || carsOnPage.length === 0}
        onClick={async () => startRace(carsOnPage)}
      >
        RACE
        <Play size={18} />
      </Button>
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
        disabled={isRacing || allIdle}
        onClick={async () => resetRace(carsOnPage.map((c) => c.id))}
      >
        RESET
        <RotateCcw size={18} />
      </Button>
    </Flex>
  );
}
