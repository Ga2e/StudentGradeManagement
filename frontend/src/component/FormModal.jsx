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
  ...modalProps
}) => {
  const [form] = Form.useForm();

  // 提交
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log('表单验证失败或提交出错:', error);
    }
  };

  // 取消
  const handleCancel = () => {
    form.resetFields();
    onCancel && onCancel(form.getFieldsValue());
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
      <Form form={form} initialValues={initialValues} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
};

export default FormModal;
