<template>
  <div class="app-container">
    <aside class="sidebar" :class="{ collapsed: isCollapse }">
      <div class="logo">
        <h2 v-if="!isCollapse">灵霄系统</h2>
        <span v-else class="logo-text">灵霄</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        unique-opened
        mode="vertical"
        @select="handleMenuSelect"
      >
        <el-menu-item index="/dashboard">
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="plan">
          <template #title>
            <span>策划管理</span>
          </template>
          <el-menu-item index="/plan">
            <template #title>策划管理</template>
          </el-menu-item>
          <el-menu-item index="/template">
            <template #title>套餐模板管理</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="promotion">
          <template #title>
            <span>推广管理</span>
          </template>
          <el-menu-item index="/channel">
            <template #title>渠道管理</template>
          </el-menu-item>
          <el-menu-item index="/product">
            <template #title>推广管理</template>
          </el-menu-item>
          <el-menu-item index="/quota">
            <template #title>限办策略</template>
          </el-menu-item>
          <el-menu-item index="/blacklist">
            <template #title>黑名单</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="order">
          <template #title>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/order">
            <template #title>订单管理</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="app">
          <template #title>
            <span>应用管理</span>
          </template>
          <el-menu-item index="/app/list">
            <template #title>应用列表</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon size="14">
          <component :is="isCollapse ? icons.Expand : icons.Fold" />
        </el-icon>
      </div>
    </aside>
    <main class="main-content">
      <header class="header">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPageName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-button type="text">
            <el-icon><component :is="icons.Bell" /></el-icon>
          </el-button>
          <el-button type="text">
            <el-icon><component :is="icons.User" /></el-icon>
            <span>管理员</span>
          </el-button>
        </div>
      </header>
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const router = useRouter()

const isCollapse = ref(false)

const icons = {
  Bell: ElementPlusIconsVue.Bell,
  User: ElementPlusIconsVue.User,
  Fold: ElementPlusIconsVue.Fold,
  Expand: ElementPlusIconsVue.Expand
}

const activeMenu = computed(() => {
  return router.currentRoute.value.path
})

const pageNames = {
  '/dashboard': '首页',
  '/plan': '策划管理',
  '/template': '套餐模板管理',
  '/channel': '渠道管理',
  '/product': '推广管理',
  '/quota': '限办策略',
  '/blacklist': '黑名单',
  '/order': '订单管理',
  '/app/list': '应用列表'
}

const currentPageName = computed(() => {
  return pageNames[router.currentRoute.value.path] || ''
})

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleMenuSelect = (index) => {
  console.log('Menu selected:', index)
  if (index && index.startsWith('/')) {
    router.push(index).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('Route push failed:', err)
      }
    })
  }
}

watch(router.currentRoute, (to) => {
  console.log('Route changed to:', to.path)
}, { immediate: true })

onMounted(() => {
  console.log('App mounted, current route:', router.currentRoute.value.path)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  flex-shrink: 0;
  z-index: 10;
}

.sidebar.collapsed {
  width: 64px;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.menu {
  flex: 1;
  border-right: none;
  background: transparent;
  overflow-y: auto;
}

.menu:not(.el-menu--collapse) {
  width: 200px;
}

.menu :deep(.el-menu-item),
.menu :deep(.el-sub-menu__title) {
  color: #b8c5d6;
  height: 48px;
  line-height: 48px;
  background: transparent;
  padding-left: 20px !important;
}

.menu :deep(.el-menu-item:hover),
.menu :deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.1);
}

.menu :deep(.el-menu-item.is-active) {
  background: #4a69bd !important;
  color: #fff !important;
}

.menu :deep(.el-menu-item.is-active:hover) {
  background: #4a69bd !important;
}

.menu :deep(.el-sub-menu .el-menu-item) {
  min-width: 0;
  padding-left: 40px !important;
}

.menu :deep(.el-sub-menu__title) {
  position: relative;
}

.menu :deep(.el-sub-menu__icon-arrow) {
  display: none;
}

.collapse-btn {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 40px;
  background: #fff;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  color: #666;
  z-index: 100;
  transition: right 0.3s ease;
}

.collapse-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f6fa;
  overflow: hidden;
}

.header {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right :deep(.el-button) {
  color: #666;
}

.header-right :deep(.el-button:hover) {
  color: #333;
}

.content-wrapper {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
