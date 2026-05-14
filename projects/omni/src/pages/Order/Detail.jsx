import React from 'react'
import { Card, Descriptions, Button, Space, Table, Divider } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const mockOrderItems = [
  {
    key: '1',
    productName: '霸王茶姬20元满减券',
    spec: '标准规格',
    quantity: 2,
    unitPrice: 20,
    totalPrice: 40
  }
]

const orderItemColumns = [
  { title: '商品名称', dataIndex: 'productName', key: 'productName' },
  { title: '规格', dataIndex: 'spec', key: 'spec' },
  { title: '数量', dataIndex: 'quantity', key: 'quantity' },
  { title: '单价（元）', dataIndex: 'unitPrice', key: 'unitPrice' },
  { title: '小计（元）', dataIndex: 'totalPrice', key: 'totalPrice' }
]

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/order/list')}>
          返回列表
        </Button>
        <h2 style={{ margin: 0 }}>订单详情</h2>
      </div>

      <Card title="订单信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="订单号">{id}</Descriptions.Item>
          <Descriptions.Item label="订单类型">权益订单</Descriptions.Item>
          <Descriptions.Item label="订单状态">
            <span style={{ color: '#52c41a' }}>已完成</span>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">2026-04-28 14:30:20</Descriptions.Item>
          <Descriptions.Item label="支付时间">2026-04-28 14:30:25</Descriptions.Item>
          <Descriptions.Item label="完成时间">2026-04-28 14:35:00</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="商品信息" style={{ marginBottom: 16 }}>
        <Table
          dataSource={mockOrderItems}
          columns={orderItemColumns}
          pagination={false}
          size="small"
          footer={() => (
            <div style={{ textAlign: 'right' }}>
              <strong>订单总额：40.00 元</strong>
            </div>
          )}
        />
      </Card>

      <Card title="用户信息" style={{ marginBottom: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="用户ID">U123456</Descriptions.Item>
          <Descriptions.Item label="用户昵称">张三</Descriptions.Item>
          <Descriptions.Item label="手机号">138****8888</Descriptions.Item>
          <Descriptions.Item label="注册时间">2026-01-15 10:00:00</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="操作日志">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <strong>2026-04-28 14:35:00</strong> - 订单已完成
          </div>
          <Divider style={{ margin: '8px 0' }} />
          <div>
            <strong>2026-04-28 14:30:25</strong> - 用户支付成功
          </div>
          <Divider style={{ margin: '8px 0' }} />
          <div>
            <strong>2026-04-28 14:30:20</strong> - 订单创建成功
          </div>
        </Space>
      </Card>
    </div>
  )
}
