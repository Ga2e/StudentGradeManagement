// src/pages/Grade/index.jsx 或 Grade.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Empty,
  Flex,
  Form,
  InputNumber,
  message,
  Pagination,
  Space,
  Table,
  Typography,
  Tag,
  Select,
} from "antd";
import {
  getGradePage,
  addGrade,
  updateGrade,
  deleteGrade,
  getMyGrades,
  getStudentGrades,
} from "../../service/grade";
import { getAllStudent } from "../../service/student"; // 用于录入时选学生
import { getAllCourse } from "../../service/course"; // 用于录入时选课程
import FormModal from "../../component/FormModal";

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "学生学号", dataIndex: ["student", "code"] || "-" },
  { title: "学生姓名", dataIndex: ["student", "studentProfile", "name"] || "-" },
  { title: "课程名称", dataIndex: ["course", "name"] },
  { title: "课程编号", dataIndex: ["course", "code"] },
  {
    title: "成绩",
    dataIndex: "score",
    render: (score) => (
      <Tag color={score >= 60 ? "green" : "red"}>
        {score ?? "-"}
      </Tag>
    ),
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (t) => (t ? new Date(t).toLocaleString() : "-"),
  },
];

const Grade = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  // 弹窗
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => data.map(item => ({ ...item, key: item.id })), [data]);

  // 加载下拉数据
  const loadStudents = async () => {
    try {
      const res = await getAllStudent();
      setStudentList(res || []);
    } catch {
      setStudentList([]);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await getAllCourse();
      setCourseList(res || []);
    } catch {
      setCourseList([]);
    }
  };

  // 刷新成绩列表（管理员分页）
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getGradePage({ pageNum: page, pageSize });
      setData(res.content || []);
      setTotal(res.totalElements || 0);
      setPageNum(page);
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch {
      messageApi.error("加载成绩失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    loadStudents();
    loadCourses();
  }, []);

  const handleSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
  };

  // 新增成绩
  const handleAddOk = async () => {
    const values = await addForm.validateFields();
    setConfirmLoading(true);
    try {
      await addGrade(values);
      messageApi.success("录入成功");
      setAddOpen(false);
      addForm.resetFields();
      refresh();
    } catch {
      messageApi.error("录入失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 修改成绩
  const handleUpdate = () => {
    const row = selectedRowRef.current;
    if (!row) return messageApi.warning("请先选择一条成绩");
    updateForm.setFieldsValue({
      id: row.id,
      score: row.score,
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateGrade(values);
      messageApi.success("修改成功");
      setUpdateOpen(false);
      refresh();
    } catch {
      messageApi.error("修改失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除成绩
  const handleDelete = async () => {
    const id = selectedRowKeys[0];
    try {
      await deleteGrade(id);
      messageApi.success("删除成功");
      refresh();
    } catch {
      messageApi.error("删除失败");
    }
  };

  return (
    <>
      {contextHolder}
      <Flex vertical style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部操作栏 */}
        <div style={{ padding: "16px 24px", background: "#fff", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>成绩管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>录入成绩</Button>
              <Button onClick={handleUpdate} disabled={!hasSelected}>修改成绩</Button>
              <Button danger onClick={handleDelete} disabled={!hasSelected}>删除</Button>
            </Space>
          </div>
        </div>

        {/* 表格 */}
        <div style={{ flex: 1, overflow: "hidden", padding: "16px 24px" }}>
          <Table
            rowSelection={{ type: "radio", selectedRowKeys, onChange: handleSelectChange }}
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={false}
            scroll={{ y: "100%" }}
            locale={{ emptyText: <Empty description="暂无成绩" /> }}
          />
        </div>

        {/* 分页 */}
        <div style={{ padding: "16px 24px", background: "#fff", textAlign: "right", flexShrink: 0 }}>
          <Pagination
            current={pageNum}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(t) => `共 ${t} 条`}
            onChange={refresh}
          />
        </div>
      </Flex>

      {/* 录入成绩 */}
      <FormModal title="录入成绩" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading}>
        <Form form={addForm} layout="vertical">
          <Form.Item name="studentId" label="选择学生" rules={[{ required: true }]}>
            <Select placeholder="请选择学生">
              {studentList.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.studentProfile?.name} ({s.code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="courseId" label="选择课程" rules={[{ required: true }]}>
            <Select placeholder="请选择课程">
              {courseList.map(c => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="score" label="成绩" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} step={0.1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改成绩 */}
      <FormModal title="修改成绩" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading}>
        <Form form={updateForm} layout="vertical">
          <Form.Item name="id" hidden />
          <Form.Item label="课程">{selectedRowRef.current?.course?.name || "-"}</Form.Item>
          <Form.Item label="学生">{selectedRowRef.current?.student?.studentProfile?.name || "-"}</Form.Item>
          <Form.Item name="score" label="新成绩" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} step={0.1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Grade;
