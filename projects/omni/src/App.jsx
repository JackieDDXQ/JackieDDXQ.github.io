import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EquityInventory from './pages/Equity/Inventory'
import EquityInventoryDetail from './pages/Equity/InventoryDetail'
import InventoryCreate from './pages/Equity/InventoryCreate'
import EquityConfig from './pages/Equity/Config'
import EquityConfigDetail from './pages/Equity/ConfigDetail'
import ConfigCreate from './pages/Equity/ConfigCreate'
import OrderList from './pages/Order/List'
import OrderDetail from './pages/Order/Detail'
import SmsTemplate from './pages/Sms/Template'
import SmsCreate from './pages/Sms/Create'
import Placeholder from './pages/Placeholder'
import ApplicationList from './pages/Application/List'
import DictionarySetting from './pages/System/DictionarySetting'
import ExportSetting from './pages/System/ExportSetting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="equity/inventory" element={<EquityInventory />} />
        <Route path="equity/inventory/:id" element={<EquityInventoryDetail />} />
        <Route path="equity/inventory/create" element={<InventoryCreate />} />
        <Route path="equity/config" element={<EquityConfig />} />
        <Route path="equity/config/:id" element={<EquityConfigDetail />} />
        <Route path="equity/config/create" element={<ConfigCreate />} />
        <Route path="order/list" element={<OrderList />} />
        <Route path="order/detail/:id" element={<OrderDetail />} />
        <Route path="sms/template" element={<SmsTemplate />} />
        <Route path="sms/template/create" element={<SmsCreate />} />
        <Route path="application/list" element={<ApplicationList />} />
        <Route path="system/dictionary" element={<DictionarySetting />} />
        <Route path="system/export" element={<ExportSetting />} />
      </Route>
    </Routes>
  )
}

export default App
