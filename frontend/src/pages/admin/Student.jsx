// src/pages/Student/index.jsx 或 Student.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Empty,
  Flex,
  Form,
  Input,
  message,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
  DatePicker,
  InputNumber,
} from "antd";
import {
  getStudentPage,
  addStudent,
  updateStudent,
  updateStudentProfile,
  deleteStudent,
} from "../../service/student";
import FormModal from "../../component/FormModal";
import moment from "moment";

const { Option } = Select;

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "学号", dataIndex: "code" },
  { title: "姓名", dataIndex: ["studentProfile", "name"] },
  {
    title: "性别",
    dataIndex: ["studentProfile", "gender"],
    render: (text) => (text === "男" ? "男" : text === "女" ? "女" : "-")
  },
  { title: "邮箱", dataIndex: "email" },
  { title: "手机", dataIndex: "phone" },
  { title: "入学年份", dataIndex: ["studentProfile", "enrollmentYear"] },
  { title: "预计毕业", dataIndex: ["studentProfile", "expectedGraduation"] },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (time) => (time ? new Date(time).toLocaleString() : "-"),
  },
];

const Student = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 弹窗控制
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map((item) => ({ ...item, key: item.id }));
  }, [data]);

  // 刷新列表
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getStudentPage({ pageNum: page, pageSize });
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
      await addStudent(values);
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

  // 修改基本信息
  const handleUpdate = () => {
    const row = selectedRowRef.current;
    if (!row) return messageApi.warning("请先选择一位学生");
    updateForm.setFieldsValue({
      id: row.id,
      email: row.email,
      phone: row.phone,
      password: "", // 密码不回显
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateStudent(values);
      messageApi.success("修改成功");
      setUpdateOpen(false);
      refresh();
    } catch {
      messageApi.error("修改失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 更新个人资料
  const handleUpdateProfile = () => {
    const row = selectedRowRef.current;
    if (!row) return messageApi.warning("请先选择一位学生");
    console.log(row)
    profileForm.setFieldsValue({
      userId: row.id,
      name: row.studentProfile?.name,
      gender: row.studentProfile?.gender,
      birthday: row.studentProfile?.birthday ? moment(row.studentProfile.birthday) : null,
      enrollmentYear: row.studentProfile?.enrollmentYear,
      expectedGraduation: row.studentProfile?.expectedGraduation,
      avatar: row.studentProfile?.avatar,
      idCard: row.studentProfile?.idCard,
    });
    setProfileOpen(true);
  };

  const handleProfileOk = async () => {
    const values = await profileForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateStudentProfile(values);
      messageApi.success("个人资料更新成功");
      setProfileOpen(false);
      refresh();
    } catch {
      messageApi.error("更新失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async () => {
    const id = selectedRowKeys[0];
    try {
      await deleteStudent(id);
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
            <Typography.Title level={4} style={{ margin: 0 }}>学生管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>新增学生</Button>
              <Button onClick={handleUpdateProfile} disabled={!hasSelected}>更新个人资料</Button>
              <Button onClick={handleUpdate} disabled={!hasSelected}>修改基本信息</Button>
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

      {/* 新增学生 */}
      <FormModal title="新增学生" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading}>
        <Form form={addForm} layout="vertical">
          <Form.Item name="code" label="学号" rules={[{ required: true }]}>
            <Input placeholder="如：2023001" />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="初始密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name={["studentProfile", "name"]} label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["studentProfile", "gender"]} label="性别">
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item name={["studentProfile", "birthday"]} label="出生日期">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={["studentProfile", "enrollmentYear"]} label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改基本信息 */}
      <FormModal title="修改基本信息" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading}>
        <Form form={updateForm} layout="vertical">
          <Form.Item name="id" hidden />
          <Form.Item name="email" label="邮箱" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="新密码（留空不改）">
            <Input.Password />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 更新个人资料 */}
      <FormModal title="更新个人资料" open={profileOpen} onCancel={() => setProfileOpen(false)} onSubmit={handleProfileOk} loading={confirmLoading}>
        <Form form={profileForm} layout="vertical">
          <Form.Item name="userId" hidden />
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item name="birthday" label="出生日期">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="enrollmentYear" label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="expectedGraduation" label="预计毕业年份">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="avatar" label="头像URL">
            <Input />
          </Form.Item>
          <Form.Item name="idCard" label="身份证号">
            <Input />
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Student;
