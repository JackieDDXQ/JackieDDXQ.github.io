# 万象后台管理系统

这是一个基于 React + Vite + Ant Design 的万象后台管理系统前端展示原型。

## 技术栈

- React 18
- Vite 5
- Ant Design 5
- React Router 6
- ECharts 5

## 项目结构

```
omni/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # 主布局组件
│   ├── pages/
│   │   ├── Dashboard.jsx       # 首页数据看板
│   │   ├── Equity/             # 权益管理模块
│   │   │   ├── Inventory.jsx
│   │   │   ├── InventoryDetail.jsx
│   │   │   ├── Config.jsx
│   │   │   └── ConfigDetail.jsx
│   │   ├── Order/              # 订单管理模块
│   │   │   ├── List.jsx
│   │   │   └── Detail.jsx
│   │   ├── WriteOff/           # 核销管理模块
│   │   │   ├── Strategy.jsx
│   │   │   ├── Task.jsx
│   │   │   └── Callback.jsx
│   │   ├── Sms/                # 短信模板模块
│   │   │   └── Template.jsx
│   │   └── Placeholder.jsx
│   ├── App.jsx                 # 路由配置
│   ├── main.jsx                # 入口文件
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── 万象后台需求文档.md
```

## 功能模块

### 已实现
1. **首页 - 数据看板**：数据概览、快捷入口、库存提醒、销量排行、数据图表
2. **权益管理**：权益库存列表、详情，权益配置列表、详情
3. **订单管理**：订单列表、订单详情
4. **核销管理**：核销策略管理、核销任务管理、回传任务管理
5. **短信模板**：全部模板列表

### 页面路由

- `/` - 首页数据看板
- `/equity/inventory` - 权益库存列表
- `/equity/inventory/:id` - 权益库存详情
- `/equity/config` - 权益配置列表
- `/equity/config/:id` - 权益配置详情
- `/order/list` - 订单列表
- `/order/detail/:id` - 订单详情
- `/writeoff/strategy` - 核销策略管理
- `/writeoff/task` - 核销任务管理
- `/writeoff/callback` - 回传任务管理
- `/sms/template` - 全部短信模板

## 安装和运行

### 前置条件
- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
# 如果遇到 PowerShell 执行策略问题，先运行：
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 安装依赖
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

## 设计参考

本项目的设计参考了万象后台需求文档中的界面截图和功能描述，使用 Ant Design 组件库实现了现代化的后台管理界面。
