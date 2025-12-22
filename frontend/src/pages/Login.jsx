import React, { useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  message,
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
import { verifyCaptcha } from "../service/captcha";
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
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [activeRole, setActiveRole] = useState(roles.STUDENT); // 默认选中学生

  const onCaptchaReady = (key) => {
    setCaptchaKey(key);
  };

  const onFinish = async (values) => {
    setLoading(true);

    if (!captchaCode) {
      messageApi.error("请输入验证码");
      setLoading(false);
      return;
    }

    try {
      const verifyResp = await verifyCaptcha({
        captchaCode,
        captchaKey,
      });

      if (verifyResp.code !== 200) {
        messageApi.error("验证码错误");
        setLoading(false);
        return;
      }

      // 添加 role 字段
      const loginData = {
        ...values,
        role: activeRole,
      };

      const resp = await login(loginData);

      if (resp.data.code === 200) {
        const { token, user } = resp.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role.name);
        setRole(activeRole);
        messageApi.success("登录成功");
        nav("/");
      } else {
        messageApi.error(resp.data.message || "登录失败");
      }
    } catch (err) {
      messageApi.error("登录异常");
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
