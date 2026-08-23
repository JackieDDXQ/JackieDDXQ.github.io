import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const mockData = [
  {
    key: '1',
    id: 'STK001',
    name: '示例库存A-500元充值卡',
    stock: 989,
    status: 'online',
    type: '电子券',
    brand: '品牌A',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-22 13:26:25',
    updateTime: '2026-04-22 13:26:25'
  },
  {
    key: '2',
    id: 'STK002',
    name: '示例库存B-200元充值卡',
    stock: 999,
    status: 'online',
    type: '电子券',
    brand: '品牌A',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-22 13:26:06',
    updateTime: '2026-04-22 13:26:06'
  },
  {
    key: '3',
    id: 'STK003',
    name: '示例库存C-100元充值卡',
    stock: 998,
    status: 'online',
    type: '电子券',
    brand: '品牌A',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-22 13:25:42',
    updateTime: '2026-04-22 13:25:42'
  },
  {
    key: '4',
    id: 'STK004',
    name: '示例库存D-10元满减券',
    stock: 3196,
    status: 'online',
    type: '电子券',
    brand: '品牌B',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-09 17:17:11',
    updateTime: '2026-04-09 17:17:11'
  },
  {
    key: '5',
    id: 'STK005',
    name: '示例库存E-20元代金券',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌B',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:24:04',
    updateTime: '2026-04-08 18:24:04'
  },
  {
    key: '6',
    id: 'STK006',
    name: '示例库存F-会员周卡',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌C',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:18:57',
    updateTime: '2026-04-08 18:18:57'
  },
  {
    key: '7',
    id: 'STK007',
    name: '示例库存G-出行周卡',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌D',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:18:12',
    updateTime: '2026-04-08 18:18:12'
  },
  {
    key: '8',
    id: 'STK008',
    name: '示例库存H-5元优惠券',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌E',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:17:50',
    updateTime: '2026-04-08 18:18:26'
  },
  {
    key: '9',
    id: 'STK009',
    name: '示例库存I-29元代金券',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌F',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:17:17',
    updateTime: '2026-04-08 18:21:43'
  },
  {
    key: '10',
    id: 'STK010',
    name: '示例库存J-饮品代金券',
    stock: 10000,
    status: 'online',
    type: '电子券',
    brand: '品牌G',
    deadline: '下单后30天内可核销',
    showType: '不展示',
    createTime: '2026-04-08 18:16:52',
    updateTime: '2026-04-08 18:22:26'
  }
]

export default function EquityInventory() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    name: '',
    id: '',
    type: '',
    status: ''
  })

  const columns = [
    {
      title: '库存ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '库存名称',
      dataIndex: 'name',
      key: 'name',
      width: 280
    },
    {
      title: '当前库存总量',
      dataIndex: 'stock',
      key: 'stock',
      width: 140
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'online' ? 'success' : 'default'}>
          {status === 'online' ? '上线' : '下线'}
        </Tag>
      )
    },
    {
      title: '核销截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 180
    },
    {
      title: '券码展示方式',
      dataIndex: 'showType',
      key: 'showType',
      width: 130
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => navigate(`/equity/inventory/${record.id}`)}>
            查看详情
          </Button>
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Space>
      )
    }
  ]

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({ name: '', id: '', type: '', status: '' })
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>权益库存</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>名称</span>
            <Input
              placeholder="请输入名称"
              style={{ width: 240 }}
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>库存ID</span>
            <Input
              placeholder="请输入库存ID"
              style={{ width: 240 }}
              value={filters.id}
              onChange={(e) => setFilters({ ...filters, id: e.target.value })}
            />
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>类型</span>
            <Select
              placeholder="请选择类型"
              style={{ width: 180 }}
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Option value="电子券">电子券</Option>
              <Option value="实物">实物</Option>
              <Option value="服务">服务</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>状态</span>
            <Select
              placeholder="请选择状态"
              style={{ width: 180 }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="online">上线</Option>
              <Option value="offline">下线</Option>
            </Select>
          </Space>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/equity/inventory/create')}>
            新建权益库存
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 1600 }}
          pagination={{
            total: 92,
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
