# 运营商权益管理体系原型清单

## 1. 统一入口

- 案例页：`/projects/rights-management.html`
- 原型目录：`/projects/prototypes/rights-management/index.html`
- 目录覆盖：云仓 13 个页面、万象 17 个页面、灵霄 29 个页面，共 59 个可达页面。
- 动态详情与编辑路由在目录中使用 `1` 作为演示参数；该参数只用于打开原型状态，不代表真实业务记录。

## 2. 系统与公开入口

| 层级 | 系统 | 作用 | 技术栈 | 规范入口 | 旧地址 |
| --- | --- | --- | --- | --- | --- |
| Supply / 01 | 云仓 | 将供应商产品标准化为商品与规格 | React + TypeScript + Ant Design | `/projects/prototypes/rights-management/depot/dist/index.html` | `/projects/depot/dist/index.html` |
| Service / 02 | 万象 | 管理权益库存、配置、发放与核销 | React + Ant Design | `/projects/prototypes/rights-management/omni/dist/index.html` | `/projects/omni/dist/index.html` |
| Growth / 03 | 灵霄 | 管理套餐策划、推广渠道与办理策略 | Vue + Element Plus | `/projects/prototypes/rights-management/cel/frontend/dist/index.html` | `/projects/cel/frontend/dist/index.html` |

旧地址由 `scripts/generate-legacy-redirects.mjs` 生成，只作为兼容跳转，不应继续编辑。

## 3. 页面与路由

### 云仓

| 业务域 | 页面 | Hash 路由 |
| --- | --- | --- |
| 工作台 | 供给工作台 | `#/` |
| 供给管理 | 供应商、供应商产品 | `#/supplier`、`#/product` |
| 商品中心 | 品牌、门店、标准商品、商品规格、分类 | `#/brand`、`#/store`、`#/goods`、`#/spec`、`#/category` |
| 履约 | 履约订单 | `#/order` |
| 平台 | 应用管理、系统概览、字典设置、导出管理 | `#/application`、`#/settings`、`#/dictionary`、`#/export` |

### 万象

| 业务域 | 页面 | Hash 路由 |
| --- | --- | --- |
| 工作台 | 权益服务工作台 | `#/` |
| 权益库存 | 列表、新建、详情 | `#/equity/inventory`、`#/equity/inventory/create`、`#/equity/inventory/:id` |
| 权益配置 | 列表、新建、详情 | `#/equity/config`、`#/equity/config/create`、`#/equity/config/:id` |
| 发放 | 订单列表、订单详情 | `#/order/list`、`#/order/detail/:id` |
| 核销 | 核销策略、核销任务、结果回传 | `#/writeoff/strategy`、`#/writeoff/task`、`#/writeoff/callback` |
| 消息 | 短信模板、新建模板 | `#/sms/template`、`#/sms/template/create` |
| 平台 | 应用列表、字典设置、导出设置 | `#/application/list`、`#/system/dictionary`、`#/system/export` |

核销相关页面原先已有源码但没有注册路由和菜单；本轮已补齐，使其成为可验证的原型入口。

### 灵霄

| 业务域 | 页面 | Hash 路由 |
| --- | --- | --- |
| 工作台 | 增长工作台 | `#/dashboard` |
| 策划 | 列表、新建、编辑 | `#/plan`、`#/plan/create`、`#/plan/edit/:id` |
| 套餐模板 | 列表、新建、编辑 | `#/template`、`#/template/create`、`#/template/edit/:id` |
| 渠道 | 列表、新建、编辑 | `#/channel`、`#/channel/create`、`#/channel/edit/:id` |
| 推广产品 | 列表、新建、编辑 | `#/product`、`#/product/create`、`#/product/edit/:id` |
| 限办策略 | 列表、新建、编辑 | `#/quota`、`#/quota/create`、`#/quota/edit/:id` |
| 黑名单 | 列表、新建、编辑、号码明细 | `#/blacklist`、`#/blacklist/create`、`#/blacklist/edit/:id`、`#/blacklist/phones/:id` |
| 订单 | 列表、详情 | `#/order`、`#/order/detail/:id` |
| 会员 | 列表、详情 | `#/member`、`#/member/detail/:id` |
| 应用 | 应用列表、应用配置 | `#/app/list`、`#/app/config` |
| 系统 | 用户、角色、操作日志 | `#/system/user`、`#/system/role`、`#/system/log` |

会员、应用配置与系统管理页面原先有路由但没有菜单入口；本轮已纳入统一导航。

## 4. 统一 UI 规则

三个应用保留各自框架，不做无必要的技术栈迁移。共享样式位于 `projects/prototypes/rights-management/shared/ui.css`，统一以下模式：

- 232px 深色侧栏、76px 收起态、64px 顶栏与 24px 内容区间距。
- 主色 `#2457e6`，语义色只表达成功、警告、失败和信息状态。
- 白色内容表面、浅灰画布、低对比边框，卡片与表格使用同一圆角和阴影层级。
- 系统名称固定为“云仓 / 万象 / 灵霄”，并以 `Supply / Service / Growth` 标识业务边界。
- 页面标题、筛选区、操作区、表格、分页、表单输入、状态标签使用同一视觉层级。
- 响应式收窄导航和内容间距；键盘焦点清晰；遵守 `prefers-reduced-motion`。

设计模式参考 [TDesign](https://tdesign.tencent.com/)、[Arco Design Pro](https://pro.arco.design/) 与 [Ant Design](https://ant.design/)。参考的是中后台信息密度、导航层级和组件状态原则，不复制其品牌视觉。

## 5. 数据与证据边界

- 原型用于证明对象、字段、规则、页面状态与系统边界，不用于证明线上规模或效果。
- 页面内现有名称、数值与日期属于演示数据；不要把它们写入案例成果或对外项目指标。
- 如需替换为真实运营数据，应先确认来源、口径与公开权限。

## 6. 构建与验证

分别从以下目录运行 `npm run build`，并保留生成的 `dist/`：

1. `projects/prototypes/rights-management/depot`
2. `projects/prototypes/rights-management/omni`
3. `projects/prototypes/rights-management/cel/frontend`

新增或调整入口后，从仓库根目录运行 `npm run generate:redirects`，再通过本地静态服务器验证规范入口与旧地址跳转。
