import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, Tabs, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined, DownloadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TabPane } = Tabs

interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  status: string
  createTime: string
  bankName?: string
  bankAccount?: string
  bankCode?: string
}

const supplierData: Supplier[] = [
  { id: 'SUP001', name: '霸王茶姬', contact: '张三', phone: '13800138001', status: 'active', createTime: '2026-04-23 01:38:09' },
  { id: 'SUP002', name: 'e袋洗', contact: '李四', phone: '13800138002', status: 'active', createTime: '2026-04-23 01:37:31' },
  { id: 'SUP003', name: '飞蝉', contact: '王五', phone: '13800138003', status: 'active', createTime: '2026-04-22 05:22:47' },
  { id: 'SUP004', name: '瑞幸咖啡', contact: '赵六', phone: '13800138004', status: 'inactive', createTime: '2026-04-22 05:22:26' },
  { id: 'SUP005', name: '美团', contact: '钱七', phone: '13800138005', status: 'active', createTime: '2026-04-22 05:22:00' },
]

export default function Supplier() {
  const [searchParams, setSearchParams] = useState({
    supplierId: '',
    supplierName: '',
    contact: '',
    status: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Supplier | null>(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingData(null)
    setActiveTab('basic')
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Supplier) => {
    setEditingData(record)
    setActiveTab('basic')
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

  const handleSaveNext = () => {
    form.validateFields().then(() => {
      message.success('基本信息保存成功')
      setActiveTab('settlement')
    }).catch(() => {})
  }

  const columns = [
    { title: '供应商ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '供应商名称', dataIndex: 'name', key: 'name' },
    { title: '联系人', dataIndex: 'contact', key: 'contact' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
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
      render: (_: unknown, record: Supplier) => (
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
          <span>供应商ID</span>
          <Input placeholder="请输入供应商ID" style={{ width: 200 }} value={searchParams.supplierId} onChange={(e) => setSearchParams({...searchParams, supplierId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>供应商名称</span>
          <Input placeholder="请输入供应商名称" style={{ width: 200 }} value={searchParams.supplierName} onChange={(e) => setSearchParams({...searchParams, supplierName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>联系人</span>
          <Input placeholder="请输入联系人" style={{ width: 200 }} value={searchParams.contact} onChange={(e) => setSearchParams({...searchParams, contact: e.target.value})} />
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增供应商</Button>
        <Button icon={<DownloadOutlined />}>导出供应商</Button>
      </div>

      <Table
        columns={columns}
        dataSource={supplierData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑供应商' : '新增供应商'}
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        width={600}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="基本信息" key="basic">
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="供应商名称"
                rules={[{ required: true, message: '请输入供应商名称' }]}
              >
                <Input placeholder="请输入供应商名称" />
              </Form.Item>
              <Form.Item
                name="contact"
                label="联系人"
                rules={[{ required: true, message: '请输入联系人' }]}
              >
                <Input placeholder="请输入联系人" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
              <Form.Item
                name="status"
                label="状态"
              >
                <Select placeholder="请选择状态">
                  <Option value="active">启用</Option>
                  <Option value="inactive">禁用</Option>
                </Select>
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button onClick={handleSave}>保存</Button>
              <Button type="primary" onClick={handleSaveNext}>保存并下一步</Button>
            </div>
          </TabPane>
          <TabPane tab="结算信息" key="settlement">
            <Form form={form} layout="vertical">
              <Form.Item
                name="bankName"
                label="开户行"
                rules={[{ required: true, message: '请输入开户行' }]}
              >
                <Input placeholder="请输入开户行" />
              </Form.Item>
              <Form.Item
                name="bankAccount"
                label="银行账号"
                rules={[{ required: true, message: '请输入银行账号' }]}
              >
                <Input placeholder="请输入银行账号" />
              </Form.Item>
              <Form.Item
                name="bankCode"
                label="开户行联行号"
                rules={[{ required: true, message: '请输入开户行联行号' }]}
              >
                <Input placeholder="请输入开户行联行号" />
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button onClick={() => setActiveTab('basic')}>上一步</Button>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" onClick={handleSave}>保存</Button>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </Card>
  )
}
