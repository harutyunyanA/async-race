import { Button, Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import { useRaceStore } from "../store/useRaceStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const isRacing = useRaceStore((s) => s.isRacing);
  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <Flex gap="large" justify="center" align="center" vertical>
          <Button
            className="neon-btn"
            style={{ "--neon-color": "#00ffff" } as React.CSSProperties}
            size="large"
            disabled={isRacing}
            onClick={async () => navigate("/")}
          >
            GARAGE
          </Button>
          <Button
            className="neon-btn"
            style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
            size="large"
            disabled={isRacing}
            onClick={async () => navigate("/winners")}
          >
            WINNERS
          </Button>
        </Flex>
      </Header>
      <Content className="main-content">
        <Outlet />
      </Content>
    </Layout>
  );
}
