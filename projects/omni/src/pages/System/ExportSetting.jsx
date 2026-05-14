import React, { useState } from 'react'
import { Table, Button, Card, Space, Input, Select, Tag, Checkbox } from 'antd'
import { SearchOutlined, ReloadOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons'

const { Option } = Select

const mockData = [
  { key: '1', name: '示例数据导出-001', createTime: '2026-05-07 10:00:00', updateTime: '2026-05-07 10:05:00', startTime: '2026-05-07 10:01:00', endTime: '2026-05-07 10:04:00', status: 'success', operator: '管理员' },
  { key: '2', name: '示例数据导出-002', createTime: '2026-05-06 11:00:00', updateTime: '2026-05-06 11:03:00', startTime: '2026-05-06 11:01:00', endTime: '2026-05-06 11:02:00', status: 'success', operator: '管理员' },
  { key: '3', name: '示例数据导出-003', createTime: '2026-05-05 14:00:00', updateTime: '2026-05-05 14:06:00', startTime: '2026-05-05 14:02:00', endTime: '2026-05-05 14:05:00', status: 'success', operator: '管理员' },
  { key: '4', name: '示例数据导出-004', createTime: '2026-05-04 09:00:00', updateTime: '2026-05-04 09:04:00', startTime: '2026-05-04 09:01:00', endTime: '2026-05-04 09:03:00', status: 'success', operator: '管理员' },
  { key: '5', name: '示例数据导出-005', createTime: '2026-05-03 15:00:00', updateTime: '2026-05-03 15:05:00', startTime: '2026-05-03 15:02:00', endTime: '2026-05-03 15:04:00', status: 'success', operator: '管理员' },
  { key: '6', name: '示例数据导出-006', createTime: '2026-05-02 10:00:00', updateTime: '2026-05-02 10:03:00', startTime: '2026-05-02 10:01:00', endTime: '2026-05-02 10:02:00', status: 'success', operator: '管理员' },
  { key: '7', name: '示例数据导出-007', createTime: '2026-05-01 16:00:00', updateTime: '2026-05-01 16:04:00', startTime: '2026-05-01 16:01:00', endTime: '2026-05-01 16:03:00', status: 'success', operator: '管理员' },
  { key: '8', name: '示例数据导出-008', createTime: '2026-04-30 08:00:00', updateTime: '2026-04-30 08:05:00', startTime: '2026-04-30 08:02:00', endTime: '2026-04-30 08:04:00', status: 'success', operator: '管理员' },
  { key: '9', name: '示例数据导出-009', createTime: '2026-04-29 13:00:00', updateTime: '2026-04-29 13:03:00', startTime: '2026-04-29 13:01:00', endTime: '2026-04-29 13:02:00', status: 'success', operator: '管理员' },
  { key: '10', name: '示例数据导出-010', createTime: '2026-04-28 11:00:00', updateTime: '2026-04-28 11:04:00', startTime: '2026-04-28 11:01:00', endTime: '2026-04-28 11:03:00', status: 'success', operator: '管理员' }
]

export default function ExportSetting() {
  const [filters, setFilters] = useState({
    status: '',
    startTime: '',
    endTime: '',
    onlyMine: false
  })

  const columns = [
    {
      title: '导出名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true
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
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status) => (
        <Tag color={status === 'success' ? 'success' : 'default'}>
          {status === 'success' ? '成功' : '失败'}
        </Tag>
      )
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: () => (
        <Space size="small" wrap>
          <Button type="primary" size="small" icon={<DownloadOutlined />}>下载</Button>
          <Button size="small" icon={<FileTextOutlined />}>查看详情</Button>
        </Space>
      )
    }
  ]

  const handleSearch = () => {
    console.log('Searching with filters:', filters)
  }

  const handleReset = () => {
    setFilters({ status: '', startTime: '', endTime: '', onlyMine: false })
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>导出管理</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span style={{ width: 60, textAlign: 'right', marginRight: 8 }}>状态</span>
            <Select
              placeholder="选择状态"
              style={{ width: 180 }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="success">成功</Option>
              <Option value="failed">失败</Option>
            </Select>
          </Space>
          <Space>
            <span style={{ width: 90, textAlign: 'right', marginRight: 8 }}>创建时间范围</span>
            <Input
              placeholder="开始日期时间"
              style={{ width: 180 }}
              value={filters.startTime}
              onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
            />
            <span style={{ margin: '0 8px' }}>→</span>
            <Input
              placeholder="结束日期时间"
              style={{ width: 180 }}
              value={filters.endTime}
              onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
            />
          </Space>
          <Checkbox 
            checked={filters.onlyMine}
            onChange={(e) => setFilters({ ...filters, onlyMine: e.target.checked })}
          >
            仅看自己
          </Checkbox>
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

      <div style={{ height: 'calc(100vh - 300px)' }}>
        <Card style={{ height: '100%', overflowY: 'auto' }}>
          <div style={{ padding: '0 8px' }}>
            <Table
              columns={columns}
              dataSource={mockData}
              pagination={{
                total: 59,
                pageSize: 8,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `从第 0 项开始，共 ${total} 项`
              }}
              bordered
            />
          </div>
        </Card>
      </div>
    </div>
  )
}