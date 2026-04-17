import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Spin,
  message,
  Empty,
  theme,
} from "antd";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  BookOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import { getMyGrades } from "../../service/grade";

const { Title } = Typography;

const GradeChart = () => {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const { token } = theme.useToken();

  useEffect(() => {
    const loadGrades = async () => {
      setLoading(true);
      try {
        const res = await getMyGrades();
        setGrades(res || []);
      } catch {
        message.error("加载成绩失败");
      } finally {
        setLoading(false);
      }
    };
    loadGrades();
  }, []);

  const scores = grades.map((g) => parseFloat(g.score) || 0);
  const validScores = scores.filter((s) => s > 0);

  const avgScore =
    validScores.length > 0
      ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1)
      : 0;
  const maxScore =
    validScores.length > 0 ? Math.max(...validScores).toFixed(1) : 0;
  const minScore =
    validScores.length > 0 ? Math.min(...validScores).toFixed(1) : 0;
  const passCount = validScores.filter((s) => s >= 60).length;
  const failCount = validScores.filter((s) => s < 60).length;
  const passRate =
    validScores.length > 0
      ? ((passCount / validScores.length) * 100).toFixed(1)
      : 0;

  const getBarOption = () => ({
    title: {
      text: "各科成绩",
      left: "center",
      textStyle: { color: token.colorText },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: grades.map((g) => g.course?.name || "未知课程"),
      axisLabel: {
        rotate: 30,
        color: token.colorText,
      },
      axisLine: { lineStyle: { color: token.colorBorder } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: token.colorBorder } },
      axisLabel: { color: token.colorText },
      splitLine: { lineStyle: { color: token.colorBorderSecondary } },
    },
    series: [
      {
        name: "成绩",
        type: "bar",
        data: scores,
        itemStyle: {
          color: (params) => {
            return params.value >= 60 ? "#52c41a" : "#ff4d4f";
          },
        },
        label: {
          show: true,
          position: "top",
          color: token.colorText,
        },
      },
    ],
  });

  const getPieOption = () => ({
    title: {
      text: "成绩分布",
      left: "center",
      textStyle: { color: token.colorText },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}门 ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: { color: token.colorText },
    },
    series: [
      {
        name: "成绩分布",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: token.colorBgContainer,
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: "{b}: {c}门",
          color: token.colorText,
        },
        data: [
          { value: passCount, name: "及格", itemStyle: { color: "#52c41a" } },
          { value: failCount, name: "不及格", itemStyle: { color: "#ff4d4f" } },
        ],
      },
    ],
  });

  const getScoreDistributionOption = () => {
    const ranges = [
      { name: "90-100", min: 90, max: 100 },
      { name: "80-89", min: 80, max: 89 },
      { name: "70-79", min: 70, max: 79 },
      { name: "60-69", min: 60, max: 69 },
      { name: "0-59", min: 0, max: 59 },
    ];

    const distribution = ranges.map((range) => ({
      name: range.name,
      value: validScores.filter(
        (s) => s >= range.min && s <= range.max
      ).length,
    }));

    return {
      title: {
        text: "分数段分布",
        left: "center",
        textStyle: { color: token.colorText },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}门 ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: { color: token.colorText },
      },
      series: [
        {
          name: "分数段",
          type: "pie",
          radius: "60%",
          data: distribution,
          label: {
            show: true,
            formatter: "{b}: {c}门",
            color: token.colorText,
          },
          itemStyle: {
            color: (params) => {
              const colors = ["#52c41a", "#73d13d", "#faad14", "#fa8c16", "#ff4d4f"];
              return colors[params.dataIndex];
            },
          },
        },
      ],
    };
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (grades.length === 0) {
    return (
      <div style={{ padding: 24, background: token.colorBgContainer }}>
        <Empty description="暂无成绩记录" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, background: token.colorBgContainer, minHeight: "100%" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        成绩可视化分析
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="平均分"
              value={avgScore}
              suffix="分"
              prefix={<BookOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="最高分"
              value={maxScore}
              suffix="分"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="最低分"
              value={minScore}
              suffix="分"
              prefix={<FallOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="及格率"
              value={passRate}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: passRate >= 60 ? "#52c41a" : "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card>
            <ReactECharts
              option={getBarOption()}
              style={{ height: 350 }}
              opts={{ renderer: "svg" }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <ReactECharts
              option={getPieOption()}
              style={{ height: 350 }}
              opts={{ renderer: "svg" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts
              option={getScoreDistributionOption()}
              style={{ height: 300 }}
              opts={{ renderer: "svg" }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="成绩概览">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="总课程数"
                  value={grades.length}
                  suffix="门"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="及格课程"
                  value={passCount}
                  suffix="门"
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="不及格课程"
                  value={failCount}
                  suffix="门"
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="优秀课程(≥90)"
                  value={validScores.filter((s) => s >= 90).length}
                  suffix="门"
                  valueStyle={{ color: "#faad14" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GradeChart;
