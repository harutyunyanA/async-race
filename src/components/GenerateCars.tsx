import React from "react";
import { Button, Flex } from "antd";
import { carGenerator } from "../utils/carGenerator";
import { useGarageStore } from "../store/useGarageStore";
import { createCarApi } from "../api/garage";

export default function GenerateCars() {
  const { addCars } = useGarageStore();

  const handleGenerate = async () => {
    const carsToCreate = Array.from({ length: 100 }, () => carGenerator());
    const results = await Promise.all(carsToCreate.map((car) => createCarApi(car)));
    addCars(results);
  };

  return (
    <Flex gap="small" id="generate-cars">
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
        onClick={handleGenerate}
      >
        GENERATE CARS
      </Button>
    </Flex>
  );
}
