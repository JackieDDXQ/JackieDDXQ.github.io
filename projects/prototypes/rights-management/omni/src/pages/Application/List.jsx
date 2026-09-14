import React, { useState } from 'react'
import { Table, Button, Space, Input, Card, Tag } from 'antd'
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'

const mockData = [
  {
    key: '1',
    appId: 'APP202601290001',
    appName: '示例应用A',
    description: '',
    status: 'enabled',
    validUntil: '2031-01-31 09:42:47',
    createTime: '2026-01-29 01:42:52'
  },
  {
    key: '2',
    appId: 'APP202601210001',
    appName: '示例应用B',
    description: '',
    status: 'enabled',
    validUntil: '2030-01-31 14:16:46',
    createTime: '2026-01-21 06:16:49'
  },
  {
    key: '3',
    appId: 'APP202505090001',
    appName: '示例应用C',
    description: '',
    status: 'enabled',
    validUntil: '2029-05-31 14:23:44',
    createTime: '2025-05-09 06:23:49'
  },
  {
    key: '4',
    appId: 'APP202504150001',
    appName: '示例应用D',
    description: '',
    status: 'enabled',
    validUntil: '2029-04-30 15:39:08',
    createTime: '2025-04-15 07:39:27'
  },
  {
    key: '5',
    appId: 'APP202502240001',
    appName: '示例应用E',
    description: '示例应用E对接万象的开放接口',
    status: 'enabled',
    validUntil: '2035-02-28 10:09:02',
    createTime: '2025-02-24 02:09:50'
  },
  {
    key: '6',
    appId: 'APP202502240002',
    appName: '示例应用F',
    description: '示例应用F对接万象的开放接口',
    status: 'enabled',
    validUntil: '2035-02-28 10:09:02',
    createTime: '2025-02-24 02:09:50'
  },
  {
    key: '7',
    appId: 'APP202502070001',
    appName: '示例应用G',
    description: '测试与万象接口对接交互的应用账户',
    status: 'enabled',
    validUntil: '2038-02-28 09:55:01',
    createTime: '2025-02-07 01:55:12'
  },
  {
    key: '8',
    appId: 'APP202502070002',
    appName: '示例应用H',
    description: '',
    status: 'enabled',
    validUntil: '2044-03-31 09:38:31',
    createTime: '2025-02-07 01:38:46'
  }
]

const statusMap = {
  enabled: { color: 'green', text: '启用' },
  disabled: { color: 'default', text: '停用' }
}

export default function ApplicationList() {
  const [filters, setFilters] = useState({
    appName: ''
  })

  const columns = [
    {
      title: 'AppId',
      dataIndex: 'appId',
      key: 'appId',
      width: 200
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
      width: 150
    },
    {
      title: '应用描述',
      dataIndex: 'description',
      key: 'description',
      width: 300
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
      title: '有效期',
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: 180
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">编辑</Button>
          <Button type="primary" size="small" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
            下载
          </Button>
        </Space>
      )
    }
  ]

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({ appName: '' })
  }

  const handleCreate = () => {
    console.log('Create new application')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>应用列表</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>应用名称</span>
            <Input
              placeholder="请输入应用名称"
              style={{ width: 250 }}
              value={filters.appName}
              onChange={(e) => setFilters({ ...filters, appName: e.target.value })}
            />
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }}>
            新建
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 1200 }}
          pagination={{
            total: 7,
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
