// src/components/FormModal.js
import { useEffect } from 'react';
import { Modal, Form, Button } from 'antd';

const FormModal = ({
  title = '标题',
  open = false,
  onCancel,
  onSubmit,
  initialValues = {},
  children,
  loading = false,
  submitText = '确定',
  cancelText = '取消',
  width = 520,
  form: customForm,
  ...modalProps
}) => {
  // 只有在没有提供 customForm 时，才创建一个新的 form 实例
  const [form] = customForm ? [customForm] : Form.useForm();
  const usedForm = customForm || form;

  // 提交
  const handleOk = async () => {
    try {
      const values = await usedForm.validateFields();
      await onSubmit(values);
    } catch (error) {
      console.log('表单验证失败或提交出错:', error);
    }
  };

  // 取消
  const handleCancel = () => {
    usedForm.resetFields();
    onCancel && onCancel(usedForm.getFieldsValue());
  };

  // 打开时回显，关闭时清空

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={submitText}
      cancelText={cancelText}
      width={width}
      {...modalProps}
    >
      <Form form={usedForm} initialValues={initialValues} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
};

export default FormModal;
