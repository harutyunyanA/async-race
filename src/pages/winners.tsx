import { Flex, Typography } from "antd";
import WinnersTable from "../components/winnersTable.tsx";

export default function Winners() {
  return (
    <Flex vertical gap="large">
      <Typography.Title
        level={1}
        className="neon-title"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
      >
        WINNERS
      </Typography.Title>
      <WinnersTable />
    </Flex>
  );
}
