import React, { useState } from 'react'
import { Card, Descriptions, Button, Space, Modal, Form, Input, Select, Table, Radio, Tag, Switch } from 'antd'
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

export default function EquityInventoryDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [currentEditType, setCurrentEditType] = useState('')
  const [form] = Form.useForm()

  const mockProductData = [
    {
      key: '1',
      specId: '20482223657418930',
      specName: 'e袋洗100元充值卡',
      productName: 'e袋洗充值卡',
      brandName: 'e袋洗',
      totalStock: 1000,
      currentStock: 998,
      writeOffCount: 2,
      status: true,
      priority: 1
    }
  ]

  const productColumns = [
    { title: '规格ID', dataIndex: 'specId', key: 'specId', width: 180 },
    { title: '规格名称', dataIndex: 'specName', key: 'specName', width: 200 },
    { title: '商品名称', dataIndex: 'productName', key: 'productName', width: 150 },
    { title: '品牌名称', dataIndex: 'brandName', key: 'brandName', width: 120 },
    { title: '库存总量', dataIndex: 'totalStock', key: 'totalStock', width: 100 },
    { title: '当前库存量', dataIndex: 'currentStock', key: 'currentStock', width: 120 },
    { title: '核销量', dataIndex: 'writeOffCount', key: 'writeOffCount', width: 80 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 80,
      render: (status) => (
        <Switch checked={status} disabled />
      )
    },
    { title: '优先级', dataIndex: 'priority', key: 'priority', width: 80 },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: () => (
        <Space>
          <Button type="link" size="small" style={{ color: '#1890ff' }}>详情</Button>
          <Button type="link" size="small" style={{ color: '#1890ff' }}>解绑</Button>
          <Button type="link" size="small" style={{ color: '#00b42a' }}>增加库存</Button>
          <Button type="link" size="small" style={{ color: '#ff4d4f' }}>减少库存</Button>
        </Space>
      )
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
              name="name"
              label={<span>权益库存名称 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请输入权益库存名称' }]}
            >
              <Input defaultValue="e袋洗100元充值卡" />
            </Form.Item>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Radio.Group defaultValue="online">
                <Radio value="online">上线</Radio>
                <Radio value="offline">下线</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="description"
              label="权益介绍"
            >
              <Input.TextArea rows={3} placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="usageInstructions"
              label="使用说明"
            >
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', padding: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>Normal</span>
                  <span style={{ marginRight: '8px', fontSize: '14px', fontWeight: 'bold' }}>B</span>
                  <span style={{ marginRight: '8px', fontSize: '14px', fontStyle: 'italic' }}>I</span>
                  <span style={{ marginRight: '8px', textDecoration: 'underline', fontSize: '14px' }}>U</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>Normal</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>Sans Serif</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>△</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>▲</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>≡</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>≡</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>≡</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>↔</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>↕</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>×</span>
                  <span style={{ marginRight: '8px', fontSize: '12px' }}>⊗</span>
                </div>
                <textarea
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    border: 'none', 
                    resize: 'none',
                    outline: 'none',
                    padding: '8px'
                  }}
                  placeholder="请输入"
                />
              </div>
            </Form.Item>
          </Form>
        )
      case 'product':
        return (
          <div>
            <Form form={form} layout="horizontal" style={{ marginBottom: 16 }}>
              <Space>
                <Form.Item label="商品ID">
                  <Input placeholder="请输入商品ID" />
                </Form.Item>
                <Form.Item label="商品名称">
                  <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">搜索</Button>
                </Form.Item>
                <Form.Item>
                  <Button>重置</Button>
                </Form.Item>
              </Space>
            </Form>
            <Table
              dataSource={mockProductData}
              columns={productColumns}
              rowKey="key"
              pagination={{
                total: 12,
                pageSize: 5,
                showSizeChanger: false,
                showQuickJumper: true
              }}
              size="small"
              bordered
            />
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
              <div style={{ marginBottom: 16 }}>
                <span>已选中 0 项</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                <Button type="primary" style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }}>
                  确认
                </Button>
                <Button>取消</Button>
              </div>
            </div>
          </div>
        )
      case 'stock':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="isInventory"
              label={<span>是否核销库存 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择是否核销库存' }]}
            >
              <Radio.Group defaultValue={false}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="isPriceAdjust"
              label={<span>是否库存价格调整 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择是否库存价格调整' }]}
            >
              <Radio.Group defaultValue={false}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="isCouponAvailable"
              label={<span>是否库存可领 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择是否库存可领' }]}
            >
              <Radio.Group defaultValue={false}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="threshold"
              label="库存预警阈值"
            >
              <Input defaultValue={0} />
            </Form.Item>
          </Form>
        )
      case 'other':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="expireType"
              label={<span>核销截止日期 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择核销截止日期类型' }]}
            >
              <Radio.Group defaultValue="relative">
                <Radio value="currentMonth">当月有效</Radio>
                <Radio value="fixed">固定截止时间</Radio>
                <Radio value="relative">相对截止时间</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="expireDays"
              label="下单后"
            >
              <Space>
                <Input defaultValue={30} style={{ width: 80 }} />
                <span>天内可核销</span>
              </Space>
            </Form.Item>
            <Form.Item
              name="isPhysical"
              label={<span>码券介质 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择码券介质' }]}
            >
              <Radio.Group defaultValue={false}>
                <Radio value={true}>存在</Radio>
                <Radio value={false}>不存在</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="showType"
              label={<span>券码展示方式 <span style={{ color: '#ff4d4f' }}>*</span></span>}
              rules={[{ required: true, message: '请选择券码展示方式' }]}
            >
              <Select defaultValue="hide">
                <Option value="show">展示</Option>
                <Option value="hide">不展示</Option>
              </Select>
            </Form.Item>
          </Form>
        )
      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (currentEditType) {
      case 'basic':
        return '编辑基本信息'
      case 'product':
        return '关联商品'
      case 'stock':
        return '编辑库存配置'
      case 'other':
        return '编辑其他配置'
      default:
        return ''
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/equity/inventory')}>
          返回列表
        </Button>
        <h2 style={{ margin: 0 }}>权益库存详情</h2>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <Descriptions column={3} bordered style={{ width: 'calc(100% - 120px)' }}>
            <Descriptions.Item label="库存名称" labelStyle={{ fontWeight: 'bold' }}>e袋洗100元充值卡</Descriptions.Item>
            <Descriptions.Item label="库存编号" labelStyle={{ fontWeight: 'bold' }}>99</Descriptions.Item>
            <Descriptions.Item label="权益状态" labelStyle={{ fontWeight: 'bold' }}>
              <Tag color="#52c41a">上线</Tag>
            </Descriptions.Item>
          </Descriptions>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('basic')}>
            编辑基本信息
          </Button>
        </div>
        <div style={{ paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 'bold' }}>权益介绍:</span></div>
          <div style={{ color: '#666' }}>e袋洗100元充值卡</div>
        </div>
        <div style={{ paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 'bold' }}>使用说明:</span></div>
          <div style={{ color: '#666' }}></div>
        </div>
      </Card>

      <Card title="关联商品" style={{ marginBottom: 16 }} extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('product')}>
          编辑
        </Button>
      }>
        <Table
          dataSource={mockProductData}
          columns={productColumns}
          pagination={false}
          size="small"
          bordered
        />
      </Card>

      <Card title="库存配置" style={{ marginBottom: 16 }} extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('stock')}>
          编辑
        </Button>
      }>
        <Descriptions column={4} bordered>
          <Descriptions.Item label="是否核销库存" labelStyle={{ fontWeight: 'bold' }}>否</Descriptions.Item>
          <Descriptions.Item label="是否库存价格调整" labelStyle={{ fontWeight: 'bold' }}>否</Descriptions.Item>
          <Descriptions.Item label="是否库存可领" labelStyle={{ fontWeight: 'bold' }}>否</Descriptions.Item>
          <Descriptions.Item label="库存预警阈值" labelStyle={{ fontWeight: 'bold' }}>0</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="其他配置" extra={
        <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick('other')}>
          编辑
        </Button>
      }>
        <Descriptions column={3} bordered>
          <Descriptions.Item label="核销截止时间" labelStyle={{ fontWeight: 'bold' }}>下单后30天内可核销</Descriptions.Item>
          <Descriptions.Item label="券码展示方式" labelStyle={{ fontWeight: 'bold' }}>不展示</Descriptions.Item>
          <Descriptions.Item label="码券介质" labelStyle={{ fontWeight: 'bold' }}>不存在</Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title={getModalTitle()}
        open={editModalVisible}
        onOk={handleEditConfirm}
        onCancel={() => setEditModalVisible(false)}
        footer={
          currentEditType === 'product' ? null : (
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>取消</Button>
              <Button type="primary" style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }} onClick={handleEditConfirm}>
                保存
              </Button>
            </Space>
          )
        }
        width={800}
      >
        {renderEditModalContent()}
      </Modal>
    </div>
  )
}