import React from "react";
import { Button, ColorPicker, Flex, Input, message } from "antd";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";

export default function CreateCarForm() {
  const { newCar, setNewCar, createCar } = useGarageStore();
  const isRacing = useRaceStore((s) => s.isRacing);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = async () => {
    try {
      const data = await createCar(newCar);
      messageApi.success(`Car "${data.name}" created successfully!`);
      setNewCar({ name: "", color: "#ffffff" });
    } catch (err) {
      messageApi.error(err instanceof Error ? err.message : "Failed to create car");
    }
  };
  return (
    <Flex gap="small" id="create-car">
      {contextHolder}
      <Input
        placeholder="Car name"
        size="large"
        value={newCar.name}
        disabled={isRacing}
        onChange={(e) => setNewCar({ name: e.target.value })}
      />
      <ColorPicker
        value={newCar.color}
        size="large"
        disabled={isRacing}
        onChangeComplete={(e) => setNewCar({ color: e.toHexString() })}
      />
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
        onClick={handleCreate}
        disabled={isRacing || newCar.name.trim() === ""}
      >
        CREATE
      </Button>
    </Flex>
  );
}
