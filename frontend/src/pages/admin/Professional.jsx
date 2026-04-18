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
} from "antd";
import {
  addProfessional,
  deleteProfessional,
  deleteProfessionalBatch,
  getAllProfessional,
  getProfessionalPage,
  updateProfessional,
} from "../../service/professional.js";
import FormModal from "../../component/FormModal";
import { getAllInstitute } from "../../service/institute.js";
import { useMessage } from "../../context/MessageProvider.jsx";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "专业名称",
    dataIndex: "name",
  },
  {
    title: "所属院校",
    render: (record) => (
      <span>
        {record.institute.name}
      </span>
    )
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



const Professional = () => {
  // 选中的行（只读）
  const selectedRowRef = useRef(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { messageApi } = useMessage()
  
  // 表单实例
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  // 全局状态
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 分页 + 数据
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const institute = useRef([]);

  // 弹窗
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const hasSelected = selectedRowKeys.length > 0;

  // 表格数据加 key
  const tableData = useMemo(() => {
    return data.map((item) => ({
      ...item,

      key: item.id,
    }));
  }, [data]);

  // 刷新专业数据
  const refresh = async (page = pageNum) => {
    console.log("开始刷新专业数据，页码:", page);
    setLoading(true);

    try {
      const res = await getProfessionalPage({ pageNum: page, pageSize: 10 });
      console.log("获取专业数据结果:", res);
      // 检查响应数据结构
      if (res && typeof res === 'object') {
        // 尝试不同的数据结构
        const content = res.content || res.data?.content || [];
        const totalElements = res.totalElements || res.data?.totalElements || 0;
        setData(content);
        setTotal(totalElements);
        console.log("设置专业数据:", content.length, "条，总数:", totalElements);
      } else {
        console.error("响应数据格式错误:", res);
        setData([]);
        setTotal(0);
      }
      setPageNum(page);
      // 刷新后清空选择
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (err) {
      console.error("加载专业数据失败:", err);
      messageApi.error(`加载专业数据失败: ${err.message || '未知错误'}`);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);




  // 表格多选
  const handleSelectChange = (keys, selectedRows) => {
    // 提取选中行的ID数组
    const ids = selectedRows.map(row => row.id);
    setSelectedRowKeys(ids);
    selectedRowRef.current = selectedRows || [];
    console.log('选中的ID:', ids);
  };

  // 加载院校信息 
  const instituteLoad = async () => {
    try {

      const res = await getAllInstitute()

      return res
    } catch (error) {

    }
  }

  // 新增
  const handleAdd = async () => {
    try {
      setLoading(true);
      institute.current = await instituteLoad();
      if (!institute.current || institute.current.length === 0) {
        messageApi.warning("请先添加院校数据");
        return;
      }
      setAddOpen(true);
    } catch (error) {
      messageApi.error("加载院校数据失败");
    } finally {
      setLoading(false);
    }
  };
  const handleAddOk = async (values) => {
    console.log("表单提交数据:", values);
    setConfirmLoading(true);
    try {
      const res = await addProfessional(values);
      console.log("新增专业结果:", res);
      // 检查后端返回的数据结构
      if (res && (res.code === 200 || res.data)) {
        messageApi.success("新增成功");
        addForm.resetFields();
        setAddOpen(false);
        refresh();
      } else {
        messageApi.error(res?.message || "新增失败: 无返回结果");
      }
    } catch (error) {
      console.error("新增专业失败:", error);
      messageApi.error(`新增失败: ${error.message || '未知错误'}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  // 修改
  const handleUpdate = async (record) => {
    if (!record) {
      messageApi.warning("请先选择一条专业");
      return;
    }
    try {
      setLoading(true);
      if (!institute.current || institute.current.length === 0) {
        institute.current = await instituteLoad();
        if (!institute.current || institute.current.length === 0) {
          messageApi.warning("请先添加院校数据");
          return;
        }
      }
      selectedRowRef.current = record;
      updateForm.setFieldsValue({
        name: record.name,
        instituteId: record.institute?.id,  // 关键！
      });

      setUpdateOpen(true);
    } catch (error) {
      messageApi.error("加载院校数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOk = async (values) => {
    console.log("修改专业数据:", values);
    setConfirmLoading(true);
    try {
      const res = await updateProfessional({
        id: selectedRowRef.current.id,
        name: values.name,
        instituteId: values.instituteId
      });
      console.log("修改专业结果:", res);
      // 检查后端返回的数据结构
      if (res && (res.code === 200 || res.data)) {
        messageApi.success("修改成功");
        setUpdateOpen(false);
        refresh();
      } else {
        messageApi.error(res?.message || "修改失败: 无返回结果");
      }
    } catch (error) {
      console.error("修改专业失败:", error);
      messageApi.error(`修改失败: ${error.message || '未知错误'}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async (id) => {
    // 如果传入了id，说明是从操作列点击的删除按钮
    if (id) {
      try {
        console.log('删除单个专业，ID:', id);
        const res = await deleteProfessional(id);
        console.log('删除单个专业响应:', res);
        if (res && (res.code === 200 || res.data)) {
          messageApi.success("删除成功");
        } else {
          messageApi.error(res?.message || "删除失败");
        }
        refresh();
      } catch (error) {
        console.error("删除专业失败:", error);
        messageApi.error(`删除失败: ${error.message || '未知错误'}`);
      }
    } else {
      // 否则，说明是批量删除
      if (!selectedRowRef.current || selectedRowRef.current.length === 0) {
        messageApi.warning("请先选择要删除的专业");
        return;
      }
      
      try {
        // 从选中的行中提取ID
        const selectedIds = selectedRowRef.current.map(row => row.id);
        console.log('批量删除专业，ID列表:', selectedIds);
        
        // 使用批量删除接口
        const res = await deleteProfessionalBatch(selectedIds);
        console.log('批量删除专业响应:', res);
        
        if (res && (res.code === 200 || res.data)) {
          messageApi.success(`成功删除 ${selectedIds.length} 个专业`);
        } else {
          messageApi.error(res?.message || "删除失败");
        }
        
        refresh();
      } catch (error) {
        console.error("批量删除专业失败:", error);
        messageApi.error(`删除失败: ${error.message || '未知错误'}`);
      }
    }
  };

  return (
    <>
      <Flex vertical style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部栏 */}
        <div
          style={{
            padding: "16px 24px",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            专业管理
          </Typography.Title>
          <Space>
            <Button type="primary" onClick={handleAdd}>
              新增专业
            </Button>
            <Button danger onClick={handleDelete} disabled={selectedRowKeys.length === 0}>
              批量删除
            </Button>
          </Space>
        </div>

        {/* 表格区域 */}
        <div style={{ flex: 1, overflow: "hidden", padding: "16px 24px" }}>
          <Table
            rowSelection={{
              type: "checkbox",
              selectedRowKeys: selectedRowKeys,
              onChange: (keys, selectedRows) => handleSelectChange(keys, selectedRows),
            }}
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={false}
            style={{ height: "100%" }}
            locale={{ emptyText: <Empty description="暂无数据" /> }}
          />
        </div>

        {/* 分页 */}
        <div
          style={{
            padding: "16px 24px",
            background: "#fff",
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          <Pagination
            current={pageNum}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(t) => `共 ${t} 条`}
            onChange={(p) => refresh(p)}
          />
        </div>
      </Flex>

      {/* 新增弹窗 */}
      <FormModal
        title="新增专业"
        open={addOpen}
        onCancel={() => {
          addForm.resetFields();
          setAddOpen(false);
        }}
        onSubmit={handleAddOk}
        loading={confirmLoading}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="name"
            label="专业名称"
            rules={[{ required: true, message: "请输入专业名称" }]}
          >
            <Input placeholder="如：计算机科学与技术" />
          </Form.Item>

          <Form.Item name="instituteId" label="所属院校" rules={[{ required: true, message: "请选择所属院校" }]}>
            <Select style={{ width: 120 }} options={Array.isArray(institute.current) ? institute.current.map((value, index) => ({ value: value.id, label: value.name })) : []}>

            </Select>

          </Form.Item>

        </Form>
      </FormModal>

      {/* 修改弹窗 */}
      <FormModal
        title="修改专业"
        open={updateOpen}
        onCancel={() => setUpdateOpen(false)}
        onSubmit={handleUpdateOk}
        loading={confirmLoading}
      >
        <Form form={updateForm} layout="vertical">
          <Form.Item
            name="name"
            label="专业名称"
            rules={[{ required: true, message: "请输入专业名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="instituteId" label="所属院校" rules={[{ required: true, message: "请选择所属院校" }]}>
            <Select style={{ width: 120 }} options={Array.isArray(institute.current) ? institute.current.map((value, index) => ({ value: value.id, label: value.name })) : []}>

            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Professional;
