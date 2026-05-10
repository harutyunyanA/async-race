import { Button, Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";

export function MainLayout() {
  const navigate = useNavigate();
  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <Flex
          gap="small"
          //   className="nav-buttons"
          justify="center"
          align="center"
        >
          <Button
            size="large"
            variant="outlined"
            // type="default"
            // color="default"
            onClick={async () => navigate("/")}
            // className="nav-btn"
          >
            GARAGE
          </Button>
          <Button
            size="large"
            // type="default"
            variant="outlined"
            // color="default"
            onClick={async () => navigate("/winners")}
            // className="nav-btn"
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
