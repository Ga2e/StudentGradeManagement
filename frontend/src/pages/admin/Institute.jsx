import {
  Button,
  Empty,
  Flex,
  Form,
  Input,
  message,
  Pagination,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addInstitute,
  deleteInstituteById,
  getPages,
  updateInstitute,
} from "../../service/institute";
import FormModal from "../../component/FormModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

const Institute = () => {
  // ========== 选中行（只读）==========
  const selectedRowRef = useRef(null);                // 永远保存最新选中的那一整行
  const [selectRowKeys, setSelectRowKeys] = useState([]); // 只给 radio 勾选状态用

  // ========== 表单实例==========
  const [addForm] = Form.useForm();      // 新增用的
  const [updateForm] = Form.useForm();   // 修改用的

  // ========== 全局状态 ==========
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // ========== 分页 ==========
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  // ========== 弹窗开关 ==========
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [updateModelOpen, setUpdateModelOpen] = useState(false);

  const hasSelected = selectRowKeys.length > 0;

  // ========== 表格数据处理 ==========
  const formattedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      key: item.id ?? index,
    }));
  }, [data]);

  // ========== 刷新数据 ==========
  const refresh = async () => {
    setLoading(true);
    try {
      const res = await getPages({ pageNum: pageNum - 1, pageSize });
      setData(res.content);
      setTotal(res.totalElements);
    } finally {
      setLoading(false);
    }
  };

  // ========== 表格选择回调 ==========
  const handleSelectionChange = (keys, rows) => {
    setSelectRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
  };

  // ========== 删除 ==========
  const deleteAction = async () => {
    await deleteInstituteById(selectRowKeys[0])
      .then(resp => {
        console.log(resp)
        if (resp.code === 200) {

          messageApi.success("删除成功");
        } else {

          messageApi.error(resp.message);
        }
      })
    refresh()
  };

  // ========== 新增 ==========
  const addAction = () => setAddModelOpen(true);
  const addOkHandler = async () => {
    const values = await addForm.validateFields();
    setConfirmLoading(true);
    try {
      await addInstitute(values);
      messageApi.success("添加成功");
      addForm.resetFields();
      setAddModelOpen(false);
      refresh();
    } finally {
      setConfirmLoading(false);
    }
  };

  // ========== 修改 ==========
  const updateAction = () => {
    if (!selectedRowRef.current) {
      messageApi.warning("请先选择一条数据");
      return;
    }
    updateForm.setFieldsValue({
      name: selectedRowRef.current.name,
    });
    setUpdateModelOpen(true);
  };

  const updateOkHandler = async () => {
    const values = await updateForm.validateFields();
    setConfirmLoading(true);
    try {
      await updateInstitute({
        id: selectedRowRef.current.id,
        ...values,
      });
      messageApi.success("修改成功");
      setUpdateModelOpen(false);
      refresh();
    } finally {
      setConfirmLoading(false);
    }
  };

  // ========== 页面加载 & 分页切换 ==========
  useEffect(() => {
    refresh();
  }, [pageNum]);

  return (
    <>
      {contextHolder}

      {/* 新增弹窗 */}
      <FormModal
        title="Add Institute"
        open={addModelOpen}
        onCancel={() => {
          addForm.resetFields();
          setAddModelOpen(false);
        }}
        onSubmit={addOkHandler}
        loading={confirmLoading}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="name"
            label="Institute Name"
            rules={[{ required: true, message: "请输入机构名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改弹窗 */}
      <FormModal
        title="Update Institute"
        open={updateModelOpen}
        onCancel={() => setUpdateModelOpen(false)}
        onSubmit={updateOkHandler}
        loading={confirmLoading}
      >
        <Form form={updateForm} layout="vertical">
          <Form.Item
            name="name"
            label="Institute Name"
            rules={[{ required: true, message: "请输入机构名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 页面主体 */}
      <Flex vertical style={{ width: "100%", height: "100vh" }}>
        <Flex justify="space-between" align="center" style={{ height: 64, flexShrink: 0, padding: "0 24px" }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Institute
          </Typography.Title>
          <Space>
            <Button type="primary" onClick={addAction}>
              Add
            </Button>
            <Button
              type="primary"
              danger
              onClick={deleteAction}
              disabled={!hasSelected}
            >
              Delete
            </Button>
            <Button
              type="primary"
              onClick={updateAction}
              disabled={!hasSelected}
            >
              Update
            </Button>
          </Space>
        </Flex>

        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys: selectRowKeys,
            onChange: handleSelectionChange,
          }}
          columns={columns}
          dataSource={formattedData}
          loading={loading}
          pagination={false}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无数据"
              />
            ),
          }}
          style={{ flex: 1, }}
          scroll={{ y: "100%" }}
        />

        <Pagination
          style={{ textAlign: "left" }}
          current={pageNum}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={(page) => setPageNum(page)}
        />
      </Flex>
    </>
  );
};

export default Institute;





