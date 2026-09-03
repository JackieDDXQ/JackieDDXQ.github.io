
import request from '../utils/request'

export const planApi = {
  list: (params) => request.get('/plan/list', { params }),
  get: (id) => request.get(`/plan/${id}`),
  save: (data) => request.post('/plan', data),
  update: (data) => request.put('/plan', data),
  delete: (id) => request.delete(`/plan/${id}`)
}

export const channelApi = {
  list: (params) => request.get('/channel/list', { params }),
  get: (id) => request.get(`/channel/${id}`),
  save: (data) => request.post('/channel', data),
  update: (data) => request.put('/channel', data),
  delete: (id) => request.delete(`/channel/${id}`)
}

export const productApi = {
  list: (params) => request.get('/product/list', { params }),
  get: (id) => request.get(`/product/${id}`),
  save: (data) => request.post('/product', data),
  update: (data) => request.put('/product', data),
  delete: (id) => request.delete(`/product/${id}`)
}

export const quotaApi = {
  list: (params) => request.get('/quota/list', { params }),
  get: (id) => request.get(`/quota/${id}`),
  save: (data) => request.post('/quota', data),
  update: (data) => request.put('/quota', data),
  delete: (id) => request.delete(`/quota/${id}`)
}

export const blacklistApi = {
  strategyList: (params) => request.get('/blacklist/strategy/list', { params }),
  strategyGet: (id) => request.get(`/blacklist/strategy/${id}`),
  strategySave: (data) => request.post('/blacklist/strategy', data),
  strategyUpdate: (data) => request.put('/blacklist/strategy', data),
  strategyDelete: (id) => request.delete(`/blacklist/strategy/${id}`),
  phoneList: (params) => request.get('/blacklist/phone/list', { params }),
  phoneGet: (id) => request.get(`/blacklist/phone/${id}`),
  phoneSave: (data) => request.post('/blacklist/phone', data),
  phoneUpdate: (data) => request.put('/blacklist/phone', data),
  phoneDelete: (id) => request.delete(`/blacklist/phone/${id}`),
  phoneBatchDelete: (ids) => request.delete('/blacklist/phone/batch', { data: ids })
}

export const orderApi = {
  list: (params) => request.get('/order/list', { params }),
  get: (id) => request.get(`/order/${id}`),
  detail: (orderId) => request.get('/order/detail', { params: { orderId } })
}

export const dashboardApi = {
  overview: () => request.get('/dashboard/overview'),
  settlementAmount: (params) => request.get('/dashboard/settlementAmount', { params }),
  promotionCost: (params) => request.get('/dashboard/promotionCost', { params }),
  orderOverview: (params) => request.get('/dashboard/orderOverview', { params }),
  salesRank: () => request.get('/dashboard/salesRank'),
  promotionRank: () => request.get('/dashboard/promotionRank')
}
