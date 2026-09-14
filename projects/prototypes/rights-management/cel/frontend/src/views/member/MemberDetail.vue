
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>会员详情</h2>
      <el-button @click="goBack">返回</el-button>
    </div>

    <el-card v-if="member" class="detail-card">
      <div class="detail-section">
        <h3>基本信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">订单号：</span>
            <span class="value">{{ member.orderId }}</span>
          </div>
          <div class="detail-item">
            <span class="label">手机号：</span>
            <span class="value">{{ member.phoneNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态：</span>
            <el-tag :type="member.status === '1' ? 'success' : 'danger'">
              {{ member.status === '1' ? '已订购' : '已退订' }}
            </el-tag>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>订购信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">运营商：</span>
            <span class="value">{{ member.ipsChannel }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订购编码：</span>
            <span class="value">{{ member.productCode }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订购名称：</span>
            <span class="value">{{ member.productName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">策划名称：</span>
            <span class="value">{{ member.offerName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">权益名称：</span>
            <span class="value">{{ member.equityName || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">推广渠道：</span>
            <span class="value">{{ member.channelName }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>时间信息</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">办理时间：</span>
            <span class="value">{{ member.handleAt }}</span>
          </div>
          <div class="detail-item">
            <span class="label">订购时间：</span>
            <span class="value">{{ member.subscribeAt }}</span>
          </div>
          <div class="detail-item">
            <span class="label">退订时间：</span>
            <span class="value">{{ member.unsubscribeAt || '-' }}</span>
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

const member = ref(null)

const goBack = () => {
  router.push('/member')
}

onMounted(async () => {
  const id = route.params.id
  const res = await orderApi.get(id)
  member.value = res.data
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
