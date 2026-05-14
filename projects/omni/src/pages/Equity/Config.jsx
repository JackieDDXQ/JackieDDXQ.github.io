import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, DatePicker, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const mockData = [
  {
    key: '1',
    id: 'CONF001',
    name: '示例权益A-满减券',
    status: 'online',
    isAtomic: true,
    operator: '系统',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-28 13:31:22',
    updateTime: '2026-04-28 13:31:41'
  },
  {
    key: '2',
    id: 'CONF002',
    name: '示例权益B-会员套餐',
    status: 'online',
    isAtomic: false,
    operator: '会员商城',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-24 11:31:39',
    updateTime: '2026-04-24 15:31:30'
  },
  {
    key: '3',
    id: 'CONF003',
    name: '示例权益C-充值卡500元',
    status: 'online',
    isAtomic: true,
    operator: '系统',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-22 13:30:39',
    updateTime: '2026-04-22 13:30:55'
  },
  {
    key: '4',
    id: 'CONF004',
    name: '示例权益D-充值卡200元',
    status: 'online',
    isAtomic: true,
    operator: '系统',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-22 13:30:16',
    updateTime: '2026-04-22 13:30:16'
  },
  {
    key: '5',
    id: 'CONF005',
    name: '示例权益E-充值卡100元',
    status: 'online',
    isAtomic: true,
    operator: '系统',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-22 13:29:49',
    updateTime: '2026-04-22 13:31:15'
  },
  {
    key: '6',
    id: 'CONF006',
    name: '示例权益F-10元满减券',
    status: 'online',
    isAtomic: true,
    operator: '集运',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-10 10:18:51',
    updateTime: '2026-04-10 10:19:00'
  },
  {
    key: '7',
    id: 'CONF007',
    name: '示例权益G-购物券15元*3',
    status: 'online',
    isAtomic: true,
    operator: '运营A',
    stock: 3,
    hasBonus: false,
    createTime: '2026-04-09 17:48:57',
    updateTime: '2026-04-09 18:23:19'
  },
  {
    key: '8',
    id: 'CONF008',
    name: '示例权益H-优惠券',
    status: 'online',
    isAtomic: true,
    operator: '运营A',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-09 17:38:57',
    updateTime: '2026-04-09 17:45:14'
  },
  {
    key: '9',
    id: 'CONF009',
    name: '示例权益I-20元满减券',
    status: 'online',
    isAtomic: true,
    operator: '运营A',
    stock: 1,
    hasBonus: false,
    createTime: '2026-04-09 17:38:22',
    updateTime: '2026-04-09 23:10:32'
  },
  {
    key: '10',
    id: 'CONF010',
    name: '示例权益J-组合券包',
    status: 'online',
    isAtomic: true,
    operator: '运营A',
    stock: 2,
    hasBonus: false,
    createTime: '2026-04-09 17:34:46',
    updateTime: '2026-04-09 18:29:32'
  }
]

export default function EquityConfig() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    name: '',
    id: '',
    status: '',
    operator: '',
    isAtomic: ''
  })

  const columns = [
    {
      title: '配置编码',
      dataIndex: 'id',
      key: 'id',
      width: 180
    },
    {
      title: '配置名称',
      dataIndex: 'name',
      key: 'name',
      width: 280
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
      title: '原子权益',
      dataIndex: 'isAtomic',
      key: 'isAtomic',
      width: 100,
      render: (isAtomic) => isAtomic ? '是' : '否'
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
      width: 120
    },
    {
      title: '发放数量',
      dataIndex: 'stock',
      key: 'stock',
      width: 100
    },
    {
      title: '附赠权益',
      dataIndex: 'hasBonus',
      key: 'hasBonus',
      width: 100,
      render: (hasBonus) => hasBonus ? '是' : '否'
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
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => navigate(`/equity/config/${record.id}`)}>
            详情
          </Button>
          <Button type="primary" size="small">
            下发
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
    setFilters({ name: '', id: '', status: '', operator: '', isAtomic: '' })
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>权益配置</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle" style={{ width: '100%' }}>
          <Space>
            <span>配置名称</span>
            <Input
              placeholder="请输入配置名称"
              style={{ width: 200 }}
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Space>
          <Space>
            <span>配置编码</span>
            <Input
              placeholder="请输入配置编码"
              style={{ width: 200 }}
              value={filters.id}
              onChange={(e) => setFilters({ ...filters, id: e.target.value })}
            />
          </Space>
          <Space>
            <span>状态</span>
            <Select
              placeholder="请选择状态"
              style={{ width: 150 }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="online">上线</Option>
              <Option value="offline">下线</Option>
            </Select>
          </Space>
          <Space>
            <span>运营商</span>
            <Select
              placeholder="请选择运营商"
              style={{ width: 150 }}
              value={filters.operator}
              onChange={(value) => setFilters({ ...filters, operator: value })}
            >
              <Option value="系统">系统</Option>
              <Option value="会员商城">会员商城</Option>
              <Option value="集运">集运</Option>
              <Option value="运营A">运营A</Option>
            </Select>
          </Space>
          <Space>
            <span>原子权益</span>
            <Select
              placeholder="请选择原子权益"
              style={{ width: 150 }}
              value={filters.isAtomic}
              onChange={(value) => setFilters({ ...filters, isAtomic: value })}
            >
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>
          </Space>
          <Space>
            <span>创建时间</span>
            <RangePicker style={{ width: 300 }} />
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
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/equity/config/create')}>
            新建权益配置
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 1800 }}
          pagination={{
            total: 129,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `从第 0 项开始，共 ${total} 项`
          }}
        />
      </Card>
    </div>
  )
}
