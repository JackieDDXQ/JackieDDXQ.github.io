import React from 'react'
import { Card, Result, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const pageNames = {
  '/mall/product': '商品管理',
  '/mall/order': '商城订单',
  '/application/list': '应用列表',
  '/system/user': '用户管理',
  '/system/role': '角色管理'
}

export default function Placeholder() {
  const navigate = useNavigate()
  const location = useLocation()
  const pageName = pageNames[location.pathname] || '该页面'

  return (
    <Card>
      <Result
        status="info"
        title={`${pageName}开发中`}
        subTitle="该页面正在紧张开发中，敬请期待！"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </Card>
  )
}
