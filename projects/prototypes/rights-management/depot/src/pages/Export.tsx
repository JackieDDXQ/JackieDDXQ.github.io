import { useState } from 'react'
import { Card, Select, Button, Table, Checkbox, Tag, DatePicker } from 'antd'
import { SearchOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

const exportData = [
  { id: '1', name: '云仓订单导出-20260422-100151', createTime: '2026-04-22 10:01:51', updateTime: '2026-04-22 10:02:01', startTime: '2026-04-22 10:02:00', endTime: '2026-04-22 10:02:01', status: 'success', operator: '张三' },
  { id: '2', name: '云仓订单导出-20260422-100151', createTime: '2026-04-22 10:01:51', updateTime: '2026-04-22 10:02:01', startTime: '2026-04-22 10:02:00', endTime: '2026-04-22 10:02:01', status: 'success', operator: '李四' },
  { id: '3', name: '云仓订单导出-20260402-165319', createTime: '2026-04-02 16:53:20', updateTime: '2026-04-02 16:53:30', startTime: '2026-04-02 16:53:29', endTime: '2026-04-02 16:53:31', status: 'success', operator: '王五' },
  { id: '4', name: '云仓订单导出-20260401-173000', createTime: '2026-04-01 17:30:01', updateTime: '2026-04-01 17:30:03', startTime: '2026-04-01 17:30:03', endTime: '2026-04-01 17:30:04', status: 'success', operator: '赵六' },
  { id: '5', name: '云仓订单导出-20260401-172734', createTime: '2026-04-01 17:27:35', updateTime: '2026-04-01 17:27:42', startTime: '2026-04-01 17:27:41', endTime: '2026-04-01 17:27:43', status: 'success', operator: '钱七' },
  { id: '6', name: '云仓订单导出-20260401-172005', createTime: '2026-04-01 17:20:06', updateTime: '2026-04-01 17:20:11', startTime: '2026-04-01 17:20:09', endTime: '2026-04-01 17:20:11', status: 'success', operator: '孙八' },
  { id: '7', name: '云仓订单导出-20260401-170816', createTime: '2026-04-01 17:08:17', updateTime: '2026-04-01 17:08:29', startTime: '2026-04-01 17:08:27', endTime: '2026-04-01 17:08:29', status: 'success', operator: '周九' },
  { id: '8', name: '云仓订单导出-20260401-162646', createTime: '2026-04-01 16:26:47', updateTime: '2026-04-01 16:26:56', startTime: '2026-04-01 16:26:55', endTime: '2026-04-01 16:26:57', status: 'success', operator: '吴十' },
  { id: '9', name: '云仓订单导出-20260401-160449', createTime: '2026-04-01 16:04:51', updateTime: '2026-04-01 16:04:54', startTime: '2026-04-01 16:04:53', endTime: '2026-04-01 16:04:55', status: 'success', operator: '郑十一' },
  { id: '10', name: '云仓订单导出-20260401-143603', createTime: '2026-04-01 14:36:05', updateTime: '2026-04-01 14:36:11', startTime: '2026-04-01 14:36:10', endTime: '2026-04-01 14:36:12', status: 'success', operator: '王十二' },
]

const columns = [
  { title: '导出名称', dataIndex: 'name', key: 'name' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (_status: string) => (
      <Tag color="success">成功</Tag>
    ),
  },
  { title: '操作人', dataIndex: 'operator', key: 'operator' },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="primary" size="small" icon={<DownloadOutlined />}>下载</Button>
        <Button size="small" icon={<FileTextOutlined />}>查看详情</Button>
      </div>
    ),
  },
]

export default function Export() {
  const [onlySelf, setOnlySelf] = useState(false)

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <span style={{ marginRight: 8 }}>状态:</span>
          <Select placeholder="选择状态" style={{ width: 150 }}>
            <Option value="">全部</Option>
            <Option value="success">成功</Option>
            <Option value="failed">失败</Option>
            <Option value="processing">处理中</Option>
          </Select>

          <span style={{ marginLeft: 16, marginRight: 8 }}>创建时间范围:</span>
          <RangePicker style={{ width: 300 }} />

          <Checkbox checked={onlySelf} onChange={(e) => setOnlySelf(e.target.checked)}>仅看自己</Checkbox>

          <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
          <Button>重置</Button>
        </div>

        <Table
          dataSource={exportData}
          columns={columns}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `从第 0 项开始,共 ${total} 项`
          }}
          bordered
        />

        <div style={{ textAlign: 'center', marginTop: 20, color: '#999', fontSize: 12 }}>
          Copyright © 2024 云仓 All rights reserved.
        </div>
      </Card>
    </div>
  )
}
