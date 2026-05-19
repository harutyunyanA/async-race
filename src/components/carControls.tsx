import { Button } from "antd";
import { Play, RotateCcw } from "lucide-react";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";

const compactBtn =
  "neon-btn max-sm:min-w-0 max-sm:h-[26px]! max-sm:px-1.5! max-sm:text-[0.65rem]! max-sm:[&_svg]:size-3";

export default function CarControls({ id }: { id: number }) {
  const { deleteCar, selectCar, selectedCar } = useGarageStore();
  const status = useRaceStore((s) => s.cars[id]?.status ?? "idle");
  const { startCar, stopCar } = useRaceStore();

  const editDisabled = status !== "idle" && status !== "finished" && status !== "broken";

  return (
    <div className="flex flex-row gap-4 max-sm:gap-1.5">
      <div className="flex flex-col gap-2">
        <Button
          className={compactBtn}
          style={
            { "--neon-color": selectedCar === id ? "#8c8c8c" : "#00ffff" } as React.CSSProperties
          }
          disabled={editDisabled}
          onClick={() => selectCar(id)}
        >
          {selectedCar === id ? "SELECTED" : "SELECT"}
        </Button>
        <Button
          className={compactBtn}
          style={{ "--neon-color": "#ff0000" } as React.CSSProperties}
          disabled={editDisabled}
          onClick={async () => deleteCar(id)}
        >
          REMOVE
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className={compactBtn}
          style={{ "--neon-color": "#fbff00" } as React.CSSProperties}
          disabled={status !== "idle"}
          onClick={async () => startCar(id)}
        >
          <Play />
        </Button>
        <Button
          className={compactBtn}
          style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
          disabled={status !== "finished" && status !== "broken"}
          onClick={async () => stopCar(id)}
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
