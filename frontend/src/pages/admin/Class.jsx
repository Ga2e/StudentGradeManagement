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
  Typography,
} from "antd";
import {
  getClassPage,
  addClass,
  updateClass,
  deleteClass,
  addCoursesToClass,
} from "../../service/class";
import { getProfessionalPage } from "../../service/professional"; // 复用专业接口
import { getAllCourse } from "../../service/course"; // 你要有这个接口获取所有课程
import FormModal from "../../component/FormModal";

const { Option } = Select;

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "班级名称", dataIndex: "name" },
  { title: "入学年份", dataIndex: "year" },
  {
    title: "所属专业",
    dataIndex: ["professional", "name"],
    render: (text) => text || "-",
  },
  {
    title: "已关联课程",
    dataIndex: "courseIds",
    render: (ids) => (
      <span>{ids?.length || 0} 门</span>
    ),
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (time) => (time ? new Date(time).toLocaleString() : "-"),
  },
];

const Class = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [courseForm] = Form.useForm(); // 专门给“添加课程”弹窗用

  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 下拉数据
  const [professionalList, setProfessionalList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  // 弹窗控制
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map((item) => ({ ...item, key: item.id }));
  }, [data]);

  // 加载专业列表（用于下拉）
  const loadProfessionals = async () => {
    try {
      const res = await getProfessionalPage({ pageNum: 1, pageSize: 999 });
      setProfessionalList(res.content || []);
    } catch {
      setProfessionalList([]);
    }
  };

  // 加载所有课程（用于多选）
  const loadCourses = async () => {
    try {
      const res = await getAllCourse(); // 你需要有这个接口
      setCourseList(res.data?.data || res.data || []);
    } catch {
      setCourseList([]);
    }
  };

  // 刷新班级列表
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getClassPage({ pageNum: page, pageSize });
      setData(res.content || []);
      setTotal(res.totalElements || 0);
      setPageNum(page);
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch {
      messageApi.error("加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    loadProfessionals();
    loadCourses();
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
      await addClass(values);
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
    if (!row) return messageApi.warning("请先选择一个班级");

    updateForm.setFieldsValue({
      id: row.id,
      name: row.name,
      year: row.year,
      professionalId: row.professional?.id,
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateClass(values);
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
      await deleteClass(id);
      messageApi.success("删除成功");
      refresh();
    } catch {
      messageApi.error("删除失败");
    }
  };

  // 添加课程
  const handleAddCourse = () => {
    if (!selectedRowRef.current) {
      return messageApi.warning("请先选择一个班级");
    }
    courseForm.resetFields();
    setCourseOpen(true);
  };

  const handleAddCourseOk = async () => {
    const values = await courseForm.validateFields();
    setConfirmLoading(true);
    try {
      await addCoursesToClass({
        classId: selectedRowRef.current.id,
        courseId: values.courseIds,
        termId: values.termId,
      });
      messageApi.success("课程添加成功");
      setCourseOpen(false);
      refresh();
    } catch {
      messageApi.error("添加失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex vertical style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部操作栏 */}
        <div style={{ padding: "16px 24px", background: "#fff", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>班级管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>新增班级</Button>
              <Button onClick={handleAddCourse} disabled={!hasSelected}>添加课程</Button>
              <Button onClick={handleUpdate} disabled={!hasSelected}>修改</Button>
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
            locale={{ emptyText: <Empty description="暂无数据" /> }}
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

      {/* 新增班级 */}
      <FormModal title="新增班级" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading}>
        <Form form={addForm} layout="vertical">
          <Form.Item name="name" label="班级名称" rules={[{ required: true }]}>
            <Input placeholder="如：2023级软件1班" />
          </Form.Item>
          <Form.Item name="year" label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} placeholder="如：2023" />
          </Form.Item>
          <Form.Item name="professionalId" label="所属专业" rules={[{ required: true }]}>
            <Select placeholder="请选择专业">
              {professionalList.map(p => (
                <Option key={p.id} value={p.id}>{p.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改班级 */}
      <FormModal title="修改班级" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading}>
        <Form form={updateForm} layout="vertical">
          <Form.Item name="name" label="班级名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="professionalId" label="所属专业" rules={[{ required: true }]}>
            <Select placeholder="请选择专业">
              {professionalList.map(p => (
                <Option key={p.id} value={p.id}>{p.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>

      {/* 给班级添加课程 */}
      <FormModal title="为班级添加课程" open={courseOpen} onCancel={() => setCourseOpen(false)} onSubmit={handleAddCourseOk} loading={confirmLoading}>
        <Form form={courseForm} layout="vertical">
          <Form.Item name="courseIds" label="选择课程" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="请选择课程（可多选）">
              {courseList.map(c => (
                <Option key={c.id} value={c.id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="termId" label="所属学期" rules={[{ required: true }]}>
            <Select placeholder="请选择学期">
              <Option value={1}>2024-2025 学年第一学期</Option>
              <Option value={2}>2024-2025 学年第二学期</Option>
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Class;
