import {
  Button,
  Descriptions,
  Empty,
  Flex,
  Form,
  Input,
  message,
  Modal,
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
    } catch (error) {
      messageApi.error("获取数据失败：" + (error.message || "未知错误"));
    } finally {
      setLoading(false);
    }
  };

  // ========== 表格选择回调 ==========
  const handleSelectionChange = (keys, rows) => {
    setSelectRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
  };

  // ========== 新增 ==========
  const addAction = () => setAddModelOpen(true);
  const addOkHandler = async () => {
    const values = await addForm.validateFields();
    try {
      const resp = await addInstitute(values);
      if (resp.code === 200) {
        messageApi.success("添加成功");
        addForm.resetFields();
        setAddModelOpen(false);
        refresh();
      } else {
        messageApi.error(resp.message);
      }
    } catch (error) {
      messageApi.error("添加失败：" + (error.message || "未知错误"));
    }
  };

  // ========== 详情 ==========
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState({});

  const detailAction = (record) => {
    selectedRowRef.current = record;
    setDetailData(record);
    setDetailModalOpen(true);
  };

  // ========== 删除确认 ==========
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const deleteAction = (record) => {
    selectedRowRef.current = record;
    setDeleteRecord(record);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteRecord) return;
    try {
      const resp = await deleteInstituteById(deleteRecord.id);
      if (resp.code === 200) {
        messageApi.success("删除成功");
      } else {
        messageApi.error(resp.message);
      }
      await refresh();
      setDeleteModalOpen(false);
    } catch (error) {
      messageApi.error("删除失败：" + (error.message || "未知错误"));
    }
  };

  // ========== 修改 ==========
  const updateAction = (record) => {
    selectedRowRef.current = record;
    const { name, description, createdAt } = record;
    let formattedCreatedAt = null;
    if (createdAt) {
      const date = new Date(createdAt);
      formattedCreatedAt = date.toISOString().slice(0, 16);
    }
    updateForm.setFieldsValue({
      name,
      description,
      createdAt: formattedCreatedAt,
    });
    setUpdateModelOpen(true);
  };

  const updateOkHandler = async () => {
    const values = await updateForm.validateFields();
    try {
      const resp = await updateInstitute({
        id: selectedRowRef.current.id,
        ...values,
      });
      if (resp.code === 200) {
        messageApi.success("修改成功");
        setUpdateModelOpen(false);
        refresh();
      } else {
        messageApi.error(resp.message);
      }
    } catch (error) {
      messageApi.error("修改失败：" + (error.message || "未知错误"));
    }
  };

  // ========== 页面加载 & 分页切换 ==========
  useEffect(() => {
    refresh();
  }, [pageNum]);

  // ========== 表格列配置 ==========
  const columns = [
    {
      title: "学院名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      align: 'center',
      render: function(_, record) {
        return (
          <Space size="middle">
            <Button type="link" onClick={() => detailAction(record)}>详情</Button>
            <Button type="link" onClick={() => updateAction(record)}>修改</Button>
            <Button type="link" danger onClick={() => deleteAction(record)}>删除</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}

      {/* 新增弹窗 */}
      <FormModal
        title="新增学院"
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
            label="学院名称"
            rules={[{ required: true, message: "请输入学院名称" }]}
          >
            <Input placeholder="请输入学院名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="学院介绍"
          >
            <Input.TextArea 
              placeholder="请输入学院介绍" 
              rows={4} 
              maxLength={150} 
              showCount 
            />
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="创建时间"
          >
            <Input type="datetime-local" placeholder="请选择创建时间" />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 修改弹窗 */}
      <FormModal
        title="修改学院"
        open={updateModelOpen}
        onCancel={() => setUpdateModelOpen(false)}
        onSubmit={updateOkHandler}
        loading={confirmLoading}
      >
        <Form form={updateForm} layout="vertical">
          <Form.Item
            name="name"
            label="学院名称"
            rules={[{ required: true, message: "请输入学院名称" }]}
          >
            <Input placeholder="请输入学院名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="学院介绍"
          >
            <Input.TextArea 
              placeholder="请输入学院介绍" 
              rows={4} 
              maxLength={150} 
              showCount 
            />
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="创建时间"
          >
            <Input type="datetime-local" placeholder="请选择创建时间" />
          </Form.Item>
        </Form>
      </FormModal>

      {/* 详情弹窗 */}
      <Modal
        title="学院详情"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setDetailModalOpen(false)}>
            确定
          </Button>,
        ]}
        width={600}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="学院名称">{detailData.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="学院简介">{detailData.description || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {detailData.createdAt ? new Date(detailData.createdAt).toLocaleString() : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal
        title="确定要删除吗？"
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalOpen(false)}>
            取消
          </Button>,
          <Button key="ok" type="primary" danger onClick={handleDelete}>
            确定删除
          </Button>,
        ]}
        width={400}
      >
        <p>确定要删除「{deleteRecord?.name || ''}」学院吗？</p>
      </Modal>

      {/* 页面主体 */}
      <Flex vertical style={{ width: "100%", height: "100vh" }}>
        <Flex justify="space-between" align="center" style={{ height: 64, flexShrink: 0, padding: "0 24px" }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            学院管理
          </Typography.Title>
          <Space>
            <Button type="primary" onClick={addAction}>
              新增学院
            </Button>
          </Space>
        </Flex>

        <Table
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
          components={{
            header: {
              cell: ({ children, column, ...rest }) => {
                if (column && column.key === 'action') {
                  return (
                    <th {...rest} style={{ ...rest.style, borderLeft: '1px solid #d9d9d9' }}>
                      {children}
                    </th>
                  );
                }
                return <th {...rest}>{children}</th>;
              },
            },
            body: {
              cell: ({ children, column, ...rest }) => {
                if (column && column.key === 'action') {
                  return (
                    <td {...rest} style={{ ...rest.style, borderLeft: '1px solid #d9d9d9' }}>
                      {children}
                    </td>
                  );
                }
                return <td {...rest}>{children}</td>;
              },
            },
          }}
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





