import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, DatePicker, Tag, Tabs, Switch } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

const mockRealtimeData = [
  {
    key: '1',
    id: 'WT001',
    name: '日常实时核销任务',
    strategyName: '常规核销策略',
    status: true,
    createTime: '2026-04-01 10:00:00',
    updateTime: '2026-04-28 14:00:00'
  },
  {
    key: '2',
    id: 'WT002',
    name: '促销期实时核销',
    strategyName: '促销期核销策略',
    status: false,
    createTime: '2026-03-15 09:00:00',
    updateTime: '2026-04-10 12:00:00'
  }
]

const mockHistoryData = [
  {
    key: '1',
    id: 'WTH001',
    name: '历史订单核销-4月',
    strategyName: '常规核销策略',
    status: 'completed',
    execTime: '2026-04-01 00:00:00',
    createTime: '2026-03-31 18:00:00',
    updateTime: '2026-04-01 02:30:00'
  },
  {
    key: '2',
    id: 'WTH002',
    name: '历史订单核销-3月',
    strategyName: '常规核销策略',
    status: 'pending',
    execTime: '-',
    createTime: '2026-02-28 18:00:00',
    updateTime: '2026-02-28 18:00:00'
  }
]

const statusMap = {
  pending: { color: 'orange', text: '待执行' },
  running: { color: 'blue', text: '执行中' },
  completed: { color: 'green', text: '已执行' },
  failed: { color: 'red', text: '执行失败' }
}

const commonColumns = [
  {
    title: '任务ID',
    dataIndex: 'id',
    key: 'id',
    width: 120
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: '关联策略',
    dataIndex: 'strategyName',
    key: 'strategyName',
    width: 180
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
  }
]

const realtimeColumns = [
  ...commonColumns,
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status) => <Switch checked={status} />
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    fixed: 'right',
    render: () => (
      <Space size="middle">
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    )
  }
]

const historyColumns = [
  ...commonColumns,
  {
    title: '执行时间',
    dataIndex: 'execTime',
    key: 'execTime',
    width: 180
  },
  {
    title: '状态',
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
    title: '操作',
    key: 'action',
    width: 180,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        {record.status === 'pending' && (
          <Button type="primary" size="small">执行</Button>
        )}
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    )
  }
]

export default function WriteOffTask() {
  const [activeTab, setActiveTab] = useState('realtime')
  const [filters, setFilters] = useState({
    name: '',
    status: ''
  })

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({ name: '', status: '' })
  }

  const tabItems = [
    {
      key: 'realtime',
      label: '实时生成',
      children: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>
              新建核销任务
            </Button>
          </div>
          <Table
            columns={realtimeColumns}
            dataSource={mockRealtimeData}
            scroll={{ x: 1200 }}
            pagination={{
              total: 5,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true
            }}
          />
        </div>
      )
    },
    {
      key: 'history',
      label: '历史订单',
      children: (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>
              新建核销任务
            </Button>
          </div>
          <Table
            columns={historyColumns}
            dataSource={mockHistoryData}
            scroll={{ x: 1200 }}
            pagination={{
              total: 8,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true
            }}
          />
        </div>
      )
    }
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>核销任务管理</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span>任务名称</span>
            <Input
              placeholder="请输入任务名称"
              style={{ width: 200 }}
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
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
              <Option value="enabled">启用</Option>
              <Option value="disabled">停用</Option>
              <Option value="pending">待执行</Option>
              <Option value="completed">已执行</Option>
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
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  )
}
