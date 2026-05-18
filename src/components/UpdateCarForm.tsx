import { Button, Flex, Input, ColorPicker, message } from "antd";
import React from "react";
import { useGarageStore } from "../store/useGarageStore";

export default function UpdateCarForm() {
  const { updateCar, setUpdateCar, updateCarAction } = useGarageStore();
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = async () => {
    try {
      const data = await updateCarAction();
      messageApi.success(`Car "${data.name}" updated successfully!`);
    } catch (err) {
      messageApi.error(err instanceof Error ? err.message : "Failed to update car");
    }
  };

  return (
    <Flex gap="small" id="update-car">
      {contextHolder}
      <Input
        placeholder="Car name"
        size="large"
        value={updateCar.name}
        onChange={(e) => setUpdateCar({ name: e.target.value })}
      />
      <ColorPicker
        value={updateCar.color}
        size="large"
        onChangeComplete={(e) => setUpdateCar({ color: e.toHexString() })}
      />
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
        onClick={handleUpdate}
        disabled={updateCar.id === -1 || updateCar.name.trim() === ""}
      >
        UPDATE
      </Button>
    </Flex>
  );
}
