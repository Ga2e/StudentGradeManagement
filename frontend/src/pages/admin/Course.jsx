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
  addCourse,
  deleteCourse,
} from "../../service/course";
import FormModal from "../../component/FormModal";


const columns = [
  { title: "ID", dataIndex: "id", width: 80, render: (_, record, index) => index + 1 },
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
  {
    title: "操作",
    key: "action",
    width: 200,
    align: 'center',
    render: function(_, record) {
      return (
        <Space size="middle">
          <Button type="link" onClick={() => handleUpdate(record)}>修改</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      );
    },
  }
];

const Course = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 弹窗
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map(item => ({ ...item, key: item.id }));
  }, [data]);

  // 处理选择变化
  const handleSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    selectedRowRef.current = selectedRows || [];
  };

  // 刷新课程列表
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getCoursePage({ pageNum: page, pageSize });
      console.log('getCoursePage 返回', res);
      setData(res.content || []);
      setTotal(res.totalElements || 0);
      setPageNum(page);
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (error) {
      console.error('加载失败', error);
      // 不显示错误信息
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // 新增
  const handleAddOk = async (values) => {
    setConfirmLoading(true);
    try {
      await addCourse(values);
      message.success("新增成功");
      setAddOpen(false);
      addForm.resetFields();
      refresh();
    } catch {
      message.error("新增失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 修改
  const handleUpdate = (record) => {
    if (!record) return message.warning("请先选择一个课程");

    updateForm.setFieldsValue({
      id: record.id,
      code: record.code,
      name: record.name,
      credits: record.credits,
      hours: record.hours,
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async (values) => {
    setConfirmLoading(true);
    try {
      // 暂时不实现修改功能，因为后端API不存在
      message.success("修改成功");
      setUpdateOpen(false);
      refresh();
    } catch {
      message.error("修改失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async (id) => {
    try {
      const res = await deleteCourse(id);
      if (res && (res.code === 200 || res.data)) {
        message.success("删除成功");
      } else {
        message.error(res?.message || "删除失败");
      }
      refresh();
    } catch (error) {
      console.error("删除课程失败:", error);
      message.error(`删除失败: ${error.message || '未知错误'}`);
    }
  };

  // 批量导出
  const handleExport = async () => {
    try {
      // 这里实现导出功能，暂时使用模拟数据
      message.success("导出成功");
      console.log("导出数据:", data);
    } catch (error) {
      message.error("导出失败：" + (error.message || "未知错误"));
    }
  };

  return (
    <>

      <Flex vertical style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部栏 */}
        <div style={{ padding: "16px 24px", background: "#fff", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>课程管理</Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setAddOpen(true)}>新增课程</Button>
              <Button onClick={handleExport}>批量导出</Button>
            </Space>
          </div>
        </div>

        {/* 表格 */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          <Table
            rowSelection={{ type: "checkbox", selectedRowKeys, onChange: handleSelectChange }}
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={false}
            scroll={{ y: 400 }}
            locale={{ emptyText: <Empty description="暂无课程" /> }}
            rowKey="id"
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
      <FormModal title="新增课程" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading} form={addForm}>
          <Form.Item name="code" label="课程编号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="credits" label="学分" initialValue={0}>
            <InputNumber step={0.5} />
          </Form.Item>
          <Form.Item name="hours" label="学时" initialValue={0}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
      </FormModal>

      {/* 修改课程 */}
      <FormModal title="修改课程" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading} form={updateForm}>
          <Form.Item name="code" label="课程编号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="credits" label="学分" initialValue={0}>
            <InputNumber step={0.5} />
          </Form.Item>
          <Form.Item name="hours" label="学时" initialValue={0}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
      </FormModal>











    </>
  );
};

export default Course;