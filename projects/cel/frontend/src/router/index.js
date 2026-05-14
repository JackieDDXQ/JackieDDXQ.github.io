
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/plan',
    name: 'Plan',
    component: () => import('../views/plan/PlanList.vue')
  },
  {
    path: '/plan/create',
    name: 'PlanCreate',
    component: () => import('../views/plan/PlanForm.vue')
  },
  {
    path: '/plan/edit/:id',
    name: 'PlanEdit',
    component: () => import('../views/plan/PlanForm.vue')
  },
  {
    path: '/template',
    name: 'Template',
    component: () => import('../views/plan/TemplateList.vue')
  },
  {
    path: '/template/create',
    name: 'TemplateCreate',
    component: () => import('../views/plan/TemplateForm.vue')
  },
  {
    path: '/template/edit/:id',
    name: 'TemplateEdit',
    component: () => import('../views/plan/TemplateForm.vue')
  },
  {
    path: '/channel',
    name: 'Channel',
    component: () => import('../views/promotion/ChannelList.vue')
  },
  {
    path: '/channel/create',
    name: 'ChannelCreate',
    component: () => import('../views/promotion/ChannelForm.vue')
  },
  {
    path: '/channel/edit/:id',
    name: 'ChannelEdit',
    component: () => import('../views/promotion/ChannelForm.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/promotion/ProductList.vue')
  },
  {
    path: '/product/create',
    name: 'ProductCreate',
    component: () => import('../views/promotion/ProductForm.vue')
  },
  {
    path: '/product/edit/:id',
    name: 'ProductEdit',
    component: () => import('../views/promotion/ProductForm.vue')
  },
  {
    path: '/quota',
    name: 'Quota',
    component: () => import('../views/promotion/QuotaList.vue')
  },
  {
    path: '/quota/create',
    name: 'QuotaCreate',
    component: () => import('../views/promotion/QuotaForm.vue')
  },
  {
    path: '/quota/edit/:id',
    name: 'QuotaEdit',
    component: () => import('../views/promotion/QuotaForm.vue')
  },
  {
    path: '/blacklist',
    name: 'Blacklist',
    component: () => import('../views/promotion/BlacklistList.vue')
  },
  {
    path: '/blacklist/create',
    name: 'BlacklistCreate',
    component: () => import('../views/promotion/BlacklistForm.vue')
  },
  {
    path: '/blacklist/edit/:id',
    name: 'BlacklistEdit',
    component: () => import('../views/promotion/BlacklistForm.vue')
  },
  {
    path: '/blacklist/phones/:id',
    name: 'BlacklistPhones',
    component: () => import('../views/promotion/BlacklistPhones.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/OrderList.vue')
  },
  {
    path: '/order/detail/:id',
    name: 'OrderDetail',
    component: () => import('../views/order/OrderDetail.vue')
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('../views/member/MemberList.vue')
  },
  {
    path: '/member/detail/:id',
    name: 'MemberDetail',
    component: () => import('../views/member/MemberDetail.vue')
  },
  {
    path: '/app/list',
    name: 'AppList',
    component: () => import('../views/app/AppList.vue')
  },
  {
    path: '/app/config',
    name: 'AppConfig',
    component: () => import('../views/app/AppConfig.vue')
  },
  {
    path: '/system/user',
    name: 'SystemUser',
    component: () => import('../views/system/UserList.vue')
  },
  {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('../views/system/RoleList.vue')
  },
  {
    path: '/system/log',
    name: 'SystemLog',
    component: () => import('../views/system/LogList.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/projects/cel/frontend/dist'),
  routes
})

export default router
