import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import { useRaceStore } from "../store/useRaceStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const isRacing = useRaceStore((s) => s.isRacing);
  return (
    <Layout className="main-layout min-h-screen">
      <Header className="main-header bg-transparent! h-[15vh]! leading-normal! max-sm:h-auto! max-sm:px-3! max-sm:py-3! flex items-center">
        <div className="flex flex-col max-sm:flex-row items-start justify-center gap-6 max-sm:gap-2 w-full">
          <Button
            className="neon-btn max-sm:w-full max-sm:h-8! max-sm:px-2! max-sm:text-xs!"
            style={{ "--neon-color": "#00ffff" } as React.CSSProperties}
            size="large"
            disabled={isRacing}
            onClick={async () => navigate("/")}
          >
            GARAGE
          </Button>
          <Button
            className="neon-btn max-sm:w-full max-sm:h-8! max-sm:px-2! max-sm:text-xs!"
            style={{ "--neon-color": "#ff00ff" } as React.CSSProperties}
            size="large"
            disabled={isRacing}
            onClick={async () => navigate("/winners")}
          >
            WINNERS
          </Button>
        </div>
      </Header>
      <Content className="main-content text-white p-10 max-sm:p-3 min-h-[85vh] max-sm:min-h-[calc(100vh-100px)]">
        <Outlet />
      </Content>
    </Layout>
  );
}
