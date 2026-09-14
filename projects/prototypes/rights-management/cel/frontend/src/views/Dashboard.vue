
<template>
  <div class="dashboard">
    <div class="overview-cards">
      <div class="card">
        <div class="card-icon orders">
          <el-icon><component :is="icons.ShoppingCart" /></el-icon>
        </div>
        <div class="card-content">
          <p class="card-value">{{ overview.totalOrders }}</p>
          <p class="card-label">订单总数</p>
        </div>
      </div>
      <div class="card">
        <div class="card-icon amount">
          <el-icon><component :is="icons.Wallet" /></el-icon>
        </div>
        <div class="card-content">
          <p class="card-value">¥{{ formatNumber(overview.totalAmount) }}</p>
          <p class="card-label">结算金额</p>
        </div>
      </div>
      <div class="card">
        <div class="card-icon cost">
          <el-icon><component :is="icons.Dollar" /></el-icon>
        </div>
        <div class="card-content">
          <p class="card-value">¥{{ formatNumber(overview.totalPromotionCost) }}</p>
          <p class="card-label">推广成本</p>
        </div>
      </div>
      <div class="card">
        <div class="card-icon channels">
          <el-icon><component :is="icons.Globe" /></el-icon>
        </div>
        <div class="card-content">
          <p class="card-value">{{ overview.activeChannels }}</p>
          <p class="card-label">活跃渠道</p>
        </div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-header">
          <h3>结算金额/推广成本</h3>
          <el-tabs v-model="activeTab" class="tabs">
            <el-tab-pane label="结算金额" name="settlement"></el-tab-pane>
            <el-tab-pane label="推广成本" name="cost"></el-tab-pane>
          </el-tabs>
          <el-select v-model="timeRange" class="time-select">
            <el-option label="本周" value="week"></el-option>
            <el-option label="本月" value="month"></el-option>
            <el-option label="自定义" value="custom"></el-option>
          </el-select>
        </div>
        <div ref="settlementChart" class="chart"></div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>订单总览</h3>
          <el-select v-model="orderTimeRange" class="time-select">
            <el-option label="本周" value="week"></el-option>
            <el-option label="本月" value="month"></el-option>
            <el-option label="自定义" value="custom"></el-option>
          </el-select>
        </div>
        <div ref="orderChart" class="chart"></div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-header">
          <h3>销量排行</h3>
        </div>
        <div ref="salesChart" class="chart"></div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>推广排行</h3>
        </div>
        <div ref="promotionChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { dashboardApi } from '../api'

const icons = { 
  ShoppingCart: ElementPlusIconsVue.ShoppingCart, 
  Wallet: ElementPlusIconsVue.Wallet, 
  Dollar: ElementPlusIconsVue.Wallet, 
  Globe: ElementPlusIconsVue.ShoppingCart 
}

const overview = ref({
  totalOrders: 0,
  totalAmount: 0,
  totalPromotionCost: 0,
  activeChannels: 0,
  activePlans: 0,
  newOrdersToday: 0
})

const activeTab = ref('settlement')
const timeRange = ref('week')
const orderTimeRange = ref('week')

const settlementChart = ref(null)
const orderChart = ref(null)
const salesChart = ref(null)
const promotionChart = ref(null)

let settlementChartInstance = null
let orderChartInstance = null
let salesChartInstance = null
let promotionChartInstance = null

const formatNumber = (num) => {
  return num.toLocaleString('zh-CN', { minimumFractionDigits: 2 })
}

const initCharts = () => {
  if (settlementChart.value) {
    settlementChartInstance = echarts.init(settlementChart.value)
  }
  if (orderChart.value) {
    orderChartInstance = echarts.init(orderChart.value)
  }
  if (salesChart.value) {
    salesChartInstance = echarts.init(salesChart.value)
  }
  if (promotionChart.value) {
    promotionChartInstance = echarts.init(promotionChart.value)
  }
}

const loadData = async () => {
  const [overviewRes, settlementRes, costRes, orderRes, salesRes, promotionRes] = await Promise.all([
    dashboardApi.overview(),
    dashboardApi.settlementAmount(),
    dashboardApi.promotionCost(),
    dashboardApi.orderOverview(),
    dashboardApi.salesRank(),
    dashboardApi.promotionRank()
  ])

  overview.value = overviewRes.data

  if (activeTab.value === 'settlement') {
    updateSettlementChart(settlementRes.data)
  } else {
    updateSettlementChart(costRes.data, true)
  }

  updateOrderChart(orderRes.data)
  updateSalesChart(salesRes.data)
  updatePromotionChart(promotionRes.data)
}

const updateSettlementChart = (data, isCost = false) => {
  if (!settlementChartInstance) return
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const item = params[0]
        return `${item.name}<br/>${isCost ? '推广成本' : '结算金额'}: ¥${formatNumber(item.value)}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date),
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { color: '#eee' } }
    },
    series: [{
      type: 'line',
      data: data.map(item => isCost ? item.cost : item.amount),
      smooth: true,
      lineStyle: { color: isCost ? '#f56c6c' : '#67c23a' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: isCost ? 'rgba(245, 108, 108, 0.3)' : 'rgba(103, 194, 58, 0.3)' },
          { offset: 1, color: isCost ? 'rgba(245, 108, 108, 0.05)' : 'rgba(103, 194, 58, 0.05)' }
        ])
      }
    }]
  }
  settlementChartInstance.setOption(option)
}

const updateOrderChart = (data) => {
  if (!orderChartInstance) return
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const item = params[0]
        return `${item.name}<br/>订单量: ${item.value}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date),
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { color: '#eee' } }
    },
    series: [{
      type: 'bar',
      data: data.map(item => item.orders),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#409eff' },
          { offset: 1, color: '#67c23a' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  }
  orderChartInstance.setOption(option)
}

const updateSalesChart = (data) => {
  if (!salesChartInstance) return
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const item = params[0]
        return `${item.name}<br/>订单量: ${item.value}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { color: '#eee' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name).reverse(),
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    series: [{
      type: 'bar',
      data: data.map(item => item.orders).reverse(),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#90EE90' },
          { offset: 1, color: '#228B22' }
        ]),
        borderRadius: [0, 4, 4, 0]
      }
    }]
  }
  salesChartInstance.setOption(option)
}

const updatePromotionChart = (data) => {
  if (!promotionChartInstance) return
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const item = params[0]
        return `${item.name}<br/>订单量: ${item.value}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { color: '#eee' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name).reverse(),
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    series: [{
      type: 'bar',
      data: data.map(item => item.orders).reverse(),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#FFD700' },
          { offset: 1, color: '#FFA500' }
        ]),
        borderRadius: [0, 4, 4, 0]
      }
    }]
  }
  promotionChartInstance.setOption(option)
}

watch(activeTab, async (val) => {
  if (val === 'settlement') {
    const res = await dashboardApi.settlementAmount()
    updateSettlementChart(res.data)
  } else {
    const res = await dashboardApi.promotionCost()
    updateSettlementChart(res.data, true)
  }
})

onMounted(() => {
  nextTick(() => {
    initCharts()
    loadData()
  })
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.card-icon.orders {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-icon.amount {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.card-icon.cost {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.card-icon.channels {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-content {
  flex: 1;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card-label {
  font-size: 14px;
  color: #999;
  margin: 4px 0 0 0;
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.tabs {
  margin-right: auto;
  margin-left: 20px;
}

.time-select {
  width: 120px;
}

.chart {
  height: 280px;
}
</style>
