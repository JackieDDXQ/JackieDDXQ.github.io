import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Tree, Modal, Form, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined } from '@ant-design/icons'

const { Option } = Select

interface Category {
  id: string
  name: string
  parentId: string
  sort: number
  status: string
  createTime: string
}

const categoryData: Category[] = [
  { id: 'CAT001', name: '餐饮美食', parentId: '', sort: 1, status: 'active', createTime: '2026-04-23 01:38:09' },
  { id: 'CAT002', name: '饮品', parentId: 'CAT001', sort: 1, status: 'active', createTime: '2026-04-23 01:37:31' },
  { id: 'CAT003', name: '咖啡', parentId: 'CAT002', sort: 1, status: 'active', createTime: '2026-04-22 05:22:47' },
  { id: 'CAT004', name: '茶饮', parentId: 'CAT002', sort: 2, status: 'active', createTime: '2026-04-22 05:22:26' },
  { id: 'CAT005', name: '生活服务', parentId: '', sort: 2, status: 'active', createTime: '2026-04-22 05:22:00' },
  { id: 'CAT006', name: '家政服务', parentId: 'CAT005', sort: 1, status: 'inactive', createTime: '2026-04-22 05:21:00' },
]

const treeData = [
  {
    title: '餐饮美食',
    key: 'CAT001',
    children: [
      {
        title: '饮品',
        key: 'CAT002',
        children: [
          { title: '咖啡', key: 'CAT003' },
          { title: '茶饮', key: 'CAT004' },
        ],
      },
    ],
  },
  {
    title: '生活服务',
    key: 'CAT005',
    children: [
      { title: '家政服务', key: 'CAT006' },
    ],
  },
]

export default function Category() {
  const [searchParams, setSearchParams] = useState({
    categoryName: '',
    categoryId: '',
    status: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Category | null>(null)
  const [form] = Form.useForm()

  const parentOptions = [
    { value: '', label: '无(一级分类)' },
    { value: 'CAT001', label: '餐饮美食' },
    { value: 'CAT002', label: '饮品' },
    { value: 'CAT005', label: '生活服务' },
  ]

  const handleAdd = () => {
    setEditingData(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Category) => {
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
    { title: '分类ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '分类名称', dataIndex: 'name', key: 'name' },
    { title: '上级分类', dataIndex: 'parentId', key: 'parentId', render: (parentId: string) => parentId || <Tag color="gray">无</Tag> },
    { title: '排序', dataIndex: 'sort', key: 'sort', width: 80 },
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
      render: (_: unknown, record: Category) => (
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
          <span>分类名称</span>
          <Input placeholder="请输入分类名称" style={{ width: 200 }} value={searchParams.categoryName} onChange={(e) => setSearchParams({...searchParams, categoryName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>分类ID</span>
          <Input placeholder="请输入分类ID" style={{ width: 200 }} value={searchParams.categoryId} onChange={(e) => setSearchParams({...searchParams, categoryId: e.target.value})} />
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增分类</Button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 250, border: '1px solid #e8e8e8', borderRadius: 4, padding: 16 }}>
          <h4 style={{ marginBottom: 16 }}>分类树</h4>
          <Tree
            treeData={treeData}
            defaultExpandAll
            style={{ maxHeight: 400, overflowY: 'auto' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Table
            columns={columns}
            dataSource={categoryData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
            }}
            rowKey="id"
          />
        </div>
      </div>

      <Modal
        title={editingData ? '编辑分类' : '新增分类'}
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
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item name="parentId" label="上级分类">
            <Select placeholder="请选择上级分类">
              {parentOptions.map((option) => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序' }]}
          >
            <Input type="number" placeholder="请输入排序" />
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
