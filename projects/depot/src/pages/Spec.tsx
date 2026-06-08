import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, Space, Popconfirm, Modal, Form, Tabs, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, RestOutlined } from '@ant-design/icons'

const { Option } = Select
const { TabPane } = Tabs

interface Spec {
  id: string
  name: string
  goodsId: string
  goodsName: string
  type: string
  rechargeType: string
  officialPrice: number
  defaultPrice: number
  costPrice: number
}

const directData: Spec[] = [
  { id: '2051866319099940864', name: '霸王茶姬10元代金券(飞蝉)', goodsId: '120676439338381312', goodsName: '霸王茶姬满减券', type: '直充', rechargeType: '手机号', officialPrice: 10, defaultPrice: 9.7, costPrice: 9.7 },
  { id: '2049737462033043456', name: '微信代金券-24客满0.2减0.1', goodsId: '2049736838562336768', goodsName: '微信代金券-觉观', type: '直充', rechargeType: '微信OpenId', officialPrice: 0.1, defaultPrice: 0.1, costPrice: 0.1 },
  { id: '2049737322811510784', name: '微信代金券-美宜佳满0.2减0.1', goodsId: '2049736838562336768', goodsName: '微信代金券-觉观', type: '直充', rechargeType: '微信OpenId', officialPrice: 0.1, defaultPrice: 0.1, costPrice: 0.1 },
  { id: '2049737064509493248', name: '微信代金券-觉观满0.2减0.1', goodsId: '2049736838562336768', goodsName: '微信代金券-觉观', type: '直充', rechargeType: '微信OpenId', officialPrice: 0.1, defaultPrice: 0.1, costPrice: 0.1 },
  { id: '2049366953196740608', name: 'e袋洗500元充值卡(亿奇达)', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 500, defaultPrice: 340, costPrice: 300 },
  { id: '204936671263628992', name: 'e袋洗200元充值卡(亿奇达)', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 200, defaultPrice: 134, costPrice: 120 },
  { id: '2049366241033281536', name: 'e袋洗100元充值卡(亿奇达)', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 100, defaultPrice: 67, costPrice: 60 },
  { id: '204682250533486688', name: 'e袋洗500元充值卡', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 500, defaultPrice: 500, costPrice: 500 },
  { id: '2046822392163676160', name: 'e袋洗200元充值卡', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 200, defaultPrice: 200, costPrice: 200 },
  { id: '2046822235674193920', name: 'e袋洗100元充值卡', goodsId: '196035224016691200', goodsName: 'e袋洗充值卡', type: '直充', rechargeType: '手机号', officialPrice: 100, defaultPrice: 100, costPrice: 100 },
]

const couponData: Spec[] = [
  { id: '12853365842488832', name: '[广西麦当劳]满28省8V粉+草莓新地+小薯条', goodsId: '', goodsName: '广西麦当劳V粉+草莓新地+小薯条', type: '券码', rechargeType: '暂无', officialPrice: 38, defaultPrice: 21.5, costPrice: 19.9 },
  { id: '12853341381090048', name: '[广西麦当劳]麦辣鸡腿堡+中可乐', goodsId: '', goodsName: '麦辣鸡腿堡+中可乐', type: '券码', rechargeType: '暂无', officialPrice: 24.5, defaultPrice: 15, costPrice: 13.9 },
  { id: '12853318483808948', name: '[广西麦当劳]麦辣鸡腿堡+中可乐+薯条(凉)', goodsId: '', goodsName: '麦辣鸡腿堡+中可乐+薯条凉', type: '券码', rechargeType: '暂无', officialPrice: 42, defaultPrice: 19.6, costPrice: 18.9 },
  { id: '12708359545569628', name: '测试-麦当劳券', goodsId: '', goodsName: '测试-麦当劳券', type: '券码', rechargeType: '暂无', officialPrice: 0, defaultPrice: 0, costPrice: 0 },
]

