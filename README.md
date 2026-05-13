# PMOdyssey - 项目展示平台

## 项目概述

PMOdyssey 是一个产品经理作品集展示平台，包含三个核心系统的原型：

- **万象系统 (Omni)** - 权益管理与核销中枢
- **云仓系统 (Depot)** - 商品供应链中枢  
- **灵霄系统 (Cel)** - 渠道推广与套餐办理平台

## 快速开始

### 方式一：使用启动脚本（推荐）

1. 确保已安装 Node.js 和 Python
2. 运行启动脚本：
   ```bash
   start-servers.bat
   ```
3. 打开浏览器访问：
   - PMOdyssey 主页: http://localhost:8080
   - 万象系统: http://localhost:3001
   - 云仓系统: http://localhost:3002
   - 灵霄系统: http://localhost:3003

### 方式二：手动启动

**1. 启动 PMOdyssey 主页面**
```bash
cd PMOdyssey
python -m http.server 8080
```

**2. 启动万象系统**
```bash
cd ../omni
npm install  # 首次运行需要
npm run dev -- --port 3001 --host
```

**3. 启动云仓系统**
```bash
cd ../depot
npm install  # 首次运行需要
npm run dev -- --port 3002 --host
```

**4. 启动灵霄系统**
```bash
cd ../cel/frontend
npm install  # 首次运行需要
npm run dev -- --port 3003 --host
```

## 项目结构

```
PMOdyssey/
├── index.html          # 主页
├── project-operator-rights.html  # 运营商权益管理体系详情页
├── start-servers.bat   # 一键启动脚本
├── README.md           # 项目说明
├── style.css           # 样式文件
├── script.js           # 脚本文件
└── projects/           # 构建产物目录（仅供展示）
    ├── omni/           # 万象系统构建产物
    ├── depot/          # 云仓系统构建产物
    └── cel/            # 灵霄系统构建产物
```

## 注意事项

1. **开发服务器模式**：三个系统使用 Vite 开发服务器运行，支持热更新
2. **端口说明**：
   - PMOdyssey: 8080
   - Omni (万象): 3001
   - Depot (云仓): 3002
   - Cel (灵霄): 3003
3. **依赖安装**：首次运行需要在各个项目目录下执行 `npm install`
4. **静态构建**：构建产物存放在 `projects/` 目录，但由于 Vite 的特性，建议使用开发服务器模式预览

## 技术栈

- **PMOdyssey**: 纯 HTML/CSS/JS
- **Omni**: React + Vite
- **Depot**: React + TypeScript + Vite
- **Cel**: Vue 3 + Vite

## 许可证

MIT License