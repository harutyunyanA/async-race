import { Flex } from "antd";
import { useEffect } from "react";
import { useGarageStore } from "../store/useGarageStore";
import { getCarsApi } from "../api/garage";

export default function RaceContent() {
  const { addCars } = useGarageStore();

  useEffect(() => {
    (async () => {
      try {
        const data = await getCarsApi();
        addCars(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [addCars]);

  return (
    <Flex style={{ width: "100%" }}>
      <Flex vertical style={{ width: "100%" }} gap="small" />
      <Flex />
    </Flex>
  );
}
