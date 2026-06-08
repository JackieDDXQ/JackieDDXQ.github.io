import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons'

const { Option } = Select

interface Store {
  id: string
  name: string
  address: string
  contact: string
  phone: string
  status: string
  createTime: string
  brand?: string
  longitude?: string
  latitude?: string
}

const storeData: Store[] = [
  { id: 'ST001', name: '霸王茶姬旗舰店', address: '北京市朝阳区xxx', contact: '张三', phone: '13800138001', status: 'active', createTime: '2026-04-23 01:38:09' },
  { id: 'ST002', name: '霸王茶姬望京店', address: '北京市望京xxx', contact: '李四', phone: '13800138002', status: 'active', createTime: '2026-04-23 01:37:31' },
  { id: 'ST003', name: 'e袋洗总部', address: '上海市浦东新区xxx', contact: '王五', phone: '13800138003', status: 'active', createTime: '2026-04-22 05:22:47' },
  { id: 'ST004', name: '瑞幸咖啡国贸店', address: '北京市国贸xxx', contact: '赵六', phone: '13800138004', status: 'inactive', createTime: '2026-04-22 05:22:26' },
  { id: 'ST005', name: '美团总部', address: '北京市海淀区xxx', contact: '钱七', phone: '13800138005', status: 'active', createTime: '2026-04-22 05:22:00' },
]

export default function Store() {
  const [searchParams, setSearchParams] = useState({
    storeName: '',
    storeId: '',
    brand: '',
    status: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Store | null>(null)
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingData(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Store) => {
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

  const handleGetLocation = () => {
    message.info('地图搜索功能开发中')
  }

  const columns = [
    { title: '门店ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '门店名称', dataIndex: 'name', key: 'name' },
    { title: '门店地址', dataIndex: 'address', key: 'address', ellipsis: true },
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
      render: (_: unknown, record: Store) => (
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
          <span>门店名称</span>
          <Input placeholder="请输入门店名称" style={{ width: 200 }} value={searchParams.storeName} onChange={(e) => setSearchParams({...searchParams, storeName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>门店ID</span>
          <Input placeholder="请输入门店ID" style={{ width: 200 }} value={searchParams.storeId} onChange={(e) => setSearchParams({...searchParams, storeId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>所属品牌</span>
          <Select placeholder="请选择品牌" style={{ width: 150 }} value={searchParams.brand} onChange={(value) => setSearchParams({...searchParams, brand: value})}>
            <Option value="">全部</Option>
            <Option value="霸王茶姬">霸王茶姬</Option>
            <Option value="e袋洗">e袋洗</Option>
            <Option value="瑞幸咖啡">瑞幸咖啡</Option>
          </Select>
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增门店</Button>
        <Button icon={<UploadOutlined />}>导入门店</Button>
        <Button icon={<DownloadOutlined />}>导出门店</Button>
        <Button icon={<DownloadOutlined />}>下载门店模板</Button>
      </div>

      <Table
        columns={columns}
        dataSource={storeData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑门店' : '新增门店'}
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
            label="门店名称"
            rules={[{ required: true, message: '请输入门店名称' }]}
          >
            <Input placeholder="请输入门店名称" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="所属品牌"
            rules={[{ required: true, message: '请选择所属品牌' }]}
          >
            <Select placeholder="请选择所属品牌">
              <Option value="霸王茶姬">霸王茶姬</Option>
              <Option value="e袋洗">e袋洗</Option>
              <Option value="瑞幸咖啡">瑞幸咖啡</Option>
              <Option value="美团">美团</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="门店地址"
            rules={[{ required: true, message: '请输入门店地址' }]}
          >
            <Input placeholder="请输入门店地址" />
          </Form.Item>
          <Form.Item name="longitude" label="经度">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="经度" style={{ flex: 1 }} />
              <Button onClick={handleGetLocation}>点击获取经纬度</Button>
            </div>
          </Form.Item>
          <Form.Item name="latitude" label="纬度">
            <Input placeholder="纬度" />
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
