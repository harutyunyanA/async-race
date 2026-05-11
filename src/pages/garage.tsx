import { Flex } from "antd";
import RaceContent from "../components/carsList.tsx";
import RaceControls from "../components/RaceControls.tsx";
import CreateCarForm from "../components/CreateCarForm.tsx";
import UpdateCarForm from "../components/UpdateCarForm.tsx";
import GenerateCars from "../components/GenerateCars.tsx";

export default function Garage() {
  return (
    <Flex vertical gap={24}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }} id="garage-controls">
        <RaceControls />
        <CreateCarForm />
        <UpdateCarForm />
        <GenerateCars />
      </Flex>
      <RaceContent />
    </Flex>
  );
}
