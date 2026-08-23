import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, message } from 'antd'
import { PlusOutlined, UploadOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined } from '@ant-design/icons'

const { Option } = Select

interface Product {
  id: string
  name: string
  type: string
  code: string
  officialPrice: number
  costPrice: number
  supplier: string
  createTime: string
}

const productData: Product[] = [
  { id: '2047127857108037632', name: '霸王茶姬10元满减券-中国移...', type: '直充', code: '1253770516750979073', officialPrice: 10, costPrice: 9, supplier: '霸王茶姬', createTime: '2026-04-23 01:38:09' },
  { id: '2047127699330904064', name: '霸王茶姬20元满减券-中国移...', type: '直充', code: '1253770351348760577', officialPrice: 20, costPrice: 18, supplier: '霸王茶姬', createTime: '2026-04-23 01:37:31' },
  { id: '2046822001392955392', name: 'e袋洗500元充值卡', type: '直充', code: 'CARD#108853', officialPrice: 500, costPrice: 500, supplier: 'e袋洗', createTime: '2026-04-22 05:22:47' },
  { id: '2046821911949422592', name: 'e袋洗200元充值卡', type: '直充', code: 'CARD#108852', officialPrice: 200, costPrice: 200, supplier: 'e袋洗', createTime: '2026-04-22 05:22:26' },
  { id: '204682180177639424', name: 'e袋洗100元充值卡', type: '直充', code: 'CARD#108851', officialPrice: 100, costPrice: 100, supplier: 'e袋洗', createTime: '2026-04-22 05:22:00' },
  { id: '204388776721219584', name: '霸王茶姬伯牙绝弦(大杯)饮...', type: '直充', code: '1134427031506595841', officialPrice: 20, costPrice: 17.6, supplier: '霸王茶姬', createTime: '2026-04-14 03:03:14' },
  { id: '2042169455965581312', name: '霸王茶姬10元满减券-中国移...', type: '直充', code: '1226619533994565632', officialPrice: 10, costPrice: 9, supplier: '霸王茶姬', createTime: '2026-04-09 09:15:14' },
  { id: '2042081731308892160', name: '霸王茶姬9.9元满减券-中国...', type: '直充', code: '1248707402842046464', officialPrice: 9.9, costPrice: 8.91, supplier: '霸王茶姬', createTime: '2026-04-09 03:26:39' },
  { id: '2041808596982509571', name: '美团单车周卡', type: '直充', code: '10000704', officialPrice: 15, costPrice: 9, supplier: '飞蝉', createTime: '2026-04-08 09:21:19' },
  { id: '204180859682509570', name: '滴滴5元快车代金券', type: '直充', code: '31054', officialPrice: 5, costPrice: 4.65, supplier: '飞蝉', createTime: '2026-04-08 09:21:19' },
]

const supplierList = [
  { id: 'SUP001', name: '霸王茶姬', contact: '张三', phone: '13800138001' },
  { id: 'SUP002', name: 'e袋洗', contact: '李四', phone: '13800138002' },
  { id: 'SUP003', name: '飞蝉', contact: '王五', phone: '13800138003' },
]

