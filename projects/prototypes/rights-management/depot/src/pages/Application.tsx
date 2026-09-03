import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined } from '@ant-design/icons'

const { Option } = Select

interface Application {
  id: string
  name: string
  appKey: string
  status: string
  createTime: string
}

const applicationData: Application[] = [
  { id: 'APP001', name: '微信小程序', appKey: 'wx1234567890', status: 'active', createTime: '2026-04-23 01:38:09' },
  { id: 'APP002', name: '支付宝小程序', appKey: 'alipay1234567890', status: 'active', createTime: '2026-04-23 01:37:31' },
  { id: 'APP003', name: 'H5商城', appKey: 'h51234567890', status: 'active', createTime: '2026-04-22 05:22:47' },
  { id: 'APP004', name: '移动端App', appKey: 'app1234567890', status: 'inactive', createTime: '2026-04-22 05:22:26' },
  { id: 'APP005', name: 'PC官网', appKey: 'pc1234567890', status: 'active', createTime: '2026-04-22 05:22:00' },
]

export default function Application() {
  const [searchParams, setSearchParams] = useState({
    appName: '',
    appKey: '',
    status: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Application | null>(null)
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingData(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Application) => {
    setEditingData(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = (_id: string) => {
    message.success('删除成功')
  }

  const handleSave = () => {
    form.validateFields().then(() => {
      message.success(editingData ? '编辑成功' : '创建成功')
      setModalVisible(false)
      form.resetFields()
    }).catch(() => {})
  }

  const columns = [
    { title: '应用ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '应用名称', dataIndex: 'name', key: 'name' },
    { title: '应用Key', dataIndex: 'appKey', key: 'appKey', width: 180 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => <Tag color={status === 'active' ? 'green' : 'gray'}>{status === 'active' ? '启用' : '禁用'}</Tag> 
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
    { 
      title: '操作', 
      key: 'action', 
      render: (_: unknown, record: Application) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>应用名称</span>
          <Input placeholder="请输入应用名称" style={{ width: 200 }} value={searchParams.appName} onChange={(e) => setSearchParams({...searchParams, appName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>应用Key</span>
          <Input placeholder="请输入应用Key" style={{ width: 200 }} value={searchParams.appKey} onChange={(e) => setSearchParams({...searchParams, appKey: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>状态</span>
          <Select placeholder="请选择状态" style={{ width: 150 }} value={searchParams.status} onChange={(value) => setSearchParams({...searchParams, status: value})}>
            <Option value="">全部</Option>
            <Option value="active">启用</Option>
            <Option value="inactive">禁用</Option>
          </Select>
        </div>
        <Button type="primary" icon={<SearchOutlined />}>查询</Button>
        <Button icon={<RestOutlined />}>重置</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增应用</Button>
      </div>

      <Table
        columns={columns}
        dataSource={applicationData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑应用' : '新增应用'}
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="应用名称"
            rules={[{ required: true, message: '请输入应用名称' }]}
          >
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item
            name="appKey"
            label="应用Key"
            rules={[{ required: true, message: '请输入应用Key' }]}
          >
            <Input placeholder="请输入应用Key" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          <Button onClick={() => setModalVisible(false)}>取消</Button>
          <Button type="primary" onClick={handleSave}>保存</Button>
        </div>
      </Modal>
    </Card>
  )
}
