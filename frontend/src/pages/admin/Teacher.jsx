// src/pages/Teacher/index.jsx 或 Teacher.jsx
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
  DatePicker,
} from "antd";
import {
  getTeacherPage,
  getAllTeacher,
  addTeacher,
  updateTeacher,
  updateTeacherProfile,
  deleteTeacher,
} from "../../service/teacher";
import FormModal from "../../component/FormModal";

const { Option } = Select;

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "工号", dataIndex: "code" },
  { title: "姓名", dataIndex: ["teacherProfile", "name"] },
  { title: "性别", dataIndex: ["teacherProfile", "gender"] },
  { title: "邮箱", dataIndex: "email" },
  { title: "手机", dataIndex: "phone" },
  { title: "职称", dataIndex: ["teacherProfile", "title"] },
  { title: "学历", dataIndex: ["teacherProfile", "degree"] },
  {
    title: "入职日期",
    dataIndex: ["teacherProfile", "hireDate"],
    render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
  },
];

const Teacher = () => {
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
      const res = await getTeacherPage({ pageNum: page, pageSize });
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
      await addTeacher(values);
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
    if (!row) return messageApi.warning("请先选择一位教师");
    console.log(row)
    updateForm.setFieldsValue({
      id: row.id,
      email: row.email,
      phone: row.phone,
      password: '', // 密码不回显
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateTeacher(values);
      messageApi.success("修改成功");
      setUpdateOpen(false);
      refresh();
    } catch {
      messageApi.error("修改失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 更新个人资料（profile）
  const handleUpdateProfile = () => {
    const row = selectedRowRef.current;
    if (!row) return messageApi.warning("请先选择一位教师");

    profileForm.setFieldsValue({
      userId: row.id,
      name: row.teacherProfile.name,
      gender: row.teacherProfile.gender,
      avatar: row.teacherProfile.avatar,
      title: row.teacherProfile.title,
      degree: row.teacherProfile.degree,
      officeRoom: row.teacherProfile.officeRoom,
    });
    setProfileOpen(true);
  };

  const handleProfileOk = async () => {
    const values = await profileForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateTeacherProfile(values);
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
      await deleteTeacher(id);
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
            <Typography.Title level={4} style={{ margin: 0 }}>教师管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>新增教师</Button>
              <Button onClick={handleUpdateProfile} disabled={!hasSelected}>更新个人资料</Button>
              <Button onClick={handleUpdate} disabled={!hasSelected}>修改基本信息</Button>
              <Button danger onClick={handleDelete} disabled={!hasSelected}>删除</Button>
            </Space>
          </div>
        </div>

        {/* 表格 */}
        <div style={{ flex: 1, overflow: "hidde", padding: "16px 24px" }}>
          <Table
            rowSelection={{ type: "radio", selectedRowKeys, onChange: handleSelectChange }}
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={false}
            scroll={{ y: "100%" }}

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

      {/* 新增教师 */}
      <FormModal title="新增教师" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading}>
        <Form form={addForm} layout="vertical">
          <Form.Item name={["teacherProfile", "name"]} label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="code" label="工号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="初始密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>


          <Form.Item name={["teacherProfile", "gender"]} label="性别">
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item name={["teacherProfile", "title"]} label="职称">
            <Input />
          </Form.Item>
          <Form.Item name={["teacherProfile", "degree"]} label="学历">
            <Input />
          </Form.Item>
          <Form.Item name={["teacherProfile", "officeRoom"]} label="办公室">
            <Input />
          </Form.Item>
          <Form.Item name={["teacherProfile", "hireDate"]} label="入职日期">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

        </Form>
      </FormModal>

      {/* 修改基本信息 
*/}
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
          <Form.Item name="title" label="职称">
            <Input />
          </Form.Item>
          <Form.Item name="degree" label="学历">
            <Input />
          </Form.Item>
          <Form.Item name="officeRoom" label="办公室">
            <Input />
          </Form.Item>
          <Form.Item name="hireDate" label="入职日期">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Teacher;
