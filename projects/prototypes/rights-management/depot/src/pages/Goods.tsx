import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, Tabs, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined } from '@ant-design/icons'

const { Option } = Select
const { TabPane } = Tabs

interface Goods {
  id: string
  name: string
  brand: string
  type: string
  status: string
  settlement: string
  createTime: string
  category?: string
  specName?: string
  price?: number
}

const goodsData: Goods[] = [
  { id: '2041813436043309056', name: '青桔单车骑行会员', brand: '青桔', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:40:32' },
  { id: '2041812839583920128', name: '美团单车会员', brand: '美团', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:38:10' },
  { id: '2041812626811072512', name: '滴滴快车代金券', brand: '滴滴', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:37:19' },
  { id: '2041812626811072512', name: '滴滴快车代金券', brand: '滴滴', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:37:19' },
  { id: '2041812158190161692', name: '库迪咖啡代金券', brand: '库迪咖啡', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:35:18' },
  { id: '2041811926102257664', name: '瑞幸咖啡代金券', brand: '瑞幸咖啡', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:34:32' },
  { id: '2041811728848334848', name: '奈雪的茶代金券', brand: '奈雪的茶', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 09:33:45' },
  { id: '2041757939776827392', name: '爱奇艺黄金会员', brand: '爱奇艺', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 06:00:01' },
  { id: '2041757712281972736', name: '腾讯视频会员', brand: '腾讯视频', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 05:59:07' },
  { id: '2041757499416850432', name: '芒果PC黄金会员', brand: '芒果TV', type: '直充', status: '上架', settlement: '支付结算', createTime: '2026-04-08 05:58:16' },
]

export default function Goods() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchParams, setSearchParams] = useState({
    goodsName: '',
    goodsId: '',
    goodsType: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [formVisibleTab, setFormVisibleTab] = useState('basic')
  const [editingData, setEditingData] = useState<Goods | null>(null)
  const [form] = Form.useForm()

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'selling', label: '出售中' },
    { key: 'offline', label: '下架' },
  ]

  const handleAdd = () => {
    setEditingData(null)
    setFormVisibleTab('basic')
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Goods) => {
    setEditingData(record)
    setFormVisibleTab('basic')
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
      setFormVisibleTab('spec')
    }).catch(() => {})
  }

  const columns = [
    { title: '商品ID', dataIndex: 'id', key: 'id', width: 200 },
    { title: '商品名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '品牌名称', dataIndex: 'brand', key: 'brand' },
    { 
      title: '商品类型', 
      dataIndex: 'type', 
      key: 'type', 
      render: (type: string) => <Tag color="green">{type}</Tag> 
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => <Tag color={status === '上架' ? 'green' : 'gray'}>{status}</Tag> 
    },
    { title: '结算方式', dataIndex: 'settlement', key: 'settlement' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
    { 
      title: '操作', 
      key: 'action', 
      render: (_: unknown, record: Goods) => (
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
          <span>商品名称</span>
          <Input placeholder="请输入商品名称" style={{ width: 200 }} value={searchParams.goodsName} onChange={(e) => setSearchParams({...searchParams, goodsName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>商品ID</span>
          <Input placeholder="请输入商品ID" style={{ width: 200 }} value={searchParams.goodsId} onChange={(e) => setSearchParams({...searchParams, goodsId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>商品类型</span>
          <Select placeholder="请选择商品类型" style={{ width: 150 }} value={searchParams.goodsType} onChange={(value) => setSearchParams({...searchParams, goodsType: value})}>
            <Option value="">全部</Option>
            <Option value="直充">直充</Option>
            <Option value="券码">券码</Option>
          </Select>
        </div>
        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
        <Button icon={<RestOutlined />}>重置</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新建</Button>
        <div style={{ display: 'flex', marginLeft: 'auto', gap: 8 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 20px',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                background: activeTab === tab.key ? '#f0f0f0' : 'transparent',
                fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={goodsData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
      />

      <Modal
        title={editingData ? '编辑商品' : '新增商品'}
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        width={600}
      >
        <Tabs activeKey={formVisibleTab} onChange={setFormVisibleTab}>
          <TabPane tab="基本信息" key="basic">
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="商品名称"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>
              <Form.Item
                name="brand"
                label="品牌"
                rules={[{ required: true, message: '请选择品牌' }]}
              >
                <Select placeholder="请选择品牌">
                  <Option value="青桔">青桔</Option>
                  <Option value="美团">美团</Option>
                  <Option value="滴滴">滴滴</Option>
                  <Option value="爱奇艺">爱奇艺</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Option value="餐饮美食">餐饮美食</Option>
                  <Option value="生活服务">生活服务</Option>
                  <Option value="影音娱乐">影音娱乐</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                label="商品类型"
                rules={[{ required: true, message: '请选择商品类型' }]}
              >
                <Select placeholder="请选择商品类型">
                  <Option value="直充">直充</Option>
                  <Option value="券码">券码</Option>
                </Select>
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button onClick={() => setModalVisible(false)}>返回列表</Button>
              <Button onClick={handleSave}>保存</Button>
              <Button type="primary" onClick={handleSaveNext}>保存并下一步</Button>
            </div>
          </TabPane>
          <TabPane tab="规格信息" key="spec">
            <Form form={form} layout="vertical">
              <Form.Item
                name="specName"
                label="规格名称"
                rules={[{ required: true, message: '请输入规格名称' }]}
              >
                <Input placeholder="请输入规格名称" />
              </Form.Item>
              <Form.Item
                name="price"
                label="售价(元)"
                rules={[{ required: true, message: '请输入售价' }]}
              >
                <Input type="number" placeholder="请输入售价" />
              </Form.Item>
              <Form.Item name="settlement" label="结算方式">
                <Select placeholder="请选择结算方式">
                  <Option value="支付结算">支付结算</Option>
                  <Option value="账期结算">账期结算</Option>
                </Select>
              </Form.Item>
            </Form>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button onClick={() => setFormVisibleTab('basic')}>上一步</Button>
              <Button onClick={() => setModalVisible(false)}>返回列表</Button>
              <Button type="primary" onClick={handleSave}>保存</Button>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </Card>
  )
}
