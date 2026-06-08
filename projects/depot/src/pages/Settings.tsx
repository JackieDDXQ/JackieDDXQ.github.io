import { useState } from 'react'
import { Card, Input, Button, Switch, Space, InputNumber } from 'antd'
import { SaveOutlined, RestOutlined } from '@ant-design/icons'

export default function Settings() {
  const [settings, setSettings] = useState({
    systemName: '云仓',
    systemLogo: '',
    copyright: 'Copyright © 2024 云仓 All rights reserved.',
    maxFileSize: 10,
    maxUploadCount: 100,
    enableCaptcha: true,
    sessionTimeout: 30,
  })

  const handleSave = () => {
    console.log('Save settings:', settings)
  }

  return (
    <Card title="系统设置">
      <div style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>系统名称</span>
          <Input
            value={settings.systemName}
            onChange={(e) => setSettings({...settings, systemName: e.target.value})}
            style={{ width: 300 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>系统Logo</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 80, height: 80, border: '1px dashed #ccc', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#999' }}>上传Logo</span>
            </div>
            <Button type="primary">选择文件</Button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>版权信息</span>
          <Input
            value={settings.copyright}
            onChange={(e) => setSettings({...settings, copyright: e.target.value})}
            style={{ width: 400 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>最大文件大小</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InputNumber
              value={settings.maxFileSize}
              onChange={(value) => setSettings({...settings, maxFileSize: value as number})}
              style={{ width: 100 }}
              min={1}
              max={100}
            />
            <span>MB</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>单次最大上传数</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InputNumber
              value={settings.maxUploadCount}
              onChange={(value) => setSettings({...settings, maxUploadCount: value as number})}
              style={{ width: 100 }}
              min={1}
              max={1000}
            />
            <span>条</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>启用验证码</span>
          <Switch
            checked={settings.enableCaptcha}
            onChange={(checked) => setSettings({...settings, enableCaptcha: checked})}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 120 }}>会话超时时间</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <InputNumber
              value={settings.sessionTimeout}
              onChange={(value) => setSettings({...settings, sessionTimeout: value as number})}
              style={{ width: 100 }}
              min={5}
              max={120}
            />
            <span>分钟</span>
          </div>
        </div>

        <Space style={{ marginTop: 20 }}>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>保存设置</Button>
          <Button icon={<RestOutlined />}>重置</Button>
        </Space>
      </div>
    </Card>
  )
}
