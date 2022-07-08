import React, { useContext } from "react";
import { Layout } from "antd";

import "../../styles/App.less";
import "antd/dist/antd.less";

import { UserContext } from "../../context/userContext";

const ContentPage = (props) => {
  const { user } = useContext(UserContext);

  const { Content, Footer } = Layout;

  const token = sessionStorage.getItem("accessToken");
  console.log(token);
  return (
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <h2 style={{ textAlign: "left" }}>Witaj {user.firstName} !</h2>
          <p>Zostałeś zalogowany.</p>
          <p>Twój login to: {user.login}</p>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AQUA LUX ©2022 Created by DevT
      </Footer>
    </Layout>
  );
};

export default ContentPage;
