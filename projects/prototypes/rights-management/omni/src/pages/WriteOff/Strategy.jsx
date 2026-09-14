import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, DatePicker, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

const mockData = [
  {
    key: '1',
    id: 'WS001',
    name: '常规核销策略',
    writeOffTime: '08:00:00 - 23:00:00',
    startDate: '每月1日',
    targetRate: '99.00%',
    status: 'enabled',
    createTime: '2026-04-01 10:00:00',
    updateTime: '2026-04-20 15:30:00'
  },
  {
    key: '2',
    id: 'WS002',
    name: '促销期核销策略',
    writeOffTime: '00:00:00 - 23:59:59',
    startDate: '每月15日',
    targetRate: '95.00%',
    status: 'disabled',
    createTime: '2026-03-15 09:00:00',
    updateTime: '2026-04-10 14:00:00'
  }
]

const statusMap = {
  enabled: { color: 'green', text: '启用' },
  disabled: { color: 'default', text: '停用' }
}

export default function WriteOffStrategy() {
  const [filters, setFilters] = useState({
    name: '',
    status: ''
  })

  const columns = [
    {
      title: '策略ID',
      dataIndex: 'id',
      key: 'id',
      width: 120
    },
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '核销时段',
      dataIndex: 'writeOffTime',
      key: 'writeOffTime',
      width: 200
    },
    {
      title: '模型使用起始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150
    },
    {
      title: '30日核销率目标',
      dataIndex: 'targetRate',
      key: 'targetRate',
      width: 150
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
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      )
    }
  ]

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({ name: '', status: '' })
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>核销策略管理</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span>策略名称</span>
            <Input
              placeholder="请输入策略名称"
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
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />}>
            新建核销策略
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 1400 }}
          pagination={{
            total: 10,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>
    </div>
  )
}
