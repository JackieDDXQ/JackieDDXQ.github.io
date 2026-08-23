import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, DatePicker, Tag } from 'antd'
import { SearchOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const mockData = [
  {
    key: '1',
    orderNo: 'ORDER202605080001',
    parentOrderNo: '0',
    externalOrderNo: '采:SH202605080001\n供:0',
    orderTime: '2026-05-08 11:11:55',
    user: '138****1001',
    equityCode: 'EQT0001',
    equityName: '示例权益-视频通用版',
    unitPrice: 25,
    quantity: 1,
    amount: 25,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: true,
    channel: '渠道A',
    createTime: '2026-05-08 11:11:55'
  },
  {
    key: '2',
    orderNo: 'ORDER202605080002',
    parentOrderNo: '0',
    externalOrderNo: '采:SH202605080002\n供:0',
    orderTime: '2026-05-08 11:10:58',
    user: '139****2002',
    equityCode: 'EQT0002',
    equityName: '示例权益-随心选视频',
    unitPrice: 25,
    quantity: 1,
    amount: 25,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: true,
    channel: '渠道B',
    createTime: '2026-05-08 11:10:58'
  },
  {
    key: '3',
    orderNo: 'ORDER202605080003',
    parentOrderNo: '0',
    externalOrderNo: '采:SH202605080003...\n供:0',
    orderTime: '2026-05-08 11:10:03',
    user: '137****3003',
    equityCode: 'EQT0003',
    equityName: '示例权益-商城券包',
    unitPrice: 145,
    quantity: 1,
    amount: 145,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: false,
    channel: '渠道A',
    createTime: '2026-05-08 11:10:03'
  },
  {
    key: '4',
    orderNo: 'ORDER202605080004',
    parentOrderNo: '0',
    externalOrderNo: '采:SH202605080004...\n供:0',
    orderTime: '2026-05-08 11:09:49',
    user: '150****4004',
    equityCode: 'EQT0003',
    equityName: '示例权益-商城券包',
    unitPrice: 145,
    quantity: 1,
    amount: 145,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: false,
    channel: '渠道C',
    createTime: '2026-05-08 11:09:49'
  },
  {
    key: '5',
    orderNo: 'ORDER202605080005',
    parentOrderNo: '0',
    externalOrderNo: '采:SH202605080005\n供:ORDER202605080006',
    orderTime: '2026-05-08 11:09:33',
    user: '187****5005',
    equityCode: 'EQT0001',
    equityName: '示例权益-视频通用版',
    unitPrice: 25,
    quantity: 1,
    amount: 25,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: true,
    channel: '渠道A',
    createTime: '2026-05-08 11:09:33'
  },
  {
    key: '6',
    orderNo: 'ORDER202605080006',
    parentOrderNo: 'ORDER202605080010',
    externalOrderNo: '采:SH202605080006...\n供:ORDER202605080007',
    orderTime: '2026-05-08 11:08:57',
    user: '175****6006',
    equityCode: 'EQT0004',
    equityName: '示例权益-购物券15元',
    unitPrice: 15,
    quantity: 1,
    amount: 15,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: false,
    channel: '渠道B',
    createTime: '2026-05-08 11:08:57'
  },
  {
    key: '7',
    orderNo: 'ORDER202605080007',
    parentOrderNo: 'ORDER202605080010',
    externalOrderNo: '采:SH202605080007...\n供:ORDER202605080008',
    orderTime: '2026-05-08 11:08:57',
    user: '175****6006',
    equityCode: 'EQT0005',
    equityName: '示例权益-购物券10元',
    unitPrice: 10,
    quantity: 1,
    amount: 10,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: false,
    channel: '渠道B',
    createTime: '2026-05-08 11:08:57'
  },
  {
    key: '8',
    orderNo: 'ORDER202605080008',
    parentOrderNo: 'ORDER202605080010',
    externalOrderNo: '采:SH202605080008...\n供:ORDER202605080009',
    orderTime: '2026-05-08 11:08:57',
    user: '175****6006',
    equityCode: 'EQT0006',
    equityName: '示例权益-超市满减券',
    unitPrice: 40,
    quantity: 1,
    amount: 40,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: true,
    channel: '渠道B',
    createTime: '2026-05-08 11:08:57'
  },
  {
    key: '9',
    orderNo: 'ORDER202605080009',
    parentOrderNo: 'ORDER202605080010',
    externalOrderNo: '采:SH202605080009...\n供:ORDER202605080011',
    orderTime: '2026-05-08 11:08:57',
    user: '175****6006',
    equityCode: 'EQT0006',
    equityName: '示例权益-超市满减券',
    unitPrice: 40,
    quantity: 1,
    amount: 40,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: true,
    channel: '渠道B',
    createTime: '2026-05-08 11:08:57'
  },
  {
    key: '10',
    orderNo: 'ORDER202605080010',
    parentOrderNo: 'ORDER202605080009',
    externalOrderNo: '采:SH202605080010...\n供:ORDER202605080012',
    orderTime: '2026-05-08 11:08:57',
    user: '175****6006',
    equityCode: 'EQT0007',
    equityName: '示例权益-超市满减券20元',
    unitPrice: 20,
    quantity: 1,
    amount: 20,
    status: 'delivered',
    receiveStatus: 'received',
    writeOffStatus: 'writtenOff',
    isRealWriteOff: false,
    channel: '渠道B',
    createTime: '2026-05-08 11:08:57'
  }
]

const statusMap = {
  pending: { color: 'blue', text: '待处理' },
  processing: { color: 'orange', text: '处理中' },
  delivered: { color: 'green', text: '已完成' },
  cancelled: { color: 'default', text: '已取消' }
}

const receiveStatusMap = {
  unreceived: '未领取',
  received: '已领取'
}

const writeOffStatusMap = {
  unwritten: '未核销',
  writtenOff: '已核销'
}

export default function OrderList() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    orderMonth: '',
    orderNo: '',
    parentOrderNo: '',
    externalOrderNo: '',
    processStatus: '',
    receiveStatus: '',
    writeOffStatus: '',
    isRealWriteOff: '',
    equityCode: '',
    equityName: '',
    user: '',
    channel: ''
  })

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 200
    },
    {
      title: '父订单号',
      dataIndex: 'parentOrderNo',
      key: 'parentOrderNo',
      width: 200
    },
    {
      title: '外部订单号',
      dataIndex: 'externalOrderNo',
      key: 'externalOrderNo',
      width: 220
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: 180
    },
    {
      title: '下单用户',
      dataIndex: 'user',
      key: 'user',
      width: 130
    },
    {
      title: '权益编码',
      dataIndex: 'equityCode',
      key: 'equityCode',
      width: 150
    },
    {
      title: '权益名称',
      dataIndex: 'equityName',
      key: 'equityName',
      width: 200
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 100
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={statusMap[status]?.color || 'default'}>
          {statusMap[status]?.text || status}
        </Tag>
      )
    },
    {
      title: '领取状态',
      dataIndex: 'receiveStatus',
      key: 'receiveStatus',
      width: 100,
      render: (status) => receiveStatusMap[status] || status
    },
    {
      title: '核销状态',
      dataIndex: 'writeOffStatus',
      key: 'writeOffStatus',
      width: 100,
      render: (status) => writeOffStatusMap[status] || status
    },
    
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => navigate(`/order/detail/${record.orderNo}`)}>
            详情
          </Button>
        </Space>
      )
    }
  ]

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({
      orderMonth: '',
      orderNo: '',
      parentOrderNo: '',
      externalOrderNo: '',
      processStatus: '',
      receiveStatus: '',
      writeOffStatus: '',
      isRealWriteOff: '',
      equityCode: '',
      equityName: '',
      user: '',
      channel: ''
    })
  }

  const handleExport = () => {
    console.log('Exporting orders')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>全部订单</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="small" style={{ width: '100%' }}>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>订单月份</span>
            <Select
              placeholder="请选择订单月份"
              style={{ width: 150 }}
              value={filters.orderMonth}
              onChange={(value) => setFilters({ ...filters, orderMonth: value })}
            >
              <Option value="2026-05">2026年5月</Option>
              <Option value="2026-04">2026年4月</Option>
              <Option value="2026-03">2026年3月</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>订单号</span>
            <Input
              placeholder="请输入订单号"
              style={{ width: 200 }}
              value={filters.orderNo}
              onChange={(e) => setFilters({ ...filters, orderNo: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>父订单号</span>
            <Input
              placeholder="请输入父订单号"
              style={{ width: 200 }}
              value={filters.parentOrderNo}
              onChange={(e) => setFilters({ ...filters, parentOrderNo: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>外部订单号</span>
            <Input
              placeholder="请输入外部订单号"
              style={{ width: 200 }}
              value={filters.externalOrderNo}
              onChange={(e) => setFilters({ ...filters, externalOrderNo: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>处理状态</span>
            <Select
              placeholder="请选择处理状态"
              style={{ width: 150 }}
              value={filters.processStatus}
              onChange={(value) => setFilters({ ...filters, processStatus: value })}
            >
              <Option value="pending">待处理</Option>
              <Option value="processing">处理中</Option>
              <Option value="delivered">已完成</Option>
              <Option value="cancelled">已取消</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>领取状态</span>
            <Select
              placeholder="请选择领取状态"
              style={{ width: 150 }}
              value={filters.receiveStatus}
              onChange={(value) => setFilters({ ...filters, receiveStatus: value })}
            >
              <Option value="unreceived">未领取</Option>
              <Option value="received">已领取</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>核销状态</span>
            <Select
              placeholder="请选择核销状态"
              style={{ width: 150 }}
              value={filters.writeOffStatus}
              onChange={(value) => setFilters({ ...filters, writeOffStatus: value })}
            >
              <Option value="unwritten">未核销</Option>
              <Option value="writtenOff">已核销</Option>
            </Select>
          </Space>
          
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>权益编号</span>
            <Input
              placeholder="请输入权益编号"
              style={{ width: 200 }}
              value={filters.equityCode}
              onChange={(e) => setFilters({ ...filters, equityCode: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>权益名称</span>
            <Input
              placeholder="请输入权益名称"
              style={{ width: 200 }}
              value={filters.equityName}
              onChange={(e) => setFilters({ ...filters, equityName: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>下单用户</span>
            <Input
              placeholder="请输入下单用户手机号"
              style={{ width: 200 }}
              value={filters.user}
              onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>订单渠道</span>
            <Select
              placeholder="请选择订单渠道"
              style={{ width: 150 }}
              value={filters.channel}
              onChange={(value) => setFilters({ ...filters, channel: value })}
            >
              <Option value="渠道A">渠道A</Option>
              <Option value="渠道B">渠道B</Option>
              <Option value="渠道C">渠道C</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>下单时间</span>
            <RangePicker style={{ width: 300 }} />
          </Space>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }}>
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Space>
      </Card>

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button type="primary" icon={<ExportOutlined />} onClick={handleExport} style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }}>
            导出订单
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 2200 }}
          pagination={{
            total: 288363,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `从第 0 项开始，共 ${total} 项`
          }}
          bordered
        />
      </Card>
    </div>
  )
}
