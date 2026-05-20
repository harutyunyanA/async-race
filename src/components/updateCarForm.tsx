import { Button, Input, ColorPicker, message } from "antd";
import React from "react";
import { useGarageStore } from "../store/useGarageStore";
import { useRaceStore } from "../store/useRaceStore";

export default function UpdateCarForm() {
  const { updateCar, setUpdateCar, updateCarAction } = useGarageStore();
  const isRacing = useRaceStore((s) => s.isRacing);
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
    <div
      id="update-car"
      className="flex flex-row max-sm:flex-wrap max-sm:w-full gap-2 max-sm:gap-y-2 items-center"
    >
      {contextHolder}
      <Input
        placeholder="Car name"
        size="large"
        maxLength={30}
        className="max-sm:basis-full! max-sm:grow! max-xl:flex-1"
        value={updateCar.name}
        disabled={isRacing}
        onChange={(e) => setUpdateCar({ name: e.target.value })}
      />
      <ColorPicker
        value={updateCar.color}
        size="large"
        disabled={isRacing}
        onChangeComplete={(e) => setUpdateCar({ color: e.toHexString() })}
      />
      <Button
        size="large"
        className="neon-btn max-sm:flex-1"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
        onClick={handleUpdate}
        disabled={isRacing || updateCar.id === -1 || updateCar.name.trim() === ""}
      >
        UPDATE
      </Button>
    </div>
  );
}
