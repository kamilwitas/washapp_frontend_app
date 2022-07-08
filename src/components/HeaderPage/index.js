import React, { useContext, useEffect } from "react";

import { Avatar, Menu, Dropdown } from "antd";
import logo from "../../images/aqua-lux-logo.png";

import {
  SettingOutlined,
  UserOutlined,
  PoweroffOutlined,
  MoreOutlined
} from "@ant-design/icons";

import { getUserInfo } from "../../api/user";

import { UserContext } from "../../context/userContext";
import { useAuthContext } from "../../context/authContext";

import "../../styles/App.less";
import "antd/dist/antd.less";

const HeaderPage = () => {
  const { setLoggedIn } = useAuthContext();
  const { user, setUser } = useContext(UserContext);

  const onLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
  };
  
  const getUser = async () => {
    const response = await getUserInfo();
    setUser(response);
  };

  useEffect(() => {
    getUser();
  },[]);

  const avatarMenu = (
    <Menu>
      <Menu.Item key="Ustawienia" style={{height: "4rem"}}>
        <span onClick={() => console.log("Ustawienia")} style={{fontSize: "18px"}}>
          <SettingOutlined style={{ color: "black", fontSize: "22px", paddingRight: ".5rem" }} /> Ustawienia
        </span>
      </Menu.Item>
      <Menu.Item onClick={onLogout} key="Wyloguj" style={{height: "5rem"}}>
        <span style={{fontSize: "17px"}}>
          <PoweroffOutlined style={{ color: "red", fontSize: "22px", paddingRight: ".5rem" }} /> Wyloguj
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        height: "6rem",
        width: "100%",
        borderBottom: "1px solid #dedede",
        backgroundColor: "#f1f1f1",
        alignItems: "center",
        textAlign: "left",
      }}
    >
      <div style={{ paddingTop: "3rem", paddingLeft: "1rem" }}>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          height: "6rem",
          width: "100%",
          borderBottom: "1px solid #dedede",
          backgroundColor: "#f1f1f1",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <>
          <span>
            Użytkownik: <strong>{user.firstName} {user.lastName}<MoreOutlined style={{padding: "1rem"}}/> </strong>
          </span>
          <Dropdown overlay={avatarMenu} placement="bottomCenter" arrow>
            <Avatar
              style={{
                backgroundColor: "#225896",
                marginRight: "4rem",
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </>
      </div>
    </div>
  );
};

export default HeaderPage;
