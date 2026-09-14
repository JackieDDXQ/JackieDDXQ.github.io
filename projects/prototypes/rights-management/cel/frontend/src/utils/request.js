
import axios from 'axios'

const emptyOverview = {
  totalOrders: 0,
  totalAmount: 0,
  totalPromotionCost: 0,
  activeChannels: 0,
  activePlans: 0,
  newOrdersToday: 0
}

const getStaticData = (url = '') => {
  if (url.includes('/dashboard/overview')) return emptyOverview
  if (url.includes('/dashboard/')) return []
  if (url.includes('/order/list') || url.includes('/blacklist/phone/list')) {
    return { records: [], total: 0 }
  }
  return {}
}

// The published portfolio is a static build. Keep its UI routes demonstrable
// without a backend, while local development can still connect to `/api`.
const staticAdapter = async (config) => ({
  data: {
    code: 200,
    data: getStaticData(config.url)
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
  request: null
})

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  ...(import.meta.env.PROD ? { adapter: staticAdapter } : {})
})

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
