
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>订单详情</h2>
      <el-button @click="goBack">返回</el-button>
    </div>

    <el-card v-if="order" class="detail-card">
      <div class="detail-section">
        <h3>基础信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">订单号：</span>
            <span class="value">{{ order.orderId }}</span>
          </div>
          <div class="detail-item">
            <span class="label">手机号：</span>
            <span class="value">{{ order.phoneNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态：</span>
            <el-tag :type="getStatusType(order.status)">
              {{ getStatusLabel(order.status) }}
            </el-tag>
          </div>
          <div class="detail-item">
            <span class="label">办理时间：</span>
            <span class="value">{{ order.handleAt }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订购时间：</span>
            <span class="value">{{ order.subscribeAt }}</span>
          </div>
          <div class="detail-item">
            <span class="label">退订时间：</span>
            <span class="value">{{ order.unsubscribeAt || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>运营商信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">运营商：</span>
            <span class="value">{{ order.ipsChannel }}</span>
          </div>
          <div class="detail-item">
            <span class="label">运营商流水号：</span>
            <span class="value">{{ order.ipsTxId || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>办理产品</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">订购编码：</span>
            <span class="value">{{ order.productCode }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订购名称：</span>
            <span class="value">{{ order.productName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">策划ID：</span>
            <span class="value">{{ order.offerId }}</span>
          </div>
          <div class="detail-item">
            <span class="label">策划名称：</span>
            <span class="value">{{ order.offerName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">权益编码：</span>
            <span class="value">{{ order.equityCode || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">权益名称：</span>
            <span class="value">{{ order.equityName || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>推广渠道信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">渠道ID：</span>
            <span class="value">{{ order.channelId }}</span>
          </div>
          <div class="detail-item">
            <span class="label">渠道名称：</span>
            <span class="value">{{ order.channelName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">渠道流水号：</span>
            <span class="value">{{ order.channelTxId || '-' }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { orderApi } from '../../api'

const router = useRouter()
const route = useRoute()

const order = ref(null)

const getStatusLabel = (status) => {
  const labels = { '0': '订购中', '1': '已订购', '2': '已退订' }
  return labels[status] || ''
}

const getStatusType = (status) => {
  const types = { '0': 'warning', '1': 'success', '2': 'danger' }
  return types[status] || 'info'
}

const goBack = () => {
  router.push('/order')
}

onMounted(async () => {
  const id = route.params.id
  const res = await orderApi.get(id)
  order.value = res.data
})
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.detail-card {
  border-radius: 8px;
}

.detail-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.detail-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.label {
  color: #999;
  margin-right: 8px;
}

.value {
  color: #333;
}
</style>
