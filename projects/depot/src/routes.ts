import Home from '@/pages/Home'
import Supplier from '@/pages/Supplier'
import Product from '@/pages/Product'
import Brand from '@/pages/Brand'
import Store from '@/pages/Store'
import Goods from '@/pages/Goods'
import Spec from '@/pages/Spec'
import Category from '@/pages/Category'
import Order from '@/pages/Order'
import Application from '@/pages/Application'
import Dictionary from '@/pages/Dictionary'
import Export from '@/pages/Export'

const routes = [
  { path: '/', name: '首页', component: Home },
  { path: '/supplier', name: '供应商', component: Supplier },
  { path: '/product', name: '产品管理', component: Product },
  { path: '/brand', name: '品牌管理', component: Brand },
  { path: '/store', name: '门店管理', component: Store },
  { path: '/goods', name: '商品管理', component: Goods },
  { path: '/spec', name: '规格管理', component: Spec },
  { path: '/category', name: '分类管理', component: Category },
  { path: '/order', name: '订单管理', component: Order },
  { path: '/application', name: '应用管理', component: Application },
  { path: '/dictionary', name: '字典设置', component: Dictionary },
  { path: '/export', name: '导出管理', component: Export },
]

export default routes