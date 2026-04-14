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
  getClassPage,
  addClass,
  updateClass,
  deleteClass,
} from "../../service/class";
import { getProfessionalPage } from "../../service/professional"; // 复用专业接口
import FormModal from "../../component/FormModal";


const { Option } = Select;

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "班级名称", dataIndex: "name" },
  { title: "开设年份", dataIndex: "year" },
  {
    title: "所属专业",
    dataIndex: ["professional", "name"],
    render: (text) => text || "-",
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

  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // 下拉数据
  const [professionalList, setProfessionalList] = useState([]);
  // 弹窗控制
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  const tableData = useMemo(() => {
    return data.map((item) => ({ ...item, key: item.id }));
  }, [data]);

  // 加载专业列表（用于下拉）
  const loadProfessionals = async () => {
    try {
      const res = await getProfessionalPage({ pageNum: 1, pageSize: 999 });
      const professionals = res.data?.content || [];
      console.log('专业列表:', professionals);
      setProfessionalList(professionals);
      // 设置表单默认值
      if (professionals.length > 0) {
        addForm.setFieldsValue({ professionalId: professionals[0].id });
        updateForm.setFieldsValue({ professionalId: professionals[0].id });
      }
    } catch (error) {
      console.log('加载专业列表失败:', error);
      // 不显示错误信息
    }
  };



  // 刷新班级列表
  const refresh = async (page = pageNum) => {
    setLoading(true);
    try {
      const res = await getClassPage({ pageNum: page, pageSize });
      console.log('班级列表数据:', res);
      setData(res.data?.content || []);
      setTotal(res.data?.totalElements || 0);
      setPageNum(page);
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (error) {
      console.log('加载班级列表失败:', error);
      // 不显示错误信息
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    loadProfessionals();
  }, []);

  // 当专业列表加载完成后，设置表单默认值
  useEffect(() => {
    if (professionalList.length > 0) {
      addForm.setFieldsValue({ type: 'ADMIN_CLSS', professionalId: professionalList[0].id });
      updateForm.setFieldsValue({ type: 'ADMIN_CLSS', professionalId: professionalList[0].id });
    }
  }, [professionalList]);

  const handleSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
  };

  // 新增
  const handleAddOk = async (values) => {
    setConfirmLoading(true);
    try {
      await addClass(values);
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
  const handleUpdate = () => {
    const row = selectedRowRef.current;
    if (!row) return message.warning("请先选择一个班级");

    updateForm.setFieldsValue({
      id: row.id,
      name: row.name,
      year: row.year,
      type: row.type,
      professionalId: row.professional?.id,
    });
    setUpdateOpen(true);
  };

  const handleUpdateOk = async (values) => {
    setConfirmLoading(true);
    try {
      await updateClass(values);
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
  const handleDelete = async () => {
    const id = selectedRowKeys[0];

    const res = await deleteClass(id);
    if (res.code === 200) {
      message.success("删除成功");

    } else {
      message.error(res.message);

    }
    refresh();


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
      <FormModal title="新增班级" open={addOpen} onCancel={() => setAddOpen(false)} onSubmit={handleAddOk} loading={confirmLoading} form={addForm}>
          <Form.Item name="name" label="班级名称" rules={[{ required: true }]}>
            <Input placeholder="如：2023级软件1班" />
          </Form.Item>
          <Form.Item name="year" label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} placeholder="如：2023" />
          </Form.Item>
          <Form.Item name="type" label="班级类型" rules={[{ required: true }]}>
            <Select placeholder="请选择班级类型">
              <Option value="ADMIN_CLSS">行政班</Option>
              <Option value="TEACHER_CLASS">教学班</Option>
            </Select>
          </Form.Item>
          <Form.Item name="professionalId" label="所属专业" rules={[{ required: true }]}>
            <Select placeholder="请选择专业">
              {professionalList.map(p => (
                <Option key={p.id} value={p.id}>{p.name}</Option>
              ))}
            </Select>
          </Form.Item>
      </FormModal>

      {/* 修改班级 */}
      <FormModal title="修改班级" open={updateOpen} onCancel={() => setUpdateOpen(false)} onSubmit={handleUpdateOk} loading={confirmLoading} form={updateForm}>
          <Form.Item name="name" label="班级名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="入学年份" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="type" label="班级类型" rules={[{ required: true }]}>
            <Select placeholder="请选择班级类型">
              <Option value="ADMIN_CLSS">行政班</Option>
              <Option value="TEACHER_CLASS">教学班</Option>
            </Select>
          </Form.Item>
          <Form.Item name="professionalId" label="所属专业" rules={[{ required: true }]}>
            <Select placeholder="请选择专业">
              {professionalList.map(p => (
                <Option key={p.id} value={p.id}>{p.name}</Option>
              ))}
            </Select>
          </Form.Item>
      </FormModal>









    </>
  );
};

export default Class;
