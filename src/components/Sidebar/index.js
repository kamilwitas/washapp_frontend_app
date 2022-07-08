import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  LoginOutlined,
  HomeOutlined,
  TeamOutlined,
  BarsOutlined,
  LogoutOutlined,
  SolutionOutlined,
  TagsOutlined,
  AimOutlined,
} from "@ant-design/icons";

import "../../styles/App.less";
import "antd/dist/antd.less";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    if (collapsed) {
      setCollapsed({ collapsed });
    } else {
      setCollapsed(!{ collapsed });
    }
  };
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        style={{ fontSize: "15px"}}
      >
        <Menu.Item
          key="/dashboard"
          icon={<HomeOutlined style={{ fontSize: "22px" }}/>}
          onClick={() => navigate("/dashboard")}
        >
          Pulpit
        </Menu.Item>
        <Menu.Item
          key="/adoption"
          icon={<LoginOutlined style={{ fontSize: "22px" }}/>}
          onClick={() => navigate("/adoption")}
        >
          Przyjęcie prania
        </Menu.Item>
        <Menu.Item
          key="/release"
          icon={<LogoutOutlined style={{ fontSize: "22px" }}/>}
          onClick={() => navigate("/release")}
        >
          Wydanie prania
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/users")}
          key="/users"
          icon={<TeamOutlined style={{ fontSize: "22px" }}/>}
          title="Użytkownicy"
        >
          Użytkownicy
        </Menu.Item>
        <Menu.Item
          key="/clients"
          onClick={() => navigate("/clients")}
          icon={<SolutionOutlined style={{ fontSize: "22px" }}/>}
        >
          Klienci
        </Menu.Item>
        <SubMenu key="sub4" icon={<TagsOutlined style={{ fontSize: "22px" }}/>} title="Asortyment">
          <Menu.Item
            key="/assortment"
            onClick={() => navigate("/assortment")}
            icon={<TagsOutlined />}
          >
            Asortyment
          </Menu.Item>
          <Menu.Item
            key="/category"
            onClick={() => navigate("/category")}
            icon={<BarsOutlined />}
          >
            Kategorie
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="/locations"
          onClick={() => navigate("/locations")}
          icon={<AimOutlined style={{ fontSize: "22px" }}/>}
        >
          Lokalizacje
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