export default function Product() {
  const [searchParams, setSearchParams] = useState({
    productId: '',
    productName: '',
    productType: '',
    productCode: '',
    supplier: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [supplierModalVisible, setSupplierModalVisible] = useState(false)
  const [editingData, setEditingData] = useState<Product | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingData(null)
    setSelectedSupplier('')
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Product) => {
    setEditingData(record)
    setSelectedSupplier(record.supplier)
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

  const handleSelectSupplier = () => {
    setSupplierModalVisible(true)
  }

  const handleConfirmSupplier = (supplierName: string) => {
    setSelectedSupplier(supplierName)
    form.setFieldsValue({ supplier: supplierName })
    setSupplierModalVisible(false)
  }

  const columns = [
    { title: '产品ID', dataIndex: 'id', key: 'id', width: 200 },
    { title: '产品名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { 
      title: '产品类型', 
      dataIndex: 'type', 
      key: 'type', 
      render: (type: string) => <Tag color="green">{type}</Tag> 
    },
    { title: '产品编码', dataIndex: 'code', key: 'code', width: 180 },
    { title: '官方价(元)', dataIndex: 'officialPrice', key: 'officialPrice', align: 'right' as const },
    { title: '成本价(元)', dataIndex: 'costPrice', key: 'costPrice', align: 'right' as const },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
    { 
      title: '操作', 
      key: 'action', 
      render: (_: unknown, record: Product) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const supplierColumns = [
    { title: '供应商ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '供应商名称', dataIndex: 'name', key: 'name' },
    { title: '联系人', dataIndex: 'contact', key: 'contact' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { 
      title: '操作', 
      key: 'action', 
      render: (_: unknown, record: { id: string; name: string }) => (
        <Button type="link" onClick={() => handleConfirmSupplier(record.name)}>选择</Button>
      ),
    },
  ]

  return (
    <Card>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>产品ID</span>
          <Input placeholder="请输入产品ID" style={{ width: 200 }} value={searchParams.productId} onChange={(e) => setSearchParams({...searchParams, productId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>产品名称</span>
          <Input placeholder="请输入产品名称" style={{ width: 200 }} value={searchParams.productName} onChange={(e) => setSearchParams({...searchParams, productName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>产品类型</span>
          <Select placeholder="请选择产品类型" style={{ width: 150 }} value={searchParams.productType} onChange={(value) => setSearchParams({...searchParams, productType: value})}>
            <Option value="">全部</Option>
            <Option value="直充">直充</Option>
            <Option value="券码">券码</Option>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>产品编码</span>
          <Input placeholder="请输入产品编码" style={{ width: 200 }} value={searchParams.productCode} onChange={(e) => setSearchParams({...searchParams, productCode: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>供应商</span>
          <Select placeholder="请选择供应商" style={{ width: 150 }} value={searchParams.supplier} onChange={(value) => setSearchParams({...searchParams, supplier: value})}>
            <Option value="">全部</Option>
            <Option value="霸王茶姬">霸王茶姬</Option>
            <Option value="e袋洗">e袋洗</Option>
            <Option value="飞蝉">飞蝉</Option>
          </Select>
        </div>
        <Button type="primary" icon={<SearchOutlined />}>查询</Button>
        <Button icon={<RestOutlined />}>重置</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新建</Button>
        <Button icon={<DownloadOutlined />}>下载产品导入模板</Button>
        <Button icon={<DownloadOutlined />}>下载券码导入模板</Button>
        <Button icon={<UploadOutlined />}>导入</Button>
      </div>

      <Table
        columns={columns}
        dataSource={productData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑产品' : '新增产品'}
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
            label="产品名称"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="产品类型"
            rules={[{ required: true, message: '请选择产品类型' }]}
          >
            <Select placeholder="请选择产品类型">
              <Option value="直充">直充</Option>
              <Option value="券码">券码</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="code"
            label="产品编码"
            rules={[{ required: true, message: '请输入产品编码' }]}
          >
            <Input placeholder="请输入产品编码" />
          </Form.Item>
          <Form.Item
            name="officialPrice"
            label="官方价(元)"
            rules={[{ required: true, message: '请输入官方价' }]}
          >
            <Input type="number" placeholder="请输入官方价" />
          </Form.Item>
          <Form.Item
            name="costPrice"
            label="成本价(元)"
            rules={[{ required: true, message: '请输入成本价' }]}
          >
            <Input type="number" placeholder="请输入成本价" />
          </Form.Item>
          <Form.Item
            name="supplier"
            label="供应商"
            rules={[{ required: true, message: '请选择供应商' }]}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <Input 
                placeholder="请选择供应商" 
                style={{ flex: 1 }} 
                value={selectedSupplier}
                disabled
              />
              <Button onClick={handleSelectSupplier}>选择供应商</Button>
            </div>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
          <Button onClick={() => setModalVisible(false)}>取消</Button>
          <Button type="primary" onClick={handleSave}>保存</Button>
        </div>
      </Modal>

      <Modal
        title="选择供应商"
        visible={supplierModalVisible}
        footer={null}
        onCancel={() => setSupplierModalVisible(false)}
        width={700}
      >
        <Table
          columns={supplierColumns}
          dataSource={supplierList}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          rowKey="id"
        />
      </Modal>
    </Card>
  )
}
