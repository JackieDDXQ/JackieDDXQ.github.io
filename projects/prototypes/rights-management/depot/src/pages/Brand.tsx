import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, Upload, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined, UploadOutlined } from '@ant-design/icons'

const { Option } = Select

interface Brand {
  id: string
  name: string
  shortName: string
  logo: string
  status: string
  createTime: string
}

const brandData: Brand[] = [
  { id: 'BR001', name: '霸王茶姬', shortName: '霸王茶姬', logo: '', status: 'active', createTime: '2026-04-23 01:38:09' },
  { id: 'BR002', name: 'e袋洗', shortName: 'e袋洗', logo: '', status: 'active', createTime: '2026-04-23 01:37:31' },
  { id: 'BR003', name: '飞蝉', shortName: '飞蝉', logo: '', status: 'active', createTime: '2026-04-22 05:22:47' },
  { id: 'BR004', name: '瑞幸咖啡', shortName: '瑞幸', logo: '', status: 'active', createTime: '2026-04-22 05:22:26' },
  { id: 'BR005', name: '美团', shortName: '美团', logo: '', status: 'inactive', createTime: '2026-04-22 05:22:00' },
]

export default function Brand() {
  const [searchParams, setSearchParams] = useState({
    brandName: '',
    brandId: '',
    status: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Brand | null>(null)
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingData(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Brand) => {
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
    { title: '品牌ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '品牌名称', dataIndex: 'name', key: 'name' },
    { title: '品牌简称', dataIndex: 'shortName', key: 'shortName' },
    { title: '品牌Logo', dataIndex: 'logo', key: 'logo', render: () => <Tag color="gray">暂无</Tag> },
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
      render: (_: unknown, record: Brand) => (
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
          <span>品牌名称</span>
          <Input placeholder="请输入品牌名称" style={{ width: 200 }} value={searchParams.brandName} onChange={(e) => setSearchParams({...searchParams, brandName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>品牌ID</span>
          <Input placeholder="请输入品牌ID" style={{ width: 200 }} value={searchParams.brandId} onChange={(e) => setSearchParams({...searchParams, brandId: e.target.value})} />
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增品牌</Button>
        <Button icon={<UploadOutlined />}>批量新增品牌</Button>
      </div>

      <Table
        columns={columns}
        dataSource={brandData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑品牌' : '新增品牌'}
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
            label="品牌名称"
            rules={[{ required: true, message: '请输入品牌名称' }]}
          >
            <Input placeholder="请输入品牌名称" />
          </Form.Item>
          <Form.Item
            name="shortName"
            label="品牌简称"
            rules={[{ required: true, message: '请输入品牌简称' }]}
          >
            <Input placeholder="请输入品牌简称" />
          </Form.Item>
          <Form.Item name="logo" label="品牌Logo">
            <Upload.Dragger>
              <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
              <p className="ant-upload-hint">支持 JPG、PNG 格式，大小不超过 2MB</p>
            </Upload.Dragger>
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
