import { Typography } from "antd";
import WinnersTable from "../components/winnersTable.tsx";

export default function Winners() {
  return (
    <div className="flex flex-col gap-6 max-sm:gap-3">
      <Typography.Title
        level={1}
        className="neon-title max-sm:text-2xl! max-sm:m-0!"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
      >
        WINNERS
      </Typography.Title>
      <WinnersTable />
    </div>
  );
}
