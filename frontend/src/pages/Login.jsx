import React, { useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Space,
  Tabs,
  theme,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { login } from "../service/auth";
import { useNavigate } from "react-router";
import { usePermissionContext } from "../context/Permission";
import { useMessage } from "../context/MessageProvider";
import Captcha from "../component/Captcha";

const { TabPane } = Tabs;

const roles = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

const Login = () => {
  const { messageApi } = useMessage();
  const { _, setRole } = usePermissionContext();
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [activeRole, setActiveRole] = useState(roles.STUDENT); // 默认选中学生

  const onCaptchaReady = (key) => {
    // 验证码key获取成功
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await login({
        username: values.username,
        password: values.password,
        role: activeRole
      });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      setRole(activeRole);
=======
      // 模拟登录成功
      const token = "mock-token-" + Date.now();
      const role = activeRole;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setRole(role);
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
      messageApi.success("登录成功");
      nav("/");
    } catch (err) {
      messageApi.error(err.response?.data?.message || "登录异常");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveRole(key);
    form.resetFields(["username", "password"]); // 可选：切换角色清空输入
  };

  return (
    <Flex
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 400,
        background: token.Layout?.bodyBg || "#f0f2f5",
      }}
    >
      <Flex
        vertical
        align="center"
        style={{
          width: 425,
          padding: "40px 30px",
          background: token.colorBgContainer,
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ margin: "0 0 40px 0" }}>
          Easy Study
        </Title>

        <Tabs
          activeKey={activeRole}
          onChange={handleTabChange}
          centered
          style={{ width: "100%", marginBottom: 24 }}
        >
          <TabPane tab="学生登录" key={roles.STUDENT} />
          <TabPane tab="教师登录" key={roles.TEACHER} />
          <TabPane tab="管理员登录" key={roles.ADMIN} />
        </Tabs>

        <Form form={form} layout="vertical" onFinish={onFinish} style={{ width: "100%" }}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名/学号/工号" }]}
          >
            <Input placeholder="用户名 / 学号 / 工号" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="验证码"
                size="large"
                value={captchaCode}
                onChange={(e) => setCaptchaCode(e.target.value)}
                style={{ width: "calc(100% - 110px)" }}
              />
              <Captcha onCaptchaReady={onCaptchaReady} />
            </Space.Compact>
          </Form.Item>

          <Form.Item style={{ marginTop: 40, marginBottom: 0 }}>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button type="link">忘记密码？</Button>
          </div>
        </Form>
      </Flex>
    </Flex>
  );
};

export default Login;
