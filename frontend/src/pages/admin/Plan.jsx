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
  Tabs,
  Card,
  Divider,
} from "antd";
import {
  addVersionPlan,
  updateVersionPlan,
  deleteVersionPlan,
  getAllVersionPlans,
  getVersionPlansByProfessionalId,
  addGradePlan,
  updateGradePlan,
  deleteGradePlan,
  getAllGradePlans,
  getGradePlansByVersionPlanId,
  copyFromVersionPlan,
} from "../../service/plan.js";
import { getAllCourse } from "../../service/course.js";
import { getAllProfessional } from "../../service/professional.js";
import { getAllInstitute } from "../../service/institute.js";
import FormModal from "../../component/FormModal";
import { useMessage } from "../../context/MessageProvider.jsx";

const Plan = () => {
  // 选中的行（只读）
  const selectedRowRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { messageApi } = useMessage();
  
  // 表单实例
  const [versionPlanForm] = Form.useForm(); // 版本培养方案表单
  const [gradePlanForm] = Form.useForm(); // 年级培养方案表单
  const [copyForm] = Form.useForm(); // 复制培养方案表单

  // 全局状态
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 分页 + 数据
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [versionPlanData, setVersionPlanData] = useState([]); // 版本培养方案数据
  const [versionPlanTotal, setVersionPlanTotal] = useState(0); // 版本培养方案总数
  const [gradePlanData, setGradePlanData] = useState([]); // 年级培养方案数据
  const [gradePlanTotal, setGradePlanTotal] = useState(0); // 年级培养方案总数
  const [courseList, setCourseList] = useState([]); // 课程列表
  const [professionalList, setProfessionalList] = useState([]); // 专业列表
  const [instituteList, setInstituteList] = useState([]); // 院校列表
  const [selectedInstituteId, setSelectedInstituteId] = useState(null); // 选中的院校ID

  // 弹窗
  const [versionPlanOpen, setVersionPlanOpen] = useState(false); // 版本培养方案弹窗
  const [versionPlanViewOpen, setVersionPlanViewOpen] = useState(false); // 版本培养方案查看弹窗
  const [versionPlanEditOpen, setVersionPlanEditOpen] = useState(false); // 版本培养方案编辑弹窗
  const [gradePlanOpen, setGradePlanOpen] = useState(false); // 年级培养方案弹窗
  const [gradePlanViewOpen, setGradePlanViewOpen] = useState(false); // 年级培养方案查看弹窗
  const [gradePlanEditOpen, setGradePlanEditOpen] = useState(false); // 年级培养方案编辑弹窗
  const [copyOpen, setCopyOpen] = useState(false); // 复制培养方案弹窗
  const [currentVersionPlan, setCurrentVersionPlan] = useState(null); // 当前操作的版本培养方案
  const [currentGradePlan, setCurrentGradePlan] = useState(null); // 当前操作的年级培养方案
  
  const hasSelected = selectedRowKeys.length > 0;

  // 版本培养方案表格数据加 key
  const versionPlanTableData = useMemo(() => {
    return versionPlanData.map((item) => ({
      ...item,
      key: item.id,
    }));
  }, [versionPlanData]);

  // 版本培养方案表格列
  const versionPlanColumns = useMemo(() => [
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
      title: "版本号",
      dataIndex: "versionNumber",
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "Action",
      render: (record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => handleViewVersionPlan(record)}>查看</Button>
          <Button size="small" onClick={() => handleEditVersionPlan(record)}>编辑</Button>
          <Button size="small" onClick={() => handleCopyFromVersionPlan(record)}>复制为年级方案</Button>
          <Button size="small" danger onClick={() => handleDeleteVersionPlan(record)}>删除</Button>
        </Space>
      )
    }
  ], []);

  // 年级培养方案表格数据加 key
  const gradePlanTableData = useMemo(() => {
    return gradePlanData.map((item) => ({
      ...item,
      key: item.id,
    }));
  }, [gradePlanData]);

  // 年级培养方案表格列
  const gradePlanColumns = useMemo(() => [
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
      title: "版本号",
      dataIndex: "versionPlanNumber",
    },
    {
      title: "年级",
      dataIndex: "grade",
    },
    {
      title: "修订说明",
      dataIndex: "revisionNotes",
    },
    {
      title: "Action",
      render: (record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => handleViewGradePlan(record)}>查看</Button>
          <Button size="small" onClick={() => handleEditGradePlan(record)}>编辑</Button>
          <Button size="small" danger onClick={() => handleDeleteGradePlan(record)}>删除</Button>
        </Space>
      )
    }
  ], []);

  // 刷新版本培养方案数据
  const refreshVersionPlan = async (page = pageNum) => {
    setLoading(true);

    try {
      // 调用后端接口获取所有版本培养方案
      const res = await getAllVersionPlans();
      console.log('Version plan data response:', res);
      // 正确处理后端返回的数据结构
      setVersionPlanData(res.data || []);
      setVersionPlanTotal(res.data?.length || 0);
      setPageNum(page);
      // 刷新后清空选择
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (err) {
      console.log('加载版本培养方案数据失败:', err);
      messageApi.error("加载版本培养方案数据失败");
    } finally {
      setLoading(false);
    }
  };

  // 刷新年级培养方案数据
  const refreshGradePlan = async (page = pageNum) => {
    setLoading(true);

    try {
      // 调用后端接口获取所有年级培养方案
      const res = await getAllGradePlans();
      console.log('Grade plan data response:', res);
      // 正确处理后端返回的数据结构
      setGradePlanData(res.data || []);
      setGradePlanTotal(res.data?.length || 0);
      setPageNum(page);
      // 刷新后清空选择
      setSelectedRowKeys([]);
      selectedRowRef.current = null;
    } catch (err) {
      console.log('加载年级培养方案数据失败:', err);
      messageApi.error("加载年级培养方案数据失败");
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

  // 加载院校列表
  const loadInstitutes = async () => {
    try {
      const res = await getAllInstitute();
      setInstituteList(res?.data || []);
    } catch {
      setInstituteList([]);
    }
  };

  // 加载专业列表
  const loadProfessionals = async (instituteId = null) => {
    try {
      const res = await getAllProfessional();
      let professionals = res?.data || [];
      if (instituteId) {
        professionals = professionals.filter(p => p.instituteId === instituteId);
      }
      setProfessionalList(professionals);
    } catch {
      setProfessionalList([]);
    }
  };

  useEffect(() => {
    refreshVersionPlan();
    refreshGradePlan();
    loadCourses();
    loadInstitutes();
  }, []);

  // 当选中的院校变化时，重新加载专业列表
  useEffect(() => {
    loadProfessionals(selectedInstituteId);
  }, [selectedInstituteId]);

  // 表格单选
  const handleSelectChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    selectedRowRef.current = rows[0] || null;
    console.log(selectedRowRef.current);
  };

  // 版本培养方案相关方法
  // 打开版本培养方案弹窗
  const handleOpenVersionPlan = () => {
    versionPlanForm.resetFields();
    setVersionPlanOpen(true);
  };

  // 提交版本培养方案
  const handleVersionPlanOk = async () => {
    const values = await versionPlanForm.validateFields();
    setConfirmLoading(true);
    try {
      // 调用后端接口保存版本培养方案
      const res = await addVersionPlan({
        versionNumber: values.versionNumber,
        description: values.description,
        professionalId: values.professionalId,
        courses: values.courseIds.map(courseId => ({
          courseId,
          semester: 1 // 暂时默认所有课程都在第1学期
        }))
      });
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("版本培养方案添加成功");
        setVersionPlanOpen(false);
        refreshVersionPlan(); // 刷新版本培养方案列表
      } else {
        messageApi.error(res.message || "版本培养方案添加失败");
      }
    } catch (err) {
      console.log('保存版本培养方案失败:', err);
      messageApi.error("版本培养方案添加失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 查看版本培养方案
  const handleViewVersionPlan = (record) => {
    setCurrentVersionPlan(record);
    setVersionPlanViewOpen(true);
  };

  // 编辑版本培养方案
  const handleEditVersionPlan = (record) => {
    setCurrentVersionPlan(record);
    // 填充表单数据
    versionPlanForm.setFieldsValue({
      versionNumber: record.versionNumber,
      description: record.description,
      professionalId: record.professionalId,
      courseIds: record.courses?.map(course => course.courseId) || []
    });
    setVersionPlanEditOpen(true);
  };

  // 删除版本培养方案
  const handleDeleteVersionPlan = async (record) => {
    try {
      const res = await deleteVersionPlan(record.id);
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("版本培养方案删除成功");
        refreshVersionPlan(); // 刷新版本培养方案列表
      } else {
        messageApi.error(res.message || "版本培养方案删除失败");
      }
    } catch (err) {
      console.log('删除版本培养方案失败:', err);
      messageApi.error("版本培养方案删除失败");
    }
  };

  // 从版本培养方案复制生成年级培养方案
  const handleCopyFromVersionPlan = (record) => {
    setCurrentVersionPlan(record);
    copyForm.resetFields();
    setCopyOpen(true);
  };

  // 提交复制培养方案
  const handleCopyOk = async () => {
    const values = await copyForm.validateFields();
    setConfirmLoading(true);
    try {
      // 调用后端接口复制培养方案
      const res = await copyFromVersionPlan(currentVersionPlan.id, values.grade, values.revisionNotes);
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("年级培养方案复制成功");
        setCopyOpen(false);
        refreshGradePlan(); // 刷新年级培养方案列表
      } else {
        messageApi.error(res.message || "年级培养方案复制失败");
      }
    } catch (err) {
      console.log('复制培养方案失败:', err);
      messageApi.error("年级培养方案复制失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 年级培养方案相关方法
  // 打开年级培养方案弹窗
  const handleOpenGradePlan = () => {
    gradePlanForm.resetFields();
    setGradePlanOpen(true);
  };

  // 提交年级培养方案
  const handleGradePlanOk = async () => {
    const values = await gradePlanForm.validateFields();
    setConfirmLoading(true);
    try {
      // 调用后端接口保存年级培养方案
      const res = await addGradePlan({
        grade: values.grade,
        revisionNotes: values.revisionNotes,
        versionPlanId: values.versionPlanId,
        courses: values.courseIds.map(courseId => ({
          courseId,
          semester: 1, // 暂时默认所有课程都在第1学期
          isRevised: false,
          revisionReason: ''
        }))
      });
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("年级培养方案添加成功");
        setGradePlanOpen(false);
        refreshGradePlan(); // 刷新年级培养方案列表
      } else {
        messageApi.error(res.message || "年级培养方案添加失败");
      }
    } catch (err) {
      console.log('保存年级培养方案失败:', err);
      messageApi.error("年级培养方案添加失败");
    } finally {
      setConfirmLoading(false);
    }
  };

  // 查看年级培养方案
  const handleViewGradePlan = (record) => {
    setCurrentGradePlan(record);
    setGradePlanViewOpen(true);
  };

  // 编辑年级培养方案
  const handleEditGradePlan = (record) => {
    setCurrentGradePlan(record);
    // 填充表单数据
    gradePlanForm.setFieldsValue({
      grade: record.grade,
      revisionNotes: record.revisionNotes,
      versionPlanId: record.versionPlanId,
      courseIds: record.courses?.map(course => course.courseId) || []
    });
    setGradePlanEditOpen(true);
  };

  // 删除年级培养方案
  const handleDeleteGradePlan = async (record) => {
    try {
      const res = await deleteGradePlan(record.id);
      // 检查后端返回的数据结构
      if (res.code === 200) {
        messageApi.success("年级培养方案删除成功");
        refreshGradePlan(); // 刷新年级培养方案列表
      } else {
        messageApi.error(res.message || "年级培养方案删除失败");
      }
    } catch (err) {
      console.log('删除年级培养方案失败:', err);
      messageApi.error("年级培养方案删除失败");
    }
  };

  return (
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
      </div>

      {/* 标签页 */}
      <Tabs defaultActiveKey="version" style={{ flex: 1, overflow: "hidden" }}>
        {/* 版本培养方案标签页 */}
        <Tabs.TabPane tab="版本培养方案" key="version">
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>版本培养方案列表</span>
                <Button type="primary" onClick={handleOpenVersionPlan}>
                  添加版本培养方案
                </Button>
              </div>
            }
            bordered={false}
            style={{ height: "100%", margin: "16px 24px" }}
          >
            <Table
              rowSelection={{
                type: "radio",
                selectedRowKeys,
                onChange: handleSelectChange,
              }}
              columns={versionPlanColumns}
              dataSource={versionPlanTableData}
              loading={loading}
              pagination={{
                current: pageNum,
                pageSize: pageSize,
                total: versionPlanTotal,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (t) => `共 ${t} 条`,
                onChange: (p) => refreshVersionPlan(p)
              }}
              scroll={{ y: "calc(100vh - 300px)" }}
              locale={{ emptyText: <Empty description="暂无数据" /> }}
            />
          </Card>
        </Tabs.TabPane>

        {/* 年级培养方案标签页 */}
        <Tabs.TabPane tab="年级培养方案" key="grade">
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>年级培养方案列表</span>
                <Button type="primary" onClick={handleOpenGradePlan}>
                  添加年级培养方案
                </Button>
              </div>
            }
            bordered={false}
            style={{ height: "100%", margin: "16px 24px" }}
          >
            <Table
              rowSelection={{
                type: "radio",
                selectedRowKeys,
                onChange: handleSelectChange,
              }}
              columns={gradePlanColumns}
              dataSource={gradePlanTableData}
              loading={loading}
              pagination={{
                current: pageNum,
                pageSize: pageSize,
                total: gradePlanTotal,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (t) => `共 ${t} 条`,
                onChange: (p) => refreshGradePlan(p)
              }}
              scroll={{ y: "calc(100vh - 300px)" }}
              locale={{ emptyText: <Empty description="暂无数据" /> }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>

      {/* 版本培养方案弹窗 */}
      <FormModal
        title="添加版本培养方案"
        open={versionPlanOpen}
        onCancel={() => setVersionPlanOpen(false)}
        onSubmit={handleVersionPlanOk}
        loading={confirmLoading}
      >
        <Form form={versionPlanForm} layout="vertical">
          <Form.Item
            name="instituteId"
            label="院校"
            rules={[{ required: true, message: "请选择院校" }]}
          >
            <Select
              placeholder="请选择院校"
              loading={instituteList.length === 0}
              style={{ width: "100%" }}
              onChange={(value) => {
                setSelectedInstituteId(value);
                versionPlanForm.setFieldsValue({ professionalId: undefined });
              }}
            >
              {instituteList.map(i => (
                <Select.Option key={i.id} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="professionalId"
            label="专业"
            rules={[{ required: true, message: "请选择专业" }]}
          >
            <Select
              placeholder="请选择专业"
              loading={professionalList.length === 0}
              style={{ width: "100%" }}
            >
              {professionalList.map(p => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="versionNumber"
            label="版本号"
            rules={[{ required: true, message: "请输入版本号" }]}
          >
            <Input placeholder="如：2024版" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea placeholder="请输入版本培养方案描述" />
          </Form.Item>

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

      {/* 版本培养方案查看弹窗 */}
      <FormModal
        title="查看版本培养方案"
        open={versionPlanViewOpen}
        onCancel={() => setVersionPlanViewOpen(false)}
        onSubmit={() => setVersionPlanViewOpen(false)}
        submitText="关闭"
      >
        <div>
          <h3 style={{ marginBottom: 16 }}>{currentVersionPlan?.professionalName} 版本培养方案</h3>
          <div style={{ marginBottom: 16 }}>
            <strong>版本号：</strong>{currentVersionPlan?.versionNumber || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>描述：</strong>{currentVersionPlan?.description || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>课程列表：</strong>
          </div>
          <Table
            columns={[
              { title: "课程名称", dataIndex: "courseName" },
              { title: "课程代码", dataIndex: "courseCode" },
              { title: "学期", dataIndex: "semester" }
            ]}
            dataSource={currentVersionPlan?.courses || []}
            pagination={false}
          />
        </div>
      </FormModal>

      {/* 版本培养方案编辑弹窗 */}
      <FormModal
        title="编辑版本培养方案"
        open={versionPlanEditOpen}
        onCancel={() => setVersionPlanEditOpen(false)}
        onSubmit={handleVersionPlanOk}
        loading={confirmLoading}
      >
        <Form form={versionPlanForm} layout="vertical">
          <Form.Item
            name="instituteId"
            label="院校"
            rules={[{ required: true, message: "请选择院校" }]}
          >
            <Select
              placeholder="请选择院校"
              loading={instituteList.length === 0}
              style={{ width: "100%" }}
              onChange={(value) => {
                setSelectedInstituteId(value);
                versionPlanForm.setFieldsValue({ professionalId: undefined });
              }}
            >
              {instituteList.map(i => (
                <Select.Option key={i.id} value={i.id}>
                  {i.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="professionalId"
            label="专业"
            rules={[{ required: true, message: "请选择专业" }]}
          >
            <Select
              placeholder="请选择专业"
              loading={professionalList.length === 0}
              style={{ width: "100%" }}
            >
              {professionalList.map(p => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="versionNumber"
            label="版本号"
            rules={[{ required: true, message: "请输入版本号" }]}
          >
            <Input placeholder="如：2024版" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea placeholder="请输入版本培养方案描述" />
          </Form.Item>

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

      {/* 年级培养方案弹窗 */}
      <FormModal
        title="添加年级培养方案"
        open={gradePlanOpen}
        onCancel={() => setGradePlanOpen(false)}
        onSubmit={handleGradePlanOk}
        loading={confirmLoading}
      >
        <Form form={gradePlanForm} layout="vertical">
          <Form.Item
            name="versionPlanId"
            label="版本培养方案"
            rules={[{ required: true, message: "请选择版本培养方案" }]}
          >
            <Select
              placeholder="请选择版本培养方案"
              loading={versionPlanData.length === 0}
              style={{ width: "100%" }}
            >
              {versionPlanData.map(vp => (
                <Select.Option key={vp.id} value={vp.id}>
                  {vp.professionalName} - {vp.versionNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <Input placeholder="如：2024级" />
          </Form.Item>

          <Form.Item
            name="revisionNotes"
            label="修订说明"
          >
            <Input.TextArea placeholder="请输入年级特有的微调或修订说明" />
          </Form.Item>

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

      {/* 年级培养方案查看弹窗 */}
      <FormModal
        title="查看年级培养方案"
        open={gradePlanViewOpen}
        onCancel={() => setGradePlanViewOpen(false)}
        onSubmit={() => setGradePlanViewOpen(false)}
        submitText="关闭"
      >
        <div>
          <h3 style={{ marginBottom: 16 }}>{currentGradePlan?.professionalName} 年级培养方案</h3>
          <div style={{ marginBottom: 16 }}>
            <strong>版本号：</strong>{currentGradePlan?.versionPlanNumber || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>年级：</strong>{currentGradePlan?.grade || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>修订说明：</strong>{currentGradePlan?.revisionNotes || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>课程列表：</strong>
          </div>
          <Table
            columns={[
              { title: "课程名称", dataIndex: "courseName" },
              { title: "课程代码", dataIndex: "courseCode" },
              { title: "学期", dataIndex: "semester" },
              { title: "是否修订", dataIndex: "isRevised", render: (isRevised) => isRevised ? "是" : "否" },
              { title: "修订原因", dataIndex: "revisionReason" }
            ]}
            dataSource={currentGradePlan?.courses || []}
            pagination={false}
          />
        </div>
      </FormModal>

      {/* 年级培养方案编辑弹窗 */}
      <FormModal
        title="编辑年级培养方案"
        open={gradePlanEditOpen}
        onCancel={() => setGradePlanEditOpen(false)}
        onSubmit={handleGradePlanOk}
        loading={confirmLoading}
      >
        <Form form={gradePlanForm} layout="vertical">
          <Form.Item
            name="versionPlanId"
            label="版本培养方案"
            rules={[{ required: true, message: "请选择版本培养方案" }]}
          >
            <Select
              placeholder="请选择版本培养方案"
              loading={versionPlanData.length === 0}
              style={{ width: "100%" }}
            >
              {versionPlanData.map(vp => (
                <Select.Option key={vp.id} value={vp.id}>
                  {vp.professionalName} - {vp.versionNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <Input placeholder="如：2024级" />
          </Form.Item>

          <Form.Item
            name="revisionNotes"
            label="修订说明"
          >
            <Input.TextArea placeholder="请输入年级特有的微调或修订说明" />
          </Form.Item>

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

      {/* 复制培养方案弹窗 */}
      <FormModal
        title={`复制 ${currentVersionPlan?.versionNumber} 为年级培养方案`}
        open={copyOpen}
        onCancel={() => setCopyOpen(false)}
        onSubmit={handleCopyOk}
        loading={confirmLoading}
      >
        <Form form={copyForm} layout="vertical">
          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <Input placeholder="如：2024级" />
          </Form.Item>

          <Form.Item
            name="revisionNotes"
            label="修订说明"
          >
            <Input.TextArea placeholder="请输入年级特有的微调或修订说明" />
          </Form.Item>
        </Form>
      </FormModal>
    </Flex>
  );
};

export default Plan;