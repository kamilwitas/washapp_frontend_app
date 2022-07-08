import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/aqua-lux-logo.png";
import { Form, Input, Button, Alert, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../context/authContext";
import { getLogin } from "../../api/user";

const LoginPage = () => {
  const { setLoggedIn } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [userValidate, setUserValidate] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resp = await getLogin({
        login: values.username,
        password: values.password,
      });
      sessionStorage.setItem("accessToken", resp);
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setUserValidate(true);
      setLoggedIn(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="loginPanelBox">
        <div style={{ textAlign: "center", justifyContent: "center" }}>
          <img src={logo} className="App-logo" alt="logo" />
          {userValidate ? (
            <Alert
              message="Podałeś błędne dane logowania!"
              type="error"
              style={{ margin: "1rem" }}
            />
          ) : null}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Proszę wprowadzić login!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                style={{ borderRadius: "10px", height: "3rem" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Proszę wprowadzić hasło!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{ borderRadius: "10px", height: "3rem" }}
              />
            </Form.Item>
            {/* <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Zapamiętaj mnie</Checkbox>
                            </Form.Item>
                        </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{
                  borderRadius: "10px",
                  height: "56px",
                  backgroundColor: "#225896",
                  border: "#225896 1px solid",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  fontWeight: "bold",
                  filter: "drop-shadow(-4px 4px 10px rgba(0, 0, 0, 0.15))",
                }}
              >
                {loading ? (
                  <>
                    <Spin indicator={antIcon} style={{ color: "white" }} />
                    <span style={{ paddingLeft: "1rem" }}>LOGOWANIE</span>
                  </>
                ) : (
                  "ZALOGUJ SIĘ"
                )}
              </Button>
            </Form.Item>
            <span><strong>© WashApp</strong> v. 1.0.1</span>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
