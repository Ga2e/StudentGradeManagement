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
    title: "professionalName",
    dataIndex: "name",
  },
  {
    title: "InstituteName",
    render: (record) => (
      <span>
        {record.institute.name}
      </span>
    )
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

  // 刷新数据
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




  // 表格单选
  const handleSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
    console.log(selectedRowRef.current)
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
      const result = await addProfessional(values);
      console.log("新增专业结果:", result);
      if (result) {
        messageApi.success("新增成功");
        addForm.resetFields();
        setAddOpen(false);
        refresh();
      } else {
        messageApi.error("新增失败: 无返回结果");
      }
    } catch (error) {
      console.error("新增专业失败:", error);
      messageApi.error(`新增失败: ${error.message || '未知错误'}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  // 修改
  const handleUpdate = async () => {
    if (!selectedRowRef.current) {
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
      updateForm.setFieldsValue({
        name: selectedRowRef.current.name,
        instituteId: selectedRowRef.current.institute?.id,  // 关键！
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
      const result = await updateProfessional({
        id: selectedRowRef.current.id,
        name: values.name,
        instituteId: values.instituteId
      });
      console.log("修改专业结果:", result);
      if (result) {
        messageApi.success("修改成功");
        setUpdateOpen(false);
        refresh();
      } else {
        messageApi.error("修改失败: 无返回结果");
      }
    } catch (error) {
      console.error("修改专业失败:", error);
      messageApi.error(`修改失败: ${error.message || '未知错误'}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async () => {
    const id = selectedRowKeys[0];
    const res = await deleteProfessional(id);
    console.log(res)
    if (res.code === 200) {

      messageApi.success("删除成功");
    } else {
      messageApi.error(res.message);
    }
    refresh();

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
            Professional
          </Typography.Title>
          <Space>
            <Button type="primary" onClick={handleAdd}>
              新增专业
            </Button>
            <Button danger onClick={handleDelete} disabled={!hasSelected}>
              删除
            </Button>
            <Button onClick={handleUpdate} disabled={!hasSelected}>
              修改
            </Button>
          </Space>
        </div>

        {/* 表格区域 */}
        <div style={{ flex: 1, overflow: "hidden", padding: "16px 24px" }}>
          <Table
            rowSelection={{
              type: "radio",
              selectedRowKeys,
              onChange: handleSelectChange,
            }}
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

          <Form.Item name="instituteId" label="withInstitute" rules={[{ required: true, message: "请选择所属院校" }]}>
            <Select style={{ width: 120 }} options={institute.current.map((value, index) => ({ value: value.id, label: value.name }))}>

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
          <Form.Item name="instituteId" label="withInstitute" rules={[{ required: true, message: "请选择所属院校" }]}>
            <Select style={{ width: 120 }} options={institute.current.map((value, index) => ({ value: value.id, label: value.name }))}>

            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Professional;
