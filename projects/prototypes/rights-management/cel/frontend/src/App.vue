<template>
  <div class="rm-app rm-vue-app">
    <aside class="rm-sidebar rm-vue-sidebar" :class="{ 'is-collapsed': isCollapse }">
      <div class="rm-brand">
        <div class="rm-brand-mark" aria-hidden="true">LX</div>
        <div v-if="!isCollapse" class="rm-brand-copy">
          <strong>灵霄</strong>
          <small>Growth · 03</small>
        </div>
      </div>
      <div v-if="!isCollapse" class="rm-menu-label">权益协同平台</div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="rm-vue-menu"
        unique-opened
        @select="handleMenuSelect"
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
        <el-sub-menu index="plan">
          <template #title>
            <el-icon><Calendar /></el-icon>
            <span>套餐策划</span>
          </template>
          <el-menu-item index="/plan">策划管理</el-menu-item>
          <el-menu-item index="/template">套餐模板</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="promotion">
          <template #title>
            <el-icon><Promotion /></el-icon>
            <span>渠道增长</span>
          </template>
          <el-menu-item index="/channel">渠道管理</el-menu-item>
          <el-menu-item index="/product">推广产品</el-menu-item>
          <el-menu-item index="/quota">限办策略</el-menu-item>
          <el-menu-item index="/blacklist">黑名单</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/order">
          <el-icon><ShoppingCart /></el-icon>
          <template #title>办理订单</template>
        </el-menu-item>
        <el-sub-menu index="app">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>应用管理</span>
          </template>
          <el-menu-item index="/app/list">应用列表</el-menu-item>
          <el-menu-item index="/app/config">应用配置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/log">操作日志</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div v-if="!isCollapse" class="rm-sidebar-footer">连接套餐、渠道与办理策略，控制权益进入增长场景。</div>
    </aside>

    <main class="rm-shell rm-vue-shell">
      <header class="rm-header">
        <div class="rm-header-start">
          <button
            class="rm-collapse"
            type="button"
            :aria-label="isCollapse ? '展开导航' : '收起导航'"
            @click="isCollapse = !isCollapse"
          >
            <el-icon><component :is="isCollapse ? Expand : Fold" /></el-icon>
          </button>
          <div class="rm-context">
            <small>灵霄 / 渠道增长</small>
            <strong>{{ currentPageName }}</strong>
          </div>
          <span class="rm-stage">原型环境</span>
        </div>
        <div class="rm-header-end">
          <el-button text aria-label="帮助与说明"><el-icon><QuestionFilled /></el-icon></el-button>
          <el-button text aria-label="通知"><el-icon><Bell /></el-icon></el-button>
          <button class="rm-user" type="button">
            <el-avatar :size="28" class="rm-avatar"><el-icon><User /></el-icon></el-avatar>
            <span class="rm-user-copy"><strong>管理员</strong><small>渠道运营</small></span>
          </button>
        </div>
      </header>
      <div class="rm-content">
        <div class="rm-page">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Bell,
  Calendar,
  Expand,
  Fold,
  Grid,
  HomeFilled,
  Promotion,
  QuestionFilled,
  Setting,
  ShoppingCart,
  User,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)

const pageNames = {
  '/dashboard': '增长工作台',
  '/plan': '策划管理',
  '/plan/create': '新建策划',
  '/template': '套餐模板',
  '/template/create': '新建套餐模板',
  '/channel': '渠道管理',
  '/channel/create': '新建渠道',
  '/product': '推广产品',
  '/product/create': '新建推广产品',
  '/quota': '限办策略',
  '/quota/create': '新建限办策略',
  '/blacklist': '黑名单',
  '/blacklist/create': '新建黑名单',
  '/order': '办理订单',
  '/member': '会员管理',
  '/app/list': '应用列表',
  '/app/config': '应用配置',
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/log': '操作日志',
}

const currentPageName = computed(() => {
  const path = route.path
  if (pageNames[path]) return pageNames[path]
  if (path.startsWith('/plan/edit/')) return '编辑策划'
  if (path.startsWith('/template/edit/')) return '编辑套餐模板'
  if (path.startsWith('/channel/edit/')) return '编辑渠道'
  if (path.startsWith('/product/edit/')) return '编辑推广产品'
  if (path.startsWith('/quota/edit/')) return '编辑限办策略'
  if (path.startsWith('/blacklist/phones/')) return '黑名单号码'
  if (path.startsWith('/blacklist/edit/')) return '编辑黑名单'
  if (path.startsWith('/order/detail/')) return '订单详情'
  if (path.startsWith('/member/detail/')) return '会员详情'
  return '灵霄工作台'
})

const activeMenu = computed(() => {
  const path = route.path
  const candidates = ['/dashboard', '/plan', '/template', '/channel', '/product', '/quota', '/blacklist', '/order', '/member', '/app/list', '/app/config', '/system/user', '/system/role', '/system/log']
  return candidates.find((item) => path === item || path.startsWith(`${item}/`)) || path
})

const handleMenuSelect = (path) => {
  if (path.startsWith('/') && path !== route.path) router.push(path)
}
</script>

<style>
.rm-vue-app {
  display: flex;
  min-height: 100vh;
}

.rm-vue-sidebar {
  width: 232px;
  flex: 0 0 232px;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease, flex-basis 0.2s ease;
}

.rm-vue-sidebar.is-collapsed {
  width: 76px;
  flex-basis: 76px;
}

.rm-vue-menu {
  flex: 1;
  padding: 8px;
}

.rm-vue-menu:not(.el-menu--collapse) {
  width: 100%;
}

.rm-vue-menu .el-menu-item,
.rm-vue-menu .el-sub-menu__title {
  height: 42px;
  line-height: 42px;
}

.rm-vue-menu .el-sub-menu .el-menu-item {
  min-width: 0;
}

.rm-vue-shell {
  min-width: 0;
  flex: 1;
}

.rm-avatar {
  color: #fff;
  background: #2457e6;
}

@media (max-width: 720px) {
  .rm-vue-sidebar {
    width: 76px;
    flex-basis: 76px;
  }

  .rm-vue-sidebar .rm-brand-copy,
  .rm-vue-sidebar .rm-menu-label,
  .rm-vue-sidebar .rm-sidebar-footer {
    display: none;
  }
}
</style>
