import React from "react";
import { Typography } from "antd";

const GradeTest = () => {
  console.log("GradeTest component rendered");
  return (
    <div style={{ padding: "24px" }}>
      <Typography.Title level={4}>成绩管理测试页面</Typography.Title>
      <Typography.Paragraph>这是一个测试页面，用于检查成绩管理模块的路由配置是否正确。</Typography.Paragraph>
    </div>
  );
};

export default GradeTest;