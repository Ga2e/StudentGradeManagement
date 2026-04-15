import React from 'react';
import { Flex, Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={2}>欢迎进入管理页面</Title>
      </div>
    </div>
  );
};

export default Dashboard;