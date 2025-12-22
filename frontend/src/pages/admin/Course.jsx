import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  getCoursePage,
  getAllCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  electCourse,
} from "../../service/course";
import { getAllTeacher } from "../../service/teacher"; // 你需要有这个接口
import FormModal from "../../component/FormModal";
import { getAllTerm } from "../../service/term";


const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "课程编号", dataIndex: "code" },
  { title: "课程名称", dataIndex: "name" },
  {
    title: "学分",
    dataIndex: "credits",
    render: (v) => (v ? v.toFixed(1) : "-"),
  },
  { title: "学时", dataIndex: "hours" },
  {
    title: "任课教师",
    dataIndex: "teachers",
    render: (ids, record) => {
      if (!ids || ids.length === 0) return "-";
      return ids.map(id => (<Tag key={id} > 教师 {id} </Tag>)); // 实际项目建议转成名字
    },
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (t) => (t ? new Date(t).toLocaleString() : "-"),
  },
];

const Course = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [electForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 下拉数据
  const [teacherList, setTeacherList] = useState([]);
  const [termList, setTermList] = useState([]);

  // 弹窗
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [electOpen, setElectOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map(item => ({ ...item, key: item.id }));
  }, [data]);

  // 加载学期列表（用于选课弹窗下拉）
  const loadTerms = async () => {
    try {
      const res = await getAllTerm(); // 你已有的接口
      setTermList(res || []);
    } catch {
      setTermList([]);
      messageApi.error("加载学期列表失败");
    }
  };

  // 加载教师列表
  const loadTeachers = async () => {
    try {
      const res = await getAllTeacher();
      setTeacherList(res || []);
    } catch {
      setTeacherList([]);
    }
  };

  // 加载学期列表

  // 刷新课程列表
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getCoursePage({ pageNum: page, pageSize });
      setData(res.content || []);
      setTotal(res.totalElements || 0);
      setPageNum(page);
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch {
      messageApi.error("加载课程失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    loadTeachers();
    loadTerms();
  }, []);

  const handleSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
  };

  // 新增
  const handleAddOk = async () => {
    const values = await addForm.validateFields();
    setConfirmLoading(true);
    try {
      await addCourse(values);
      messageApi.success("新增成功");
      setAddOpen(false);
      addForm.resetFields();
      refresh();
    } catch {
      messageApi.error("新增失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 修改
  const handleUpdate = () => {
    const row = selectedRowRef.current;
    if (!row) return messageApi.warning("请先选择一门课程");

    updateForm.setFieldsValue({
      id: row.id,
      code: row.code,
      name: row.name,
      credits: row.credits,
      hours: row.hours,
      teacherIds: row.teachers || [],
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateCourse(values);
      messageApi.success("修改成功");
      setUpdateOpen(false);
      refresh();
    } catch {
      messageApi.error("修改失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async () => {
    const id = selectedRowKeys[0];
    try {
      await deleteCourse(id);
      messageApi.success("删除成功");
      refresh();
    } catch {
      messageApi.error("删除失败");
    }
  };

  // 选课
  const handleElect = () => {
    if (!selectedRowRef.current) {
      return messageApi.warning("请先选择一门课程");
    }
    electForm.resetFields();
    setElectOpen(true);
  };

  const handleElectOk = async () => {
    const values = await electForm.validateFields();
    setConfirmLoading(true);
    try {
      await electCourse({
        userId: currentUser.id,
        courseId: selectedRowRef.current.id,
        termId: values.termId,
      });
      messageApi.success("选课成功");
      setElectOpen(false);
    } catch {
      messageApi.error("选课失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex vertical style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部栏 */}
        <div style={{ padding: "16px 24px", background: "#fff", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>课程管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>新增课程</Button>
              <Button onClick={handleElect} disabled={!hasSelected}>学生选课</Button>
              <Button onClick={handleUpdate} disabled={!hasSelected}>添加授课老师</Button>
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
            style={{ height: "100%" }}
            locale={{ emptyText: <Empty description="暂无课程" /> }}
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
            showTotal={(t) => `共 ${t} 门`}
            onChange={refresh}
          />
        </div>
      </Flex>

      {/* 新增课程 */}
      <FormModal title="新增课程" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading}>
        <Form form={addForm} layout="vertical">
          <Form.Item name="code" label="课程编号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="credits" label="学分" rules={[{ required: true }]}>
            <InputNumber step={0.5} />
          </Form.Item>
          <Form.Item name="hours" label="学时" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改课程 */}
      <FormModal title="修改课程" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading}>
        <Form form={updateForm} layout="vertical">
          <Form.Item name="id" hidden />
          <Form.Item name="code" label="课程编号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="teacherIds" label="任课教师" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="请选择教师">
              {teacherList.map(t => (
                <Select.Option key={t.id} value={t.id}>{t.name || `教师${t.id}`}</Select.Option>
              ))}

            </Select>
          </Form.Item>
          <Form.Item name="credits" label="学分">
            <InputNumber step={0.5} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="hours" label="学时">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>

      <FormModal
        title="学生选课"
        open={electOpen}
        onCancel={() => setElectOpen(false)}
        onSubmit={handleElectOk}
        loading={confirmLoading}
      >
        <Form form={electForm} layout="vertical">
          <div style={{ marginBottom: 16, fontWeight: "bold" }}>
            当前课程：{selectedRowRef.current?.name || "-"}
          </div>
          <Form.Item name="termId" label="选择学期" rules={[{ required: true, message: "请选择学期" }]}>
            <Select placeholder="请选择学期">
              {termList.map(term => (
                <Select.Option key={term.id} value={term.id}>
                  {term.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>




    </>
  );
};

export default Course;
