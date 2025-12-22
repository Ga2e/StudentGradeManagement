// MyGrade.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Tabs,
  Empty,
  Tag,
  Typography,
  Spin,
  message,
} from "antd";
import { getMyGrades } from "../../service/grade";

const { TabPane } = Tabs;

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "课程编号", dataIndex: ["course", "code"] },
  { title: "课程名称", dataIndex: ["course", "name"] },
  {
    title: "成绩",
    dataIndex: "score",
    render: (score) => (
      <Tag color={score >= 60 ? "green" : "red"}>
        {score ?? "-"}
      </Tag>
    ),
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: "类型",
    dataIndex: "type",
    render: (type) => (
      <Tag color={type === "MAJOR" ? "blue" : "purple"}>
        {type === "MAJOR" ? "主修" : "选修"}
      </Tag>
    ),
  },
  {
    title: "录入时间",
    dataIndex: "createdAt",
    render: (t) => (t ? new Date(t).toLocaleDateString() : "-"),
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    defaultSortOrder: "descend",
  },
];

const MyGrade = () => {
  const [loading, setLoading] = useState(true);
  const [allGrades, setAllGrades] = useState([]);     // 原始所有成绩
  const [majorGrades, setMajorGrades] = useState([]); // 主修
  const [electiveGrades, setElectiveGrades] = useState([]); // 选修

  useEffect(() => {
    const loadGrades = async () => {
      setLoading(true);
      try {
        const res = await getMyGrades();
        const grades = res || [];

        // 假设后端返回的 GradeResp 有字段 type: "MAJOR" 或 "ELECTIVE"
        // 如果没有这个字段，你需要根据课程是否属于专业必修来判断（可后续扩展）
        const major = grades.filter(g => g.type === "MAJOR");
        const elective = grades.filter(g => g.type === "ELECTIVE");

        setAllGrades(grades);
        setMajorGrades(major);
        setElectiveGrades(elective);
      } catch (err) {
        message.error("加载成绩失败");
      } finally {
        setLoading(false);
      }
    };

    loadGrades();
  }, []);

  const getTableData = (data) =>
    data.map(item => ({ ...item, key: item.id }));

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        我的成绩
      </Typography.Title>

      <Spin spinning={loading}>
        <Tabs defaultActiveKey="all" size="large">
          <TabPane tab={`全部 (${allGrades.length})`} key="all">
            <Table
              columns={columns}
              dataSource={getTableData(allGrades)}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="暂无成绩记录" /> }}
            />
          </TabPane>

          <TabPane tab={`主修 (${majorGrades.length})`} key="major">
            <Table
              columns={columns.filter(c => c.dataIndex !== "type")} // 主修页可隐藏类型列
              dataSource={getTableData(majorGrades)}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="暂无主修成绩" /> }}
            />
          </TabPane>

          <TabPane tab={`选修 (${electiveGrades.length})`} key="elective">
            <Table
              columns={columns.filter(c => c.dataIndex !== "type")}
              dataSource={getTableData(electiveGrades)}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="暂无选修成绩" /> }}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default MyGrade;
