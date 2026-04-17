import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Select, message, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../service/axios';

const { Option } = Select;

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取学期列表
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get('/term');
        if (response.data.code === 200) {
          setTerms(response.data.data);
          if (response.data.data.length > 0) {
            setCurrentTerm(response.data.data[0].id);
          }
        }
      } catch (error) {
        message.error('获取学期列表失败');
      }
    };
    fetchTerms();
  }, []);

  // 获取可选课程列表
  useEffect(() => {
    if (currentTerm) {
      fetchCourses();
      fetchSelectedCourses();
    }
  }, [currentTerm]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/course');
      if (response.data.code === 200) {
        setCourses(response.data.data);
      }
    } catch (error) {
      message.error('获取课程列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/elective-course/term/${currentTerm}`);
      if (response.data.code === 200) {
        setSelectedCourses(response.data.data);
      }
    } catch (error) {
      message.error('获取已选课程失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = async (courseId) => {
    try {
      const response = await axios.post('/elective-course', {
        courseId,
        termId: currentTerm
      });
      if (response.data.code === 200) {
        message.success('选课成功');
        fetchSelectedCourses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('选课失败');
    }
  };

  const handleDropCourse = async (id) => {
    try {
      const response = await axios.delete(`/elective-course/${id}`);
      if (response.data.code === 200) {
        message.success('退课成功');
        fetchSelectedCourses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('退课失败');
    }
  };

  const columns = [
    {
      title: '课程代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学分',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: '学时',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => handleSelectCourse(record.id)}
        >
          选课
        </Button>
      ),
    },
  ];

  const selectedColumns = [
    {
      title: '课程代码',
      dataIndex: 'course.code',
      key: 'code',
    },
    {
      title: '课程名称',
      dataIndex: 'course.name',
      key: 'name',
    },
    {
      title: '学分',
      dataIndex: 'course.credits',
      key: 'credits',
    },
    {
      title: '学时',
      dataIndex: 'course.hours',
      key: 'hours',
    },
    {
      title: '选课时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleDropCourse(record.id)}
        >
          退课
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>选课管理</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>选择学期：</label>
        <Select 
          style={{ width: 200 }} 
          value={currentTerm} 
          onChange={setCurrentTerm}
        >
          {terms.map(term => (
            <Option key={term.id} value={term.id}>{term.name}</Option>
          ))}
        </Select>
      </div>

      <Card title="可选课程" style={{ marginBottom: '20px' }}>
        <Table 
          columns={columns} 
          dataSource={courses} 
          rowKey="id" 
          loading={loading}
        />
      </Card>

      <Card title="已选课程" style={{ marginBottom: '20px' }}>
        <Table 
          columns={selectedColumns} 
          dataSource={selectedCourses} 
          rowKey="id" 
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default CourseSelection;
