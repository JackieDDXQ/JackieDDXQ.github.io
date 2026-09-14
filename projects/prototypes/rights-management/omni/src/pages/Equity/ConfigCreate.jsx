import React from 'react'
import { Card, Form, Input, Select, Radio, Button, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

export default function ConfigCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values)
      navigate('/equity/config')
    })
  }

  const handleCancel = () => {
    navigate('/equity/config')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>新建权益配置</h2>

      <Card>
        <Form form={form} layout="vertical">
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>基本信息</h3>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label={
                    <span>权益配置名称 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请输入权益配置名称' }]}
                >
                  <Input placeholder="请输入权益配置名称" />
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
                  <Radio.Group>
                    <Radio value="online">上线</Radio>
                    <Radio value="offline">下线</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>库存配置</h3>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="isInventory"
                  label={
                    <span>是否核销库存 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否核销库存' }]}
                >
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isPriceAdjust"
                  label={
                    <span>是否价格调整 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否价格调整' }]}
                >
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="isManualReceive"
                  label={
                    <span>是否手动领取 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择是否手动领取' }]}
                >
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 16, color: '#1f1f1f', fontSize: 16, fontWeight: 600 }}>其他配置</h3>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="expireType"
                  label={
                    <span>核销截止日期 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择核销截止日期类型' }]}
                >
                  <Radio.Group>
                    <Radio value="currentMonth">当月有效</Radio>
                    <Radio value="custom">自定义截止时间</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isPhysical"
                  label={
                    <span>码券介质 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择码券介质' }]}
                >
                  <Radio.Group>
                    <Radio value={true}>存在</Radio>
                    <Radio value={false}>不存在</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="showType"
                  label={
                    <span>券码展示方式 <span style={{ color: '#ff4d4f' }}>*</span></span>
                  }
                  rules={[{ required: true, message: '请选择券码展示方式' }]}
                >
                  <Select placeholder="请选择券码展示方式">
                    <Option value="show">展示</Option>
                    <Option value="hide">不展示</Option>
                  </Select>
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="exchangeChannel"
                  label="兑换渠道链接"
                >
                  <Input placeholder="请输入兑换渠道链接" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="exchangeInstructions"
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
                  <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{ marginRight: '8px' }}>Normal</span>
                      <span style={{ marginRight: '8px', fontSize: '16px' }}>B</span>
                      <span style={{ marginRight: '8px', fontSize: '16px', fontStyle: 'italic' }}>I</span>
                      <span style={{ marginRight: '8px', textDecoration: 'underline' }}>U</span>
                      <span style={{ marginRight: '8px' }}>Normal</span>
                      <span style={{ marginRight: '8px' }}>Sans Serif</span>
                      <span style={{ marginRight: '8px' }}>△</span>
                      <span style={{ marginRight: '8px' }}>▲</span>
                      <span style={{ marginRight: '8px' }}>≡</span>
                      <span style={{ marginRight: '8px' }}>≡</span>
                      <span style={{ marginRight: '8px' }}>≡</span>
                      <span style={{ marginRight: '8px' }}>↔</span>
                      <span style={{ marginRight: '8px' }}>↕</span>
                      <span style={{ marginRight: '8px' }}>×</span>
                      <span style={{ marginRight: '8px' }}>⊗</span>
                    </div>
                    <textarea
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        border: 'none', 
                        resize: 'none',
                        outline: 'none',
                        padding: '8px'
                      }}
                      placeholder="请输入"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
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
