
import axios from 'axios'

const mockData = {
  '/dashboard/overview': {
    code: 200,
    data: {
      totalOrders: 12580,
      totalAmount: 2856780.50,
      totalPromotionCost: 356800.00,
      activeChannels: 28,
      activePlans: 15,
      newOrdersToday: 356
    }
  },
  '/dashboard/settlementAmount': {
    code: 200,
    data: [
      { date: '05-08', amount: 450000 },
      { date: '05-09', amount: 520000 },
      { date: '05-10', amount: 380000 },
      { date: '05-11', amount: 620000 },
      { date: '05-12', amount: 580000 },
      { date: '05-13', amount: 490000 },
      { date: '05-14', amount: 560000 }
    ]
  },
  '/dashboard/promotionCost': {
    code: 200,
    data: [
      { date: '05-08', cost: 55000 },
      { date: '05-09', cost: 68000 },
      { date: '05-10', cost: 42000 },
      { date: '05-11', cost: 78000 },
      { date: '05-12', cost: 65000 },
      { date: '05-13', cost: 58000 },
      { date: '05-14', cost: 65000 }
    ]
  },
  '/dashboard/orderOverview': {
    code: 200,
    data: [
      { date: '05-08', orders: 1856 },
      { date: '05-09', orders: 2134 },
      { date: '05-10', orders: 1567 },
      { date: '05-11', orders: 2567 },
      { date: '05-12', orders: 2345 },
      { date: '05-13', orders: 1987 },
      { date: '05-14', orders: 2234 }
    ]
  },
  '/dashboard/salesRank': {
    code: 200,
    data: [
      { name: '奶茶套餐', orders: 2856 },
      { name: '视频会员', orders: 2134 },
      { name: '外卖红包', orders: 1876 },
      { name: '音乐会员', orders: 1543 },
      { name: '购物优惠券', orders: 1234 },
      { name: '打车券', orders: 987 },
      { name: '加油券', orders: 876 },
      { name: '话费充值', orders: 765 }
    ]
  },
  '/dashboard/promotionRank': {
    code: 200,
    data: [
      { name: '抖音推广', orders: 3256 },
      { name: '微信公众号', orders: 2345 },
      { name: '小红书', orders: 1876 },
      { name: '微博', orders: 1543 },
      { name: 'B站', orders: 1234 },
      { name: '知乎', orders: 987 },
      { name: '今日头条', orders: 876 },
      { name: '快手', orders: 765 }
    ]
  },
  '/plan/list': {
    code: 200,
    data: [
      { id: 1, name: '春季促销活动', status: 'active', channels: 5, orders: 2580, amount: 458000 },
      { id: 2, name: '会员专属优惠', status: 'active', channels: 3, orders: 1890, amount: 325000 },
      { id: 3, name: '新用户礼包', status: 'active', channels: 8, orders: 3450, amount: 520000 },
      { id: 4, name: '节日特惠', status: 'inactive', channels: 4, orders: 1230, amount: 185000 },
      { id: 5, name: '周末狂欢', status: 'active', channels: 6, orders: 2150, amount: 380000 }
    ]
  },
  '/channel/list': {
    code: 200,
    data: [
      { id: 1, name: '抖音', type: 'social', status: 'active', orders: 3256 },
      { id: 2, name: '微信公众号', type: 'social', status: 'active', orders: 2345 },
      { id: 3, name: '小红书', type: 'social', status: 'active', orders: 1876 },
      { id: 4, name: '微博', type: 'social', status: 'active', orders: 1543 },
      { id: 5, name: 'B站', type: 'video', status: 'active', orders: 1234 },
      { id: 6, name: '知乎', type: 'knowledge', status: 'active', orders: 987 }
    ]
  },
  '/product/list': {
    code: 200,
    data: [
      { id: 1, name: '奶茶套餐', category: 'food', price: 19.90, stock: 5000, sales: 2856 },
      { id: 2, name: '视频会员月卡', category: 'digital', price: 25.00, stock: 10000, sales: 2134 },
      { id: 3, name: '外卖红包', category: 'coupon', price: 5.00, stock: 20000, sales: 1876 },
      { id: 4, name: '音乐会员年卡', category: 'digital', price: 88.00, stock: 3000, sales: 1543 },
      { id: 5, name: '购物优惠券', category: 'coupon', price: 10.00, stock: 15000, sales: 1234 }
    ]
  },
  '/quota/list': {
    code: 200,
    data: [
      { id: 1, name: '每日限额', type: 'daily', limit: 1000, used: 680, remaining: 320 },
      { id: 2, name: '每周限额', type: 'weekly', limit: 5000, used: 3500, remaining: 1500 },
      { id: 3, name: '每月限额', type: 'monthly', limit: 20000, used: 15600, remaining: 4400 },
      { id: 4, name: '新用户限额', type: 'special', limit: 2000, used: 1200, remaining: 800 }
    ]
  },
  '/blacklist/strategy/list': {
    code: 200,
    data: [
      { id: 1, name: '黑名单策略-A', type: 'phone', status: 'active', count: 1256 },
      { id: 2, name: '黑名单策略-B', type: 'device', status: 'active', count: 856 },
      { id: 3, name: '黑名单策略-C', type: 'ip', status: 'inactive', count: 432 }
    ]
  },
  '/blacklist/phone/list': {
    code: 200,
    data: [
      { id: 1, phone: '138****1234', reason: '恶意刷单', createdAt: '2024-05-10' },
      { id: 2, phone: '139****5678', reason: '多次退款', createdAt: '2024-05-11' },
      { id: 3, phone: '137****9012', reason: '账号异常', createdAt: '2024-05-12' },
      { id: 4, phone: '136****3456', reason: '恶意刷单', createdAt: '2024-05-13' },
      { id: 5, phone: '135****7890', reason: '虚假交易', createdAt: '2024-05-14' }
    ]
  },
  '/order/list': {
    code: 200,
    data: [
      { id: 'ORD20240514001', productName: '奶茶套餐', amount: 19.90, status: 'completed', createdAt: '2024-05-14 10:30:00' },
      { id: 'ORD20240514002', productName: '视频会员月卡', amount: 25.00, status: 'completed', createdAt: '2024-05-14 10:35:00' },
      { id: 'ORD20240514003', productName: '外卖红包', amount: 5.00, status: 'processing', createdAt: '2024-05-14 10:40:00' },
      { id: 'ORD20240514004', productName: '音乐会员年卡', amount: 88.00, status: 'pending', createdAt: '2024-05-14 10:45:00' },
      { id: 'ORD20240514005', productName: '购物优惠券', amount: 10.00, status: 'completed', createdAt: '2024-05-14 10:50:00' }
    ]
  }
}

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    const mockResponse = mockData[config.url]
    if (mockResponse) {
      return Promise.resolve({
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response.data
    } else {
      return Promise.reject(response.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
