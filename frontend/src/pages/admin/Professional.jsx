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
  addProfessionalPlan,
  getAllProfessionalPlans,
  deleteProfessionalPlan,
} from "../../service/professional.js";
import { getAllCourse } from "../../service/course.js";
import FormModal from "../../component/FormModal";
import { getAllInstitute } from "../../service/institute.js";
import { useMessage } from "../../context/MessageProvider.jsx";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  
  // 表单实例
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [planForm] = Form.useForm(); // 培养方案表单

  // 全局状态
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 分页 + 数据
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [planData, setPlanData] = useState([]); // 培养方案数据
  const [planTotal, setPlanTotal] = useState(0); // 培养方案总数
  const institute = useRef([]);
  const [courseList, setCourseList] = useState([]); // 课程列表

  // 弹窗
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false); // 培养方案弹窗
  const [planViewOpen, setPlanViewOpen] = useState(false); // 培养方案查看弹窗
  const [planEditOpen, setPlanEditOpen] = useState(false); // 培养方案编辑弹窗
  const [currentPlan, setCurrentPlan] = useState(null); // 当前操作的培养方案
  
  // 获取当前路由路径
  const currentPath = location.pathname;

  const hasSelected = selectedRowKeys.length > 0;

  // 表格数据加 key
  const tableData = useMemo(() => {
    return data.map((item) => ({
      ...item,

      key: item.id,
    }));
  }, [data]);

  // 培养方案表格数据加 key
  const planTableData = useMemo(() => {
    return planData.map((item) => ({
      ...item,
      key: item.id,
    }));
  }, [planData]);

  // 培养方案表格列
  const planColumns = useMemo(() => [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "专业名称",
      dataIndex: "professionalName",
    },
    {
      title: "Action",
      render: (record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => handleViewPlan(record)}>查看</Button>
          <Button size="small" onClick={() => handleEditPlan(record)}>编辑</Button>
          <Button size="small" danger onClick={() => handleDeletePlan(record)}>删除</Button>
        </Space>
      )
    }
  ], []);

  // 刷新专业数据
  const refresh = async (page = pageNum) => {
    console.log("开始刷新专业数据，页码:", page);
    setLoading(true);

    try {
      const res = await getProfessionalPage({ pageNum: page, pageSize: 10 });
<<<<<<< HEAD
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
=======
      console.log('Professional data response:', res);
      // 正确处理后端返回的数据结构
      setData(res.data?.content || []);
      setTotal(res.data?.totalElements || 0);
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
      setPageNum(page);
      // 刷新后清空选择
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (err) {
<<<<<<< HEAD
      console.error("加载专业数据失败:", err);
      messageApi.error(`加载专业数据失败: ${err.message || '未知错误'}`);
      setData([]);
      setTotal(0);
=======
      console.log('加载专业数据失败:', err);
      messageApi.error("加载专业数据失败");
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
    } finally {
      setLoading(false);
    }
  };

  // 刷新培养方案数据
  const refreshPlan = async (page = pageNum) => {
    setLoading(true);

    try {
      // 调用后端接口获取所有培养方案
      const res = await getAllProfessionalPlans();
      console.log('Professional plan data response:', res);
      // 正确处理后端返回的数据结构
      setPlanData(res.data || []);
      setPlanTotal(res.data?.length || 0);
      setPageNum(page);
      // 刷新后清空选择
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (err) {
      console.log('加载培养方案数据失败:', err);
      messageApi.error("加载培养方案数据失败");
    } finally {
      setLoading(false);
    }
  };

  // 加载课程列表
  const loadCourses = async () => {
    try {
      const res = await getAllCourse();
      setCourseList(res?.data || []);
    } catch {
      setCourseList([]);
    }
  };

  useEffect(() => {
    if (currentPath === '/professional/plan') {
      refreshPlan();
    } else {
      refresh();
    }
    loadCourses();
  }, [currentPath]);




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
<<<<<<< HEAD
      const result = await addProfessional(values);
      console.log("新增专业结果:", result);
      if (result) {
=======
      const res = await addProfessional(values);
      // 检查后端返回的数据结构
      if (res.code === 200) {
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
        messageApi.success("新增成功");
        addForm.resetFields();
        setAddOpen(false);
        refresh();
      } else {
<<<<<<< HEAD
        messageApi.error("新增失败: 无返回结果");
      }
    } catch (error) {
      console.error("新增专业失败:", error);
      messageApi.error(`新增失败: ${error.message || '未知错误'}`);
=======
        messageApi.error(res.message || "新增失败");
      }
    } catch (err) {
      console.log('新增专业失败:', err);
      messageApi.error("新增失败");
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
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
<<<<<<< HEAD
      const result = await updateProfessional({
=======
      const res = await updateProfessional({
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
        id: selectedRowRef.current.id,
        name: values.name,
        instituteId: values.instituteId
      });
<<<<<<< HEAD
      console.log("修改专业结果:", result);
      if (result) {
=======
      // 检查后端返回的数据结构
      if (res.code === 200) {
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
        messageApi.success("修改成功");
        setUpdateOpen(false);
        refresh();
      } else {
<<<<<<< HEAD
        messageApi.error("修改失败: 无返回结果");
      }
    } catch (error) {
      console.error("修改专业失败:", error);
      messageApi.error(`修改失败: ${error.message || '未知错误'}`);
=======
        messageApi.error(res.message || "修改失败");
      }
    } catch (err) {
      console.log('修改专业失败:', err);
      messageApi.error("修改失败");
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
    } finally {
      setConfirmLoading(false);
    }
  };

  // 删除
  const handleDelete = async () => {
    const id = selectedRowKeys[0];
<<<<<<< HEAD
    const res = await deleteProfessional(id);
    console.log(res)
    if (res.code === 200) {

      messageApi.success("删除成功");
    } else {
      messageApi.error(res.message);
    }
    refresh();

=======
    try {
      const res = await deleteProfessional(id);
      console.log(res)
      if (res.code === 200) {
        messageApi.success("删除成功");
      } else {
        messageApi.error(res.message || "删除失败");
      }
      refresh();
    } catch (err) {
      console.log('删除专业失败:', err);
      messageApi.error("删除失败");
    }

  };

  // 打开培养方案弹窗
  const handleOpenPlan = () => {
    if (!selectedRowRef.current) {
      messageApi.warning("请先选择一个专业");
      return;
    }
    planForm.resetFields();
    setPlanOpen(true);
  };

  // 提交培养方案
  const handlePlanOk = async () => {
    const values = await planForm.validateFields();
    setConfirmLoading(true);
    try {
      // 调用后端接口保存培养方案
      const res = await addProfessionalPlan({
        professionalId: selectedRowRef.current.id,
        courseIds: values.courseIds,
        semesters: values.courseIds.map(() => 1) // 暂时默认所有课程都在第1学期
      });
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("培养方案添加成功");
        setPlanOpen(false);
        refreshPlan(); // 刷新培养方案列表
      } else {
        messageApi.error(res.message || "培养方案添加失败");
      }
    } catch (err) {
      console.log('保存培养方案失败:', err);
      messageApi.error("培养方案添加失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 查看培养方案
  const handleViewPlan = (record) => {
    setCurrentPlan(record);
    setPlanViewOpen(true);
  };

  // 编辑培养方案
  const handleEditPlan = (record) => {
    setCurrentPlan(record);
    // 这里可以根据record.id获取详细的培养方案信息，然后填充到表单中
    setPlanEditOpen(true);
  };

  // 删除培养方案
  const handleDeletePlan = async (record) => {
    try {
      const res = await deleteProfessionalPlan(record.id);
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("培养方案删除成功");
        refreshPlan(); // 刷新培养方案列表
      } else {
        messageApi.error(res.message || "培养方案删除失败");
      }
    } catch (err) {
      console.log('删除培养方案失败:', err);
      messageApi.error("培养方案删除失败");
    }
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
  };

  return (
    <>
      {currentPath === '/professional/plan' ? (
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
              培养方案管理
            </Typography.Title>
            <Button type="primary" onClick={handleOpenPlan}>
              添加培养方案
            </Button>
          </div>

          {/* 表格区域 */}
          <div style={{ flex: 1, overflow: "hidden", padding: "16px 24px" }}>
            <Table
              rowSelection={{
                type: "radio",
                selectedRowKeys,
                onChange: handleSelectChange,
              }}
              columns={planColumns}
              dataSource={planTableData}
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
              total={planTotal}
              showSizeChanger
              showQuickJumper
              showTotal={(t) => `共 ${t} 条`}
              onChange={(p) => refreshPlan(p)}
            />
          </div>
        </Flex>
      ) : (
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
      )}

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

      {/* 培养方案弹窗 */}
      <FormModal
        title="添加培养方案"
        open={planOpen}
        onCancel={() => setPlanOpen(false)}
        onSubmit={handlePlanOk}
        loading={confirmLoading}
      >
        <Form form={planForm} layout="vertical">
          <div style={{ marginBottom: 16, fontWeight: "bold", color: "#1890ff" }}>
            当前专业：{selectedRowRef.current?.name || "-"}
          </div>

          <Form.Item
            name="courseIds"
            label="选择课程"
            rules={[{ required: true, message: "请选择至少一门课程" }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择课程（可多选）"
              loading={courseList.length === 0}
              style={{ width: "100%" }}
            >
              {courseList.map(c => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>

      {/* 培养方案查看弹窗 */}
      <FormModal
        title="查看培养方案"
        open={planViewOpen}
        onCancel={() => setPlanViewOpen(false)}
        onSubmit={() => setPlanViewOpen(false)}
        submitText="关闭"
      >
        <div>
          <h3 style={{ marginBottom: 16 }}>{currentPlan?.professionalName} 培养方案</h3>
          <div style={{ marginBottom: 16 }}>
            <strong>课程列表：</strong>
          </div>
          <Table
            columns={[
              { title: "课程名称", dataIndex: "name" },
              { title: "课程代码", dataIndex: "code" },
              { title: "学期", dataIndex: "semester" }
            ]}
            dataSource={currentPlan?.courses || []}
            pagination={false}
          />
        </div>
      </FormModal>

      {/* 培养方案编辑弹窗 */}
      <FormModal
        title="编辑培养方案"
        open={planEditOpen}
        onCancel={() => setPlanEditOpen(false)}
        onSubmit={() => setPlanEditOpen(false)}
        loading={confirmLoading}
      >
        <Form form={planForm} layout="vertical">
          <div style={{ marginBottom: 16, fontWeight: "bold", color: "#1890ff" }}>
            当前专业：{currentPlan?.professionalName || "-"}
          </div>

          <Form.Item
            name="courseIds"
            label="选择课程"
            rules={[{ required: true, message: "请选择至少一门课程" }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择课程（可多选）"
              loading={courseList.length === 0}
              style={{ width: "100%" }}
            >
              {courseList.map(c => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </>
  );
};

export default Professional;
