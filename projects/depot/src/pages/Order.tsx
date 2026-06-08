import { useState } from 'react'
import { Card, Input, Select, Button, Table, Tag, DatePicker } from 'antd'
import { SearchOutlined, RestOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

interface Order {
  id: string
  externalOrderId: string
  goodsType: string
  goodsName: string
  specName: string
  supplier: string
  phone: string
  rechargeAccount: string
  orderStatus: string
  processStatus: string
  createTime: string
  writeOffStatus: string
}

const orderData: Order[] = [
  { id: '2052278206474231808', externalOrderId: '采:2052278203644301314供:16l5rwqtoozts', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫购物券10元', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278206805581824', externalOrderId: '采:2052278203644301315供:15re8kn8d3gpf', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫购物券10元', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278206526881792', externalOrderId: '采:2052278203644301319供:16kx443w28q9u', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫超市蒙牛99-20 30天', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278207090794496', externalOrderId: '采:2052278203644301317供:16kjllfeflvjs', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫超市蒙牛199-40 30天', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278206887591936', externalOrderId: '采:2052278203644301320供:15rera4g72309', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫超市蒙牛99-20 30天', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278207428657152', externalOrderId: '采:2052278203644301316供:16knhuqvdqxqz', goodsType: '直充', goodsName: '天猫满减券', specName: '天猫超市蒙牛199-40 30天', supplier: '淘宝', phone: '159363371050536960', rechargeAccount: '13564247308', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:49', writeOffStatus: '未核销' },
  { id: '2052278015159443456', externalOrderId: '采:2052278012288484964供:1259157676337041409', goodsType: '直充', goodsName: '霸王茶姬满减券', specName: '霸王茶姬19.9元满减券', supplier: '霸王茶姬', phone: '119543044738772992', rechargeAccount: '15721419602', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:43:03', writeOffStatus: '未核销' },
  { id: '205227746772443136', externalOrderId: '采:205227743067975680供:1259157412603330560', goodsType: '直充', goodsName: '霸王茶姬满减券', specName: '霸王茶姬15元满减券', supplier: '霸王茶姬', phone: '119543044738772992', rechargeAccount: '15162296602', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:41:59', writeOffStatus: '未核销' },
  { id: '2052277448251244544', externalOrderId: '采:205227744535969536供:1259157113935470592', goodsType: '直充', goodsName: '霸王茶姬满减券', specName: '霸王茶姬15元满减券', supplier: '霸王茶姬', phone: '119543044738772992', rechargeAccount: '18982173312', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:40:48', writeOffStatus: '已核销' },
  { id: '2052277414006628352', externalOrderId: '采:2052277411201863680供:9567548094122112', goodsType: '直充', goodsName: '优酷VIP会员月卡', specName: '优酷-优酷VIP会员月卡', supplier: '优酷信息技术（北京）有限公司', phone: '91272705494925312', rechargeAccount: '13452612277', orderStatus: '正常订单', processStatus: '成功', createTime: '2026-05-07 14:40:40', writeOffStatus: '未核销' },
]

export default function Order() {
  const [searchParams, setSearchParams] = useState({
    orderMonth: '2026年5月',
    orderId: '',
    externalOrderId: '',
    orderStatus: '',
    rechargeAccount: '',
    phone: '',
    goodsId: '',
    specId: '',
    supplierId: '',
    writeOffStatus: '',
    processStatus: '',
  })

  const columns = [
    { title: '订单号', dataIndex: 'id', key: 'id', ellipsis: true },
    { title: '外部订单号', dataIndex: 'externalOrderId', key: 'externalOrderId', ellipsis: true },
    { 
      title: '商品类型', 
      dataIndex: 'goodsType', 
      key: 'goodsType', 
      width: 80,
      render: (type: string) => <Tag color="green">{type}</Tag>
    },
    { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', ellipsis: true },
    { title: '规格名称', dataIndex: 'specName', key: 'specName', ellipsis: true },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', ellipsis: true },
    { title: '手机号', dataIndex: 'phone', key: 'phone', width: 130 },
    { title: '充值账号', dataIndex: 'rechargeAccount', key: 'rechargeAccount', width: 120 },
    { title: '订单状态', dataIndex: 'orderStatus', key: 'orderStatus', width: 100 },
    { title: '处理状态', dataIndex: 'processStatus', key: 'processStatus', width: 80 },
    { title: '订单时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
    { title: '核销状态', dataIndex: 'writeOffStatus', key: 'writeOffStatus', width: 90 },
  ]

  return (
    <Card>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>订单月份</span>
          <Select placeholder="请选择订单月份" style={{ width: 150 }} value={searchParams.orderMonth} onChange={(value) => setSearchParams({...searchParams, orderMonth: value})}>
            <Option value="2026年5月">2026年5月</Option>
            <Option value="2026年4月">2026年4月</Option>
            <Option value="2026年3月">2026年3月</Option>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>订单号</span>
          <Input placeholder="请输入订单号" style={{ width: 200 }} value={searchParams.orderId} onChange={(e) => setSearchParams({...searchParams, orderId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>外部订单号</span>
          <Input placeholder="请输入外部订单号" style={{ width: 200 }} value={searchParams.externalOrderId} onChange={(e) => setSearchParams({...searchParams, externalOrderId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>订单状态</span>
          <Select placeholder="请选择订单状态" style={{ width: 150 }} value={searchParams.orderStatus} onChange={(value) => setSearchParams({...searchParams, orderStatus: value})}>
            <Option value="">全部</Option>
            <Option value="normal">正常订单</Option>
            <Option value="abnormal">异常订单</Option>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>充值账号</span>
          <Input placeholder="请输入充值账号" style={{ width: 150 }} value={searchParams.rechargeAccount} onChange={(e) => setSearchParams({...searchParams, rechargeAccount: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>手机号</span>
          <Input placeholder="请输入手机号" style={{ width: 150 }} value={searchParams.phone} onChange={(e) => setSearchParams({...searchParams, phone: e.target.value})} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>商品ID</span>
          <Input placeholder="请输入商品ID" style={{ width: 150 }} value={searchParams.goodsId} onChange={(e) => setSearchParams({...searchParams, goodsId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>规格ID</span>
          <Input placeholder="请输入规格ID" style={{ width: 150 }} value={searchParams.specId} onChange={(e) => setSearchParams({...searchParams, specId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>供应商ID</span>
          <Input placeholder="请输入供应商ID" style={{ width: 150 }} value={searchParams.supplierId} onChange={(e) => setSearchParams({...searchParams, supplierId: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>核销状态</span>
          <Select placeholder="请选择核销状态" style={{ width: 120 }} value={searchParams.writeOffStatus} onChange={(value) => setSearchParams({...searchParams, writeOffStatus: value})}>
            <Option value="">全部</Option>
            <Option value="written">已核销</Option>
            <Option value="unwritten">未核销</Option>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>处理状态</span>
          <Select placeholder="请选择处理状态" style={{ width: 120 }} value={searchParams.processStatus} onChange={(value) => setSearchParams({...searchParams, processStatus: value})}>
            <Option value="">全部</Option>
            <Option value="success">成功</Option>
            <Option value="failed">失败</Option>
            <Option value="pending">处理中</Option>
          </Select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>创建时间</span>
          <RangePicker style={{ width: 300 }} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
          <Button icon={<RestOutlined />}>重置</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>导出订单</Button>
      </div>

      <Table
        columns={columns}
        dataSource={orderData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `从第 0 项开始, 共 ${total} 项`,
        }}
        rowKey="id"
        scroll={{ x: 1500 }}
      />
    </Card>
  )
}