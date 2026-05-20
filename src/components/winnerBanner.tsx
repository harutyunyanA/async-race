import React from "react";
import { Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useRaceStore } from "../store/useRaceStore";

export default function WinnerBanner() {
  const { winner, clearWinner } = useRaceStore();

  return (
    <Modal
      open={!!winner}
      onCancel={clearWinner}
      footer={null}
      centered
      className="winner-modal"
      styles={{
        container: {
          background: "rgba(129, 129, 129, 0.1)",
          backdropFilter: "blur(3px)",
          border: "1px solid #00ff00",
          boxShadow: "0 0 20px #00ff00",
        },
      }}
    >
      {winner && (
        <Title
          className="neon-title"
          style={{ "--neon-color": "#00ff00", margin: 0 } as React.CSSProperties}
        >
          {winner.name} went first ({winner.time}s)
        </Title>
      )}
    </Modal>
  );
}
