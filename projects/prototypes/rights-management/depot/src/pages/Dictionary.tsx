import { useState } from 'react'
import { Card, Button, Table, Space, Popconfirm, Modal, Form, Input, InputNumber } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface DictType {
  id: string
  name: string
  type: string
}

interface DictData {
  id: string
  type: string
  sort: number
  key: string
  value: string
}

const dictTypeData: DictType[] = [
  { id: '1', name: '处理状态', type: 'dispose_status' },
  { id: '2', name: '核销状态', type: 'verify_status' },
  { id: '3', name: '订单状态', type: 'order_status' },
  { id: '4', name: '结算方式', type: 'settlement_type' },
  { id: '5', name: '系统开关', type: 'sys_normal_disable' },
  { id: '6', name: '供应商性质', type: 'supplier_quality' },
  { id: '7', name: '供应商类型', type: 'supplier_type' },
  { id: '8', name: '充值账号', type: 'recharge_type' },
  { id: '9', name: '门店性质', type: 'store_type' },
  { id: '10', name: '商品类型', type: 'commodity_type' },
  { id: '11', name: '商品状态', type: 'commodity_status' },
]

const dictDataList: Record<string, DictData[]> = {
  'sys_normal_disable': [
    { id: '1', type: 'sys_normal_disable', sort: 0, key: '0', value: '启用' },
    { id: '2', type: 'sys_normal_disable', sort: 1, key: '1', value: '禁用' },
  ],
}

export default function Dictionary() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [typeModalVisible, setTypeModalVisible] = useState(false)
  const [dataModalVisible, setDataModalVisible] = useState(false)
  const [editingType, setEditingType] = useState<DictType | null>(null)
  const [editingData, setEditingData] = useState<DictData | null>(null)
  const [typeForm] = Form.useForm()
  const [dataForm] = Form.useForm()

  const currentDictData = selectedType ? dictDataList[selectedType] || [] : []

  const handleTypeEdit = (record: DictType) => {
    setEditingType(record)
    typeForm.setFieldsValue(record)
    setTypeModalVisible(true)
  }

  const handleTypeDelete = (id: string) => {
    console.log('Delete type:', id)
  }

  const handleTypeSave = () => {
    typeForm.validateFields().then(() => {
      setTypeModalVisible(false)
      typeForm.resetFields()
    }).catch(() => {})
  }

  const handleDataAdd = () => {
    setEditingData(null)
    dataForm.resetFields()
    setDataModalVisible(true)
  }

  const handleDataEdit = (record: DictData) => {
    setEditingData(record)
    dataForm.setFieldsValue(record)
    setDataModalVisible(true)
  }

  const handleDataDelete = (id: string) => {
    console.log('Delete data:', id)
  }

  const handleDataSave = () => {
    dataForm.validateFields().then(() => {
      setDataModalVisible(false)
      dataForm.resetFields()
    }).catch(() => {})
  }

  const handleViewDict = (type: string) => {
    setSelectedType(type)
  }

  const typeColumns = [
    { title: '字典名称', dataIndex: 'name', key: 'name', width: 130 },
    { title: '字典类型', dataIndex: 'type', key: 'type', width: 130 },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_: unknown, record: DictType) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => handleViewDict(record.type)}>查看</Button>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleTypeEdit(record)} />
          <Popconfirm title="确定删除？" onConfirm={() => handleTypeDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const dataColumns = [
    { title: '字典类型', dataIndex: 'type', key: 'type', width: 150 },
    { title: '排序', dataIndex: 'sort', key: 'sort', align: 'left' as const, width: 80 },
    { title: '字典键值', dataIndex: 'key', key: 'key', width: 120 },
    { title: '字典标签', dataIndex: 'value', key: 'value', width: 120 },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_: unknown, record: DictData) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleDataEdit(record)} />
          <Popconfirm title="确定删除？" onConfirm={() => handleDataDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ overflowX: 'auto', paddingTop: 20 }}>
      <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 200px)', minWidth: '100%' }}>
        <Card title="字典类型" style={{ width: 420, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>新增字典类型</Button>
          </div>
          <Table
            dataSource={dictTypeData}
            columns={typeColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
            size="small"
          />
        </Card>

        <Card title="字典数据" style={{ flex: 1, minWidth: 500 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleDataAdd}>新增字典</Button>
          </div>
          <Table
          dataSource={currentDictData}
          columns={dataColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          size="small"
          locale={{ emptyText: selectedType ? '暂无数据' : '请先选择字典类型' }}
        />
      </Card>
      </div>

      <Modal
        title={editingType ? '编辑字典类型' : '新增字典类型'}
        visible={typeModalVisible}
        footer={null}
        onCancel={() => setTypeModalVisible(false)}
      >
        <Form form={typeForm} layout="vertical">
          <Form.Item
            name="name"
            label="字典名称"
            rules={[{ required: true, message: '请输入字典名称' }]}
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="字典类型"
            rules={[{ required: true, message: '请输入字典类型' }]}
          >
            <Input placeholder="请输入字典类型" />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          <Button onClick={() => setTypeModalVisible(false)}>取消</Button>
          <Button type="primary" onClick={handleTypeSave}>保存</Button>
        </div>
      </Modal>

      <Modal
        title={editingData ? '编辑字典数据' : '新增字典数据'}
        visible={dataModalVisible}
        footer={null}
        onCancel={() => setDataModalVisible(false)}
      >
        <Form form={dataForm} layout="vertical">
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序' }]}
          >
            <InputNumber placeholder="请输入排序" />
          </Form.Item>
          <Form.Item
            name="key"
            label="字典键值"
            rules={[{ required: true, message: '请输入字典键值' }]}
          >
            <Input placeholder="请输入字典键值" />
          </Form.Item>
          <Form.Item
            name="value"
            label="字典标签"
            rules={[{ required: true, message: '请输入字典标签' }]}
          >
            <Input placeholder="请输入字典标签" />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          <Button onClick={() => setDataModalVisible(false)}>取消</Button>
          <Button type="primary" onClick={handleDataSave}>保存</Button>
        </div>
      </Modal>
    </div>
  )
}