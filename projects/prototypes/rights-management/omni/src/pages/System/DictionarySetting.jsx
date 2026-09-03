import React, { useState } from 'react'
import { Table, Button, Card, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons'

const mockDictTypes = [
  { key: '1', name: '号码控制', type: 'phone_control_type', status: 'active' },
  { key: '2', name: '计费周期', type: 'cost_period', status: 'active' },
  { key: '3', name: '上下线状态', type: 'active_status', status: 'active' },
  { key: '4', name: '生效时间', type: 'active_time_type', status: 'active' }
]

const mockDictData = [
  { key: '1', dictType: 'combo_order_status', sort: 0, keyValue: 0, label: '未处理' },
  { key: '2', dictType: 'combo_order_status', sort: 1, keyValue: 1, label: '办理中' },
  { key: '3', dictType: 'combo_order_status', sort: 2, keyValue: 2, label: '生效中' },
  { key: '4', dictType: 'combo_order_status', sort: 2, keyValue: 2, label: '生效中' },
  { key: '5', dictType: 'combo_order_status', sort: 3, keyValue: 3, label: '失败' },
  { key: '6', dictType: 'combo_order_status', sort: 3, keyValue: 3, label: '失败' },
  { key: '7', dictType: 'combo_order_status', sort: 4, keyValue: 4, label: '已到期' },
  { key: '8', dictType: 'combo_order_status', sort: 5, keyValue: 5, label: '已退订' },
  { key: '9', dictType: 'combo_order_status', sort: 5, keyValue: 5, label: '已退订' }
]

export default function DictionarySetting() {
  const [selectedDictType, setSelectedDictType] = useState(mockDictTypes[0])

  const typeColumns = [
    {
      title: '字典名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true
    },
    {
      title: '字典类型',
      dataIndex: 'type',
      key: 'type',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size="small" wrap>
          <Button 
            type="link" 
            size="small" 
            icon={<FolderOpenOutlined />}
            onClick={() => setSelectedDictType(record)}
          >
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ]

  const dataColumns = [
    {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType',
      width: 160,
      ellipsis: true
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80
    },
    {
      title: '字典键值',
      dataIndex: 'keyValue',
      key: 'keyValue',
      width: 100
    },
    {
      title: '字典标签',
      dataIndex: 'label',
      key: 'label',
      width: 120
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="small" wrap>
          <Button type="primary" size="small">新增</Button>
          <Button size="small" icon={<EditOutlined />}>编辑</Button>
          <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>字典设置</h2>
      
      <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 220px)' }}>
        <div style={{ flex: '0 0 520px', maxWidth: 520, height: '100%' }}>
          <Card style={{ height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 8px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 500 }}>字典类型</h3>
              <Button type="primary" size="small" icon={<PlusOutlined />}>新增字典类型</Button>
            </div>
            <div style={{ padding: '0 8px' }}>
              <Table
              columns={typeColumns}
              dataSource={mockDictTypes}
              pagination={false}
              bordered
              rowKey="key"
              onRow={(record) => ({
                onClick: () => setSelectedDictType(record),
                style: {
                  cursor: 'pointer',
                  backgroundColor: selectedDictType?.key === record.key ? '#e6f7ff' : 'inherit'
                }
              })}
            />
            </div>
          </Card>
        </div>

        <div style={{ flex: 1, height: '100%' }}>
          <Card style={{ height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 8px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 500 }}>字典数据</h3>
              <Button type="primary" size="small" icon={<PlusOutlined />}>新增字典</Button>
            </div>
            <div style={{ padding: '0 8px' }}>
              <Table
                columns={dataColumns}
                dataSource={mockDictData}
                pagination={{
                  total: mockDictData.length,
                  pageSize: 8,
                  showTotal: (total) => `共 ${total} 条`
                }}
                bordered
                rowKey="key"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}