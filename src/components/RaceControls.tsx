import React from "react";
import { Button, Flex } from "antd";
import { Play, RotateCcw } from "lucide-react";

export default function RaceControls() {
  return (
    <Flex gap="small" id="race-controls">
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#00ff00" } as React.CSSProperties}
      >
        RACE
        <Play size={18} />
      </Button>
      <Button
        size="large"
        className="neon-btn"
        style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
      >
        RESET
        <RotateCcw size={18} />
      </Button>
    </Flex>
  );
}
