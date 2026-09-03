import React, { useState } from 'react'
import { Form, Input, Select, Card, Button, Radio, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

export default function SmsCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isDefault, setIsDefault] = useState('否')
  const [isEnabled, setIsEnabled] = useState('否')

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values)
      navigate('/sms/template')
    }).catch(info => {
      console.log('Validation failed:', info)
    })
  }

  const handleCancel = () => {
    navigate('/sms/template')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>新建短信模板</h2>

      <Card>
        <Form form={form} layout="vertical" style={{ maxWidth: 800 }}>
          <Form.Item
            label="新建短信名称"
            name="smsName"
            rules={[{ required: true, message: '请输入新建短信名称' }]}
          >
            <Input placeholder="请输入新建短信名称" />
          </Form.Item>

          <Form.Item
            label="模板名称"
            name="templateName"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input placeholder="请输入模板名称" />
          </Form.Item>

          <Form.Item
            label="发送策略"
            name="sendStrategy"
          >
            <Select placeholder="请选择发送策略" style={{ width: '100%' }}>
              <Option value="immediate">立即发送</Option>
              <Option value="delayed">延迟发送</Option>
              <Option value="scheduled">定时发送</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="重试策略"
            name="retryStrategy"
          >
            <Select placeholder="请选择重试策略" style={{ width: '100%' }}>
              <Option value="none">不重试</Option>
              <Option value="once">重试一次</Option>
              <Option value="multiple">多次重试</Option>
            </Select>
          </Form.Item>

          <Form.Item label="是否默认模板">
            <Radio.Group value={isDefault} onChange={(e) => setIsDefault(e.target.value)}>
              <Radio value="是">是</Radio>
              <Radio value="否">否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="运营商"
            name="operator"
          >
            <Select placeholder="请选择运营商" style={{ width: '100%' }}>
              <Option value="cmcc">中国移动</Option>
              <Option value="cucc">中国联通</Option>
              <Option value="ctcc">中国电信</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="短信模板变量"
            name="templateVariables"
          >
            <Input.TextArea
              placeholder='请输入短信模板变量，格式示例：{"tmCode":"SMS_308800102","code":"number"}'
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="时间类型"
            name="timeType"
          >
            <Select placeholder="请选择时间类型" style={{ width: '100%' }}>
              <Option value="default">默认</Option>
              <Option value="custom">自定义</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="模板签名"
            name="templateSignature"
          >
            <Input placeholder="请输入模板签名" />
          </Form.Item>

          <Form.Item
            label="发送模板内容"
            name="content"
            rules={[{ required: true, message: '请输入发送模板内容' }]}
          >
            <Input.TextArea
              placeholder="请输入发送模板内容"
              rows={6}
            />
          </Form.Item>

          <Form.Item label="是否启用">
            <Radio.Group value={isEnabled} onChange={(e) => setIsEnabled(e.target.value)}>
              <Radio value="是">是</Radio>
              <Radio value="否">否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
          >
            <Input.TextArea
              placeholder="请输入备注"
              rows={3}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 40 }}>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" onClick={handleSubmit} style={{ backgroundColor: '#00b42a', borderColor: '#00b42a' }}>
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
