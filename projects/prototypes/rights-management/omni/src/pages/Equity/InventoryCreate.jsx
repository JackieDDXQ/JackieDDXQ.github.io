import React from 'react'
import { Card, Form, Input, Select, Radio, Button, Row, Col, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

export default function InventoryCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values)
      navigate('/equity/inventory')
    })
  }

  const handleCancel = () => {
    navigate('/equity/inventory')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>新建权益库存</h2>

      <Card>
        <Form form={form} layout="vertical">
          <div>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>基本信息</h3>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label={
                    <span>权益库存名称 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请输入权益库存名称' }]}
                >
                  <Input placeholder="请输入权益库存名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="code"
                  label="权益编码"
                >
                  <Input placeholder="请输入权益编码" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="status"
                  label={
                    <span>状态 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择状态' }]}
                >
                  <Radio.Group defaultValue="online">
                    <Radio value="online">上线</Radio>
                    <Radio value="offline">下线</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Divider style={{ margin: '24px 0' }} />

          <div>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>库存配置</h3>
            
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="isInventory"
                  label={
                    <span>是否核销库存 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否核销库存' }]}
                >
                  <Radio.Group defaultValue={true}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="isPriceAdjust"
                  label={
                    <span>是否价格调整 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否价格调整' }]}
                >
                  <Radio.Group defaultValue={true}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="isCouponAvailable"
                  label={
                    <span>是否码券可领 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否码券可领' }]}
                >
                  <Radio.Group defaultValue={false}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Divider style={{ margin: '24px 0' }} />

          <div>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>其他配置</h3>
            
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="expireType"
                  label={
                    <span>核销截止日期 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择核销截止日期类型' }]}
                >
                  <Radio.Group defaultValue="relative">
                    <Radio value="currentMonth">当月有效</Radio>
                    <Radio value="fixed">固定截止时间</Radio>
                    <Radio value="relative">相对截止时间</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="expireType2"
                  label={
                    <span>核销截止日期 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择核销截止日期类型' }]}
                >
                  <Radio.Group defaultValue="relative">
                    <Radio value="currentMonth">当月有效</Radio>
                    <Radio value="fixed">固定截止时间</Radio>
                    <Radio value="relative">相对截止时间</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="isPhysical"
                  label={
                    <span>码券介质 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择码券介质' }]}
                >
                  <Radio.Group defaultValue={false}>
                    <Radio value={true}>存在</Radio>
                    <Radio value={false}>不存在</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="showType"
                  label={<span>券码展示方式 <span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请选择券码展示方式' }]}
                >
                  <Select placeholder="请选择券码展示方式" style={{ width: 240 }}>
                    <Option value="show">展示</Option>
                    <Option value="hide">不展示</Option>
                  </Select>
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="exchangeUrl"
                  label="兑换页面链接"
                >
                  <Input placeholder="请输入兑换页面链接" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="exchangeUrl2"
                  label="兑换页面链接"
                >
                  <Input placeholder="请输入兑换页面链接" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="描述"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="请输入描述"
                  />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="usageInstructions"
                  label="使用说明"
                >
                  <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666' }}>Normal</span>
                      <span style={{ marginRight: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>B</span>
                      <span style={{ marginRight: '12px', fontSize: '14px', fontStyle: 'italic', cursor: 'pointer' }}>I</span>
                      <span style={{ marginRight: '12px', textDecoration: 'underline', fontSize: '14px', cursor: 'pointer' }}>U</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666' }}>Normal</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666' }}>Sans Serif</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>△</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>▲</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>≡</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>≡</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>≡</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>↔</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>↕</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>×</span>
                      <span style={{ marginRight: '12px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>⊗</span>
                    </div>
                    <textarea
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        border: 'none', 
                        resize: 'none',
                        outline: 'none',
                        padding: '12px'
                      }}
                      placeholder="请输入"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <Button type="primary" style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }} onClick={handleSubmit}>
              保存
            </Button>
            <Button onClick={handleCancel}>
              取消
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}