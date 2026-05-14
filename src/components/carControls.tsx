import { Button, Flex } from "antd";
import { useGarageStore } from "../store/useGarageStore";
import { Play, RotateCcw } from "lucide-react";

export default function CarControls({ id }: { id: number }) {
  const { deleteCar, selectCar, selectedCar } = useGarageStore();
  return (
    <>
      <Flex gap={"medium"}>
        <Flex vertical gap={"small"}>
          <Button
            className="neon-btn"
            style={
              { "--neon-color": selectedCar === id ? "#8c8c8c" : "#00ffff" } as React.CSSProperties
            }
            onClick={() => {
              selectCar(id);
            }}
          >
            {selectedCar === id ? "SELECTED" : "SELECT"}
          </Button>
          <Button
            className="neon-btn"
            style={{ "--neon-color": "#ff0000" } as React.CSSProperties}
            onClick={() => deleteCar(id)}
          >
            REMOVE
          </Button>
        </Flex>
        <Flex vertical gap={"small"}>
          <Button className="neon-btn" style={{ "--neon-color": "#fbff00" } as React.CSSProperties}>
            <Play />
          </Button>
          <Button
            className="neon-btn"
            style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
            disabled={true}
          >
            <RotateCcw />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
