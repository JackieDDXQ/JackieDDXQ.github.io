import React, { useState } from 'react'
import { Card, Row, Col, Statistic, Table, Tabs, Select } from 'antd'
import ReactECharts from 'echarts-for-react'
import {
  ShopOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  GiftOutlined
} from '@ant-design/icons'

const { Option } = Select

const mockInventoryData = [
  { key: '1', name: '星巴克中杯咖啡券', stock: 50 },
  { key: '2', name: '腾讯视频月卡', stock: 80 },
  { key: '3', name: '美团外卖券', stock: 120 },
  { key: '4', name: '京东E卡50元', stock: 150 },
  { key: '5', name: '网易云音乐年卡', stock: 200 }
]

const mockSalesData = [
  { key: '1', name: '新人专属权益包', sales: 1580 },
  { key: '2', name: '星巴克中杯咖啡券', sales: 1200 },
  { key: '3', name: '腾讯视频月卡', sales: 980 },
  { key: '4', name: '美团外卖券', sales: 750 },
  { key: '5', name: '京东E卡50元', sales: 620 }
]

const orderChartOption = {
  title: { text: '订单总览' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['全部订单', '已发货', '已关闭'] },
  xAxis: {
    type: 'category',
    data: ['4-20', '4-21', '4-22', '4-23', '4-24', '4-25', '4-26']
  },
  yAxis: { type: 'value' },
  series: [
    { name: '全部订单', type: 'line', smooth: true, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: '已发货', type: 'line', smooth: true, data: [700, 820, 780, 850, 1100, 1150, 1100] },
    { name: '已关闭', type: 'line', smooth: true, data: [120, 112, 121, 84, 190, 180, 220] }
  ]
}

const salesChartOption = {
  title: { text: '销售额总览' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['全部订单', '已发货', '已关闭'] },
  xAxis: {
    type: 'category',
    data: ['4-20', '4-21', '4-22', '4-23', '4-24', '4-25', '4-26']
  },
  yAxis: { type: 'value' },
  series: [
    { name: '全部订单', type: 'line', smooth: true, data: [82000, 93200, 90100, 93400, 129000, 133000, 132000] },
    { name: '已发货', type: 'line', smooth: true, data: [70000, 82000, 78000, 85000, 110000, 115000, 110000] },
    { name: '已关闭', type: 'line', smooth: true, data: [12000, 11200, 12100, 8400, 19000, 18000, 22000] }
  ]
}

const inventoryPieOption = {
  title: { text: '权益库存分布', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '库存状态',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 156, name: '已上架' },
        { value: 44, name: '已下架' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const configPieOption = {
  title: { text: '权益配置分布', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '配置状态',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 89, name: '已上架' },
        { value: 21, name: '已下架' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const quickActions = [
  { icon: <GiftOutlined style={{ fontSize: 32 }} />, title: '新建权益库存', desc: '快速创建新的权益库存' },
  { icon: <ShopOutlined style={{ fontSize: 32 }} />, title: '新建权益配置', desc: '快速创建新的权益配置' },
  { icon: <ShoppingCartOutlined style={{ fontSize: 32 }} />, title: '查看订单', desc: '查看最新订单列表' },
  { icon: <DollarOutlined style={{ fontSize: 32 }} />, title: '数据导出', desc: '导出各类数据报表' }
]

const inventoryColumns = [
  { title: '权益库名称', dataIndex: 'name', key: 'name' },
  { title: '库存剩余', dataIndex: 'stock', key: 'stock' }
]

const salesColumns = [
  { title: '权益配置名称', dataIndex: 'name', key: 'name' },
  { title: '月销量', dataIndex: 'sales', key: 'sales' }
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('month')

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>数据看板</h2>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日订单"
              value={1258}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日销售额"
              value={128560}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<DollarOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="权益库存总数"
              value={200}
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="权益配置总数"
              value={110}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        {quickActions.map((action, index) => (
          <Col span={6} key={index}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 12 }}>{action.icon}</div>
              <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{action.title}</div>
              <div style={{ color: '#999', fontSize: 12 }}>{action.desc}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card
            title="订单总览"
            extra={
              <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
                <Option value="week">本周</Option>
                <Option value="month">本月</Option>
              </Select>
            }
          >
            <ReactECharts option={orderChartOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card
            title="销售额总览"
            extra={
              <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
                <Option value="week">本周</Option>
                <Option value="month">本月</Option>
              </Select>
            }
          >
            <ReactECharts option={salesChartOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="库存提醒">
            <Table
              dataSource={mockInventoryData}
              columns={inventoryColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="销量排行">
            <Table
              dataSource={mockSalesData}
              columns={salesColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <ReactECharts option={inventoryPieOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={configPieOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
