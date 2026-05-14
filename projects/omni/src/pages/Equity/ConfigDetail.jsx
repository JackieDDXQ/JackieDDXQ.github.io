import React, { useState } from 'react'
import { Card, Descriptions, Button, Space, Modal, Form, Input, InputNumber, Select, Table, Checkbox, Switch, Tabs } from 'antd'
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

export default function EquityConfigDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [currentEditType, setCurrentEditType] = useState('')
  const [form] = Form.useForm()

  const mockInventoryData = [
    {
      key: '1',
      inventoryId: '101',
      inventoryName: 'e袋洗500元充值卡',
      relatedProduct: 'e袋洗充值服务',
      brand: 'e袋洗',
      productType: '生活服务',
      stock: 989,
      purchasePrice: 450,
      productStatus: '在售',
      saleStartTime: '2026-01-01',
      saleEndTime: '2026-12-31'
    }
  ]

  const inventoryColumns = [
    { title: '库存ID', dataIndex: 'inventoryId', key: 'inventoryId' },
    { title: '库存名称', dataIndex: 'inventoryName', key: 'inventoryName' },
    { title: '关联商品', dataIndex: 'relatedProduct', key: 'relatedProduct' },
    { title: '品牌', dataIndex: 'brand', key: 'brand' },
    { title: '商品类型', dataIndex: 'productType', key: 'productType' },
    { title: '库存量', dataIndex: 'stock', key: 'stock' },
    { title: '采购价', dataIndex: 'purchasePrice', key: 'purchasePrice' },
    { title: '商品状态', dataIndex: 'productStatus', key: 'productStatus' },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link" size="small">查看详情</Button>
    }
  ]

  const handleEditClick = (type) => {
    setCurrentEditType(type)
    setEditModalVisible(true)
  }

  const handleEditConfirm = () => {
    form.validateFields().then(() => {
      console.log('Edit confirmed')
      setEditModalVisible(false)
    })
  }

  const renderEditModalContent = () => {
    switch (currentEditType) {
      case 'basic':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="配置名称"
              name="name"
              rules={[{ required: true, message: '请输入配置名称' }]}
            >
              <Input placeholder="请输入配置名称" />
            </Form.Item>
            <Form.Item
              label="配置编码"
              name="code"
              rules={[{ required: true, message: '请输入配置编码' }]}
            >
              <Input placeholder="请输入配置编码" />
            </Form.Item>
            <Form.Item
              label="是否原子权益"
              name="isAtomic"
              rules={[{ required: true, message: '请选择是否原子权益' }]}
            >
              <Select placeholder="请选择是否原子权益">
                <Option value={true}>是</Option>
                <Option value={false}>否</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="运营商"
              name="operator"
              rules={[{ required: true, message: '请选择运营商' }]}
            >
              <Select placeholder="请选择运营商">
                <Option value="系统">系统</Option>
                <Option value="会员商城">会员商城</Option>
                <Option value="集运">集运</Option>
              </Select>
            </Form.Item>
          </Form>
        )
      case 'inventory':
        return (
          <div>
            <Form form={form} layout="vertical" style={{ marginBottom: 16 }}>
              <Form.Item label="库存名称" name="inventoryName">
                <Input placeholder="请输入库存名称" />
              </Form.Item>
            </Form>
            <Table
              dataSource={mockInventoryData}
              columns={inventoryColumns}
              rowKey="key"
              pagination={false}
              size="small"
            />
          </div>
        )
      case 'delivery':
        return (
          <Form form={form} layout="vertical">
            <Form.Item label="发放数量" name="deliveryCount">
              <InputNumber style={{ width: '100%' }} placeholder="请输入发放数量" />
            </Form.Item>
            <Form.Item label="是否手动领取" name="manualReceive" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="开启限售" name="enableLimitSale" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="限售周期" name="limitCycle">
              <Select placeholder="请选择限售周期">
                <Option value="day">每日</Option>
                <Option value="week">每周</Option>
                <Option value="month">每月</Option>
              </Select>
            </Form.Item>
            <Form.Item label="限售数量" name="limitCount">
              <InputNumber style={{ width: '100%' }} placeholder="请输入限售数量" />
            </Form.Item>
          </Form>
        )
      case 'detail':
        return (
          <Form form={form} layout="vertical">
            <Form.Item label="使用说明" name="usageDesc">
              <Input.TextArea rows={4} placeholder="请输入使用说明" />
            </Form.Item>
            <Form.Item label="注意事项" name="notice">
              <Input.TextArea rows={4} placeholder="请输入注意事项" />
            </Form.Item>
            <Form.Item label="有效期说明" name="validityDesc">
              <Input.TextArea rows={4} placeholder="请输入有效期说明" />
            </Form.Item>
          </Form>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/equity/config')}>
          返回列表
        </Button>
        <h2 style={{ margin: 0 }}>权益配置详情</h2>
      </div>

      <Card title="基本信息" style={{ marginBottom: 16 }} extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('basic')}>
          编辑
        </Button>
      }>
        <Descriptions column={2}>
          <Descriptions.Item label="配置编码">{id}</Descriptions.Item>
          <Descriptions.Item label="配置名称">霸王茶姬20元满减券-系统</Descriptions.Item>
          <Descriptions.Item label="状态">
            <span style={{ color: '#52c41a' }}>上线</span>
          </Descriptions.Item>
          <Descriptions.Item label="原子权益">是</Descriptions.Item>
          <Descriptions.Item label="运营商">系统</Descriptions.Item>
          <Descriptions.Item label="创建时间">2026-04-28 13:31:22</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="关联权益库存" style={{ marginBottom: 16 }} extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('inventory')}>
          编辑
        </Button>
      }>
        <Table
          dataSource={mockInventoryData}
          columns={inventoryColumns}
          pagination={false}
          size="small"
        />
      </Card>

      <Card title="发放配置" style={{ marginBottom: 16 }} extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('delivery')}>
          编辑
        </Button>
      }>
        <Descriptions column={2}>
          <Descriptions.Item label="发放数量">1</Descriptions.Item>
          <Descriptions.Item label="手动领取">否</Descriptions.Item>
          <Descriptions.Item label="开启限售">否</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="详细信息" extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('detail')}>
          编辑
        </Button>
      }>
        <Descriptions column={1}>
          <Descriptions.Item label="使用说明">本券限霸王茶姬门店使用，满30元减20元</Descriptions.Item>
          <Descriptions.Item label="注意事项">不与其他优惠同享，每个订单限用一张</Descriptions.Item>
          <Descriptions.Item label="有效期说明">自领取之日起30天内有效</Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title={
          currentEditType === 'basic' ? '编辑基本信息' :
          currentEditType === 'inventory' ? '编辑关联权益库存' :
          currentEditType === 'delivery' ? '编辑发放配置' : '编辑详细信息'
        }
        open={editModalVisible}
        onOk={handleEditConfirm}
        onCancel={() => setEditModalVisible(false)}
        width={800}
      >
        {renderEditModalContent()}
      </Modal>
    </div>
  )
}
