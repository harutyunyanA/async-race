import { Button, Flex } from "antd";

export function Garage() {
  return (
    <Flex>
      <Flex justify="space-between">
        <Flex gap="small">
          <Button>RACE</Button>
          <Button>RESET</Button>
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}
