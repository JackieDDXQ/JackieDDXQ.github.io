import React, { useState } from 'react'
import { Table, Button, Space, Input, Select, Card, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const mockData = [
  {
    key: '1',
    id: 'ST001',
    name: '权益发放通知',
    supplier: '阿里云短信',
    isDefault: true,
    sendType: '权益发放',
    status: 'enabled',
    content: '尊敬的用户，您的权益【{权益名称}】已发放，请注意查收使用。',
    createTime: '2026-04-01 10:00:00',
    updateTime: '2026-04-20 15:30:00'
  },
  {
    key: '2',
    id: 'ST002',
    name: '核销成功通知',
    supplier: '腾讯云短信',
    isDefault: false,
    sendType: '核销通知',
    status: 'enabled',
    content: '尊敬的用户，您的权益【{权益名称}】已核销成功。',
    createTime: '2026-03-15 09:00:00',
    updateTime: '2026-04-10 14:00:00'
  },
  {
    key: '3',
    id: 'ST003',
    name: '过期提醒',
    supplier: '阿里云短信',
    isDefault: false,
    sendType: '到期提醒',
    status: 'disabled',
    content: '尊敬的用户，您的权益【{权益名称}】即将到期，请尽快使用。',
    createTime: '2026-02-20 11:00:00',
    updateTime: '2026-03-01 09:00:00'
  }
]

const statusMap = {
  enabled: { color: 'green', text: '启用' },
  disabled: { color: 'default', text: '停用' }
}

export default function SmsTemplate() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    supplier: '',
    sendType: ''
  })

  const columns = [
    {
      title: '模板ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '短信供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 150
    },
    {
      title: '是否渠道默认模板',
      dataIndex: 'isDefault',
      key: 'isDefault',
      width: 150,
      render: (isDefault) => isDefault ? <Tag color="blue">是</Tag> : '否'
    },
    {
      title: '短信下发类型',
      dataIndex: 'sendType',
      key: 'sendType',
      width: 120
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
      render: () => (
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
    setFilters({ name: '', status: '', supplier: '', sendType: '' })
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>全部模板</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Space>
            <span>模板名称</span>
            <Input
              placeholder="请输入模板名称"
              style={{ width: 200 }}
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Space>
          <Space>
            <span>模板ID</span>
            <Input
              placeholder="请输入模板ID"
              style={{ width: 200 }}
            />
          </Space>
          <Space>
            <span>是否渠道默认模板</span>
            <Select
              placeholder="请选择"
              style={{ width: 150 }}
            >
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
            </Select>
          </Space>
          <Space>
            <span>短信供应商</span>
            <Select
              placeholder="请选择"
              style={{ width: 150 }}
            >
              <Option value="阿里云短信">阿里云短信</Option>
              <Option value="腾讯云短信">腾讯云短信</Option>
            </Select>
          </Space>
          <Space>
            <span>短信下发类型</span>
            <Select
              placeholder="请选择"
              style={{ width: 150 }}
            >
              <Option value="权益发放">权益发放</Option>
              <Option value="核销通知">核销通知</Option>
              <Option value="到期提醒">到期提醒</Option>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/sms/template/create')}>
            新建短信模板
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          scroll={{ x: 1400 }}
          pagination={{
            total: 15,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>
    </div>
  )
}
