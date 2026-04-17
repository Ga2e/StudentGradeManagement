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
];

const Course = () => {
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [addForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);



  // 弹窗
  const [addOpen, setAddOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map(item => ({ ...item, key: item.id }));
  }, [data]);

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

  const handleSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    selectedRowRef.current = selectedRows[0] || null;
  };

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

  // 删除
  const handleDelete = async () => {
    console.log('删除按钮被点击', selectedRowKeys);
    const id = selectedRowKeys[0];
    if (!id) {
      message.warning("请先选择一门课程");
      return;
    }
    try {
      console.log('删除课程 ID:', id);
      console.log('删除课程 ID 类型:', typeof id);
      await deleteCourse(id);
      message.success("删除成功");
      refresh();
    } catch (error) {
      console.error('删除失败', error);
      message.error("删除失败");
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
              <Button danger onClick={handleDelete} disabled={!hasSelected}>删除</Button>
            </Space>
          </div>
        </div>

        {/* 表格 */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          <Table
            rowSelection={{ type: "radio", selectedRowKeys, onChange: handleSelectChange }}
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







    </>
  );
};

export default Course;