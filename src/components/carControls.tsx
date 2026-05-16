import { Button, Flex } from "antd";
import { Play, RotateCcw } from "lucide-react";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";

export default function CarControls({ id }: { id: number }) {
  const { deleteCar, selectCar, selectedCar } = useGarageStore();
  const status = useRaceStore((s) => s.cars[id]?.status ?? "idle");
  const { startCar, stopCar } = useRaceStore();

  const editDisabled = status !== "idle" && status !== "finished" && status !== "broken";

  return (
    <Flex gap="medium">
      <Flex vertical gap="small">
        <Button
          className="neon-btn"
          style={
            { "--neon-color": selectedCar === id ? "#8c8c8c" : "#00ffff" } as React.CSSProperties
          }
          disabled={editDisabled}
          onClick={() => selectCar(id)}
        >
          {selectedCar === id ? "SELECTED" : "SELECT"}
        </Button>
        <Button
          className="neon-btn"
          style={{ "--neon-color": "#ff0000" } as React.CSSProperties}
          disabled={editDisabled}
          onClick={async () => deleteCar(id)}
        >
          REMOVE
        </Button>
      </Flex>
      <Flex vertical gap="small">
        <Button
          className="neon-btn"
          style={{ "--neon-color": "#fbff00" } as React.CSSProperties}
          disabled={status !== "idle"}
          onClick={async () => startCar(id)}
        >
          <Play />
        </Button>
        <Button
          className="neon-btn"
          style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
          disabled={status !== "finished" && status !== "broken"}
          onClick={async () => stopCar(id)}
        >
          <RotateCcw />
        </Button>
      </Flex>
    </Flex>
  );
}