export default function Spec() {
  const [activeTab, setActiveTab] = useState('direct')
  const [searchParams, setSearchParams] = useState({
    specName: '',
    specId: '',
    goodsId: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [formVisibleTab, setFormVisibleTab] = useState('basic')
  const [editingData, setEditingData] = useState<Spec | null>(null)
  const [form] = Form.useForm()

  const currentData = activeTab === 'direct' ? directData : couponData

  const handleAdd = () => {
    setEditingData(null)
    setFormVisibleTab('basic')
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Spec) => {
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
      setFormVisibleTab('product')
    }).catch(() => {})
  }

  const columns = [
    { title: '规格ID', dataIndex: 'id', key: 'id', width: 140, ellipsis: true },
    { title: '规格名称', dataIndex: 'name', key: 'name', width: 160, ellipsis: true },
    { title: '商品ID', dataIndex: 'goodsId', key: 'goodsId', width: 140, ellipsis: true },
    { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', width: 140, ellipsis: true },
    { 
      title: '类型', 
      dataIndex: 'type', 
      key: 'type', 
      width: 70,
      render: (type: string) => <Tag color={type === '直充' ? 'green' : 'blue'}>{type}</Tag> 
    },
    { title: '充值类型', dataIndex: 'rechargeType', key: 'rechargeType', width: 90 },
    { title: '官方价', dataIndex: 'officialPrice', key: 'officialPrice', width: 70, align: 'right' as const },
    { title: '分销价', dataIndex: 'defaultPrice', key: 'defaultPrice', width: 70, align: 'right' as const },
    { title: '成本价', dataIndex: 'costPrice', key: 'costPrice', width: 70, align: 'right' as const },
    { 
      title: '操作', 
      key: 'action', 
      width: 120,
      render: (_: unknown, record: Spec) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>规格名称</span>
          <Input placeholder="请输入规格名称" style={{ width: 180 }} value={searchParams.specName} onChange={(e) => setSearchParams({...searchParams, specName: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>规格ID</span>
          <Input placeholder="请输入规格ID" style={{ width: 180 }} value={searchParams.specId} onChange={(e) => setSearchParams({...searchParams, specId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>商品ID</span>
          <Input placeholder="请输入商品ID" style={{ width: 180 }} value={searchParams.goodsId} onChange={(e) => setSearchParams({...searchParams, goodsId: e.target.value})} />
        </div>
        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
        <Button icon={<RestOutlined />}>重置</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新建</Button>
        <div style={{ display: 'flex', marginLeft: 'auto', gap: 8 }}>
          <button
            key="direct"
            onClick={() => setActiveTab('direct')}
            style={{
              padding: '8px 20px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              cursor: 'pointer',
              background: activeTab === 'direct' ? '#1890ff' : 'transparent',
              color: activeTab === 'direct' ? '#fff' : '#666',
              fontWeight: activeTab === 'direct' ? 'bold' : 'normal',
            }}
          >
            直充
          </button>
          <button
            key="coupon"
            onClick={() => setActiveTab('coupon')}
            style={{
              padding: '8px 20px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              cursor: 'pointer',
              background: activeTab === 'coupon' ? '#1890ff' : 'transparent',
              color: activeTab === 'coupon' ? '#fff' : '#666',
              fontWeight: activeTab === 'coupon' ? 'bold' : 'normal',
            }}
          >
            券码
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#fafafa', padding: 16, borderRadius: 8, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          rowKey="id"
          bordered
          size="small"
          style={{ backgroundColor: '#fff', borderRadius: 4 }}
        />
      </div>

      <Modal
        title={editingData ? '编辑规格' : '新建规格'}
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        width={700}
      >
        <Tabs activeKey={formVisibleTab} onChange={setFormVisibleTab}>
          <TabPane tab="基本信息" key="basic">
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>关联商品</h3>
              <div style={{ padding: 16, background: '#fafafa', borderRadius: 4, textAlign: 'center', color: '#999' }}>
                暂无关联商品信息
                <Button type="link" style={{ marginLeft: 8 }}>编辑关联商品</Button>
              </div>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>基本信息</h3>
            <Form form={form} layout="vertical">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Form.Item
                  name="name"
                  label="规格名称"
                  rules={[{ required: true, message: '请输入规格名称' }]}
                >
                  <Input placeholder="请输入规格名称" />
                </Form.Item>
                <Form.Item
                  name="rechargeType"
                  label="充值类型"
                  rules={[{ required: true, message: '请选择充值类型' }]}
                >
                  <Select placeholder="请选择充值类型">
                    <Option value="手机号">手机号</Option>
                    <Option value="微信OpenId">微信OpenId</Option>
                    <Option value="暂无">暂无</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="officialPrice"
                  label="官方价"
                  rules={[{ required: true, message: '请输入官方价' }]}
                >
                  <Input type="number" placeholder="请输入官方价" />
                </Form.Item>
                <Form.Item
                  name="defaultPrice"
                  label="默认分销价"
                  rules={[{ required: true, message: '请输入默认分销价' }]}
                >
                  <Input type="number" placeholder="请输入默认分销价" />
                </Form.Item>
                <Form.Item
                  name="costPrice"
                  label="成本价"
                  rules={[{ required: true, message: '请输入成本价' }]}
                >
                  <Input type="number" placeholder="请输入成本价" />
                </Form.Item>
              </div>
            </Form>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button onClick={() => setModalVisible(false)}>返回列表</Button>
              <Button onClick={handleSave}>保存</Button>
              <Button type="primary" onClick={handleSaveNext}>保存并下一步</Button>
            </div>
          </TabPane>
          <TabPane tab="关联产品" key="product">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button type="primary">编辑关联产品</Button>
            </div>
            <Table
              columns={[
                { title: '产品ID', dataIndex: 'id', key: 'id' },
                { title: '产品名称', dataIndex: 'name', key: 'name' },
                { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
                { title: '数量', dataIndex: 'quantity', key: 'quantity' },
              ]}
              dataSource={[]}
              pagination={false}
              locale={{ emptyText: '无数据' }}
            />
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