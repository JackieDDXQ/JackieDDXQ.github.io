import { useEffect, useRef } from 'react'
import { Card, Row, Col } from 'antd'
import * as echarts from 'echarts'
import {
  WarningOutlined,
  PauseOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  InboxOutlined,
  PlusOutlined,
  BarChartOutlined,
  RestOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

const quickEntryData = [
  { icon: <InboxOutlined />, label: '新建供应商', color: '#1890ff' },
  { icon: <PauseOutlined />, label: '新建产品', color: '#13c2c2' },
  { icon: <ShoppingCartOutlined />, label: '新建品牌', color: '#52c41a' },
  { icon: <PlusOutlined />, label: '新建商品', color: '#722ed1' },
  { icon: <BarChartOutlined />, label: '新建规格', color: '#eb2f96' },
]

const salesRankingData = [
  { name: '天猫购物券', sales: 214364 },
  { name: '优酷VIP会员卡', sales: 19783 },
  { name: '霸王茶姬满减券', sales: 14489 },
  { name: '霸王茶姬满减券', sales: 14489 },
  { name: '支付宝红包', sales: 6875 },
  { name: '霸王茶姬折扣券', sales: 250 },
]

const supplierRankingData = [
  { name: '瑞幸', sales: 214364, products: 4 },
  { name: '霸王茶姬', sales: 15019, products: 16 },
  { name: '霸王茶姬', sales: 15017, products: 1 },
  { name: '悦跑圈科技（北京', sales: 13417, products: 1 },
  { name: '广州丰粤科技服务有', sales: 6875, products: 2 },
  { name: '飞蝉', sales: 6409, products: 3 },
]

const orderVolumeData = [
  { date: '2026-04-27', value: 15000 },
  { date: '2026-04-28', value: 8000 },
  { date: '2026-04-29', value: 12000 },
  { date: '2026-04-30', value: 11057 },
  { date: '2026-05-01', value: 6000 },
  { date: '2026-05-02', value: 3000 },
  { date: '2026-05-03', value: 2000 },
]

const orderAmountData = [
  { date: '2026-04-27', value: 180000 },
  { date: '2026-04-28', value: 100000 },
  { date: '2026-04-29', value: 140000 },
  { date: '2026-04-30', value: 110570 },
  { date: '2026-05-01', value: 70000 },
  { date: '2026-05-02', value: 40000 },
  { date: '2026-05-03', value: 25000 },
]

export default function Home() {
  const orderVolumeChartRef = useRef<HTMLDivElement>(null)
  const orderAmountChartRef = useRef<HTMLDivElement>(null)
  const salesTypeChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (orderVolumeChartRef.current) {
      const chart = echarts.init(orderVolumeChartRef.current)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (params: unknown) => {
            const param = params as { axisValue: string; value: number }[]
            return `${param[0].axisValue}<br/>订单量: ${param[0].value}`
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: orderVolumeData.map((item) => item.date),
          axisLine: { lineStyle: { color: '#e8e8e8' } },
          axisLabel: { color: '#999', fontSize: 12 },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f0f0f0' } },
          axisLabel: { color: '#999', fontSize: 12 },
        },
        series: [
          {
            data: orderVolumeData.map((item) => item.value),
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 185, 107, 0.3)' },
                { offset: 1, color: 'rgba(0, 185, 107, 0.05)' },
              ]),
            },
            lineStyle: { color: '#00b96b', width: 3 },
            itemStyle: { color: '#00b96b' },
            symbol: 'circle',
            symbolSize: 8,
          },
        ],
      })

      return () => chart.dispose()
    }
  }, [])

  useEffect(() => {
    if (orderAmountChartRef.current) {
      const chart = echarts.init(orderAmountChartRef.current)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (params: unknown) => {
            const param = params as { axisValue: string; value: number }[]
            return `${param[0].axisValue}<br/>订单金额: ${param[0].value.toLocaleString()}`
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: orderAmountData.map((item) => item.date),
          axisLine: { lineStyle: { color: '#e8e8e8' } },
          axisLabel: { color: '#999', fontSize: 12 },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f0f0f0' } },
          axisLabel: { color: '#999', fontSize: 12 },
        },
        series: [
          {
            data: orderAmountData.map((item) => item.value),
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
                { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
              ]),
            },
            lineStyle: { color: '#1890ff', width: 3 },
            itemStyle: { color: '#1890ff' },
            symbol: 'circle',
            symbolSize: 8,
          },
        ],
      })

      return () => chart.dispose()
    }
  }, [])

  useEffect(() => {
    if (salesTypeChartRef.current) {
      const chart = echarts.init(salesTypeChartRef.current)
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        series: [
          {
            name: '销量类型',
            type: 'pie',
            radius: ['55%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
                fontWeight: 'bold',
                formatter: '{d}%',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 100, name: '直充', itemStyle: { color: '#1890ff' } },
            ],
          },
        ],
      })

      return () => chart.dispose()
    }
  }, [])

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#999', fontSize: 14 }}>供应商总数</p>
                <p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>15</p>
              </div>
              <div style={{ width: 48, height: 48, background: '#fff7e6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WarningOutlined style={{ fontSize: 24, color: '#faad14' }} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <RestOutlined style={{ fontSize: 12, color: '#00b96b' }} />
              <span style={{ fontSize: 12, color: '#00b96b' }}>132 产品总数</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#999', fontSize: 14 }}>商品总数</p>
                <p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>45</p>
              </div>
              <div style={{ width: 48, height: 48, background: '#f6ffed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PauseOutlined style={{ fontSize: 24, color: '#52c41a' }} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <RestOutlined style={{ fontSize: 12, color: '#00b96b' }} />
              <span style={{ fontSize: 12, color: '#00b96b' }}>42 已上架</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#999', fontSize: 14 }}>30日销售总额</p>
                <p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>3,143,931</p>
              </div>
              <div style={{ width: 48, height: 48, background: '#e6f7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <RestOutlined style={{ fontSize: 12, color: '#00b96b' }} />
              <span style={{ fontSize: 12, color: '#00b96b' }}>567,503 30日销售数量</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ background: 'linear-gradient(135deg, #00b96b, #009955)', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 14, opacity: 0.8 }}>快捷入口</p>
              </div>
              <FileTextOutlined style={{ fontSize: 24, opacity: 0.8 }} />
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {quickEntryData.map((item, index) => (
                <button
                  key={index}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    border: 'none',
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="订单量" extra={
            <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
              <span style={{ color: '#00b96b', fontWeight: 'bold' }}>本周</span>
              <span>本月</span>
              <span>开始日期</span>
              <span>结束日期</span>
            </div>
          }>
            <div ref={orderVolumeChartRef} style={{ height: 250 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="商品销量排行">
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontWeight: 'bold' }}>商品</span>
              <span style={{ fontWeight: 'bold' }}>月销量</span>
            </div>
            {salesRankingData.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: index < salesRankingData.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ color: '#666' }}>{item.name}</span>
                <span style={{ fontWeight: 'bold' }}>{item.sales.toLocaleString()}</span>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="订单金额" extra={
            <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
              <span style={{ color: '#1890ff', fontWeight: 'bold' }}>本周</span>
              <span>本月</span>
              <span>开始日期</span>
              <span>结束日期</span>
            </div>
          }>
            <div ref={orderAmountChartRef} style={{ height: 250 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="供应商" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontWeight: 'bold' }}>供应商</span>
              <span style={{ fontWeight: 'bold' }}>月销量</span>
              <span style={{ fontWeight: 'bold' }}>供应商产品</span>
            </div>
            {supplierRankingData.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: index < supplierRankingData.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ color: '#666', width: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                <span style={{ fontWeight: 'bold', width: 80, textAlign: 'right' }}>{item.sales.toLocaleString()}</span>
                <span style={{ color: '#999' }}>{item.products}</span>
              </div>
            ))}
          </Card>
          <Card title="销量类型占比">
            <div ref={salesTypeChartRef} style={{ height: 200 }} />
            <div style={{ textAlign: 'center', marginTop: -20 }}>
              <span style={{ color: '#1890ff' }}>直充</span>
              <span style={{ color: '#999', marginLeft: 8 }}>: 100%</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
