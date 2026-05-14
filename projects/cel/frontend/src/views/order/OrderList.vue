<template>
  <div class="page-container">
    <div class="page-header">
      <h2>订单管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="订单月份">
          <el-date-picker v-model="searchForm.month" type="month" placeholder="选择月份"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderId" placeholder="请输入订单号" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phoneNumber" placeholder="请输入手机号" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="searchForm.ipsChannel" placeholder="请选择运营商" clearable style="width: 120px;">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划">
          <el-input v-model="searchForm.plan" placeholder="请搜索策划" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="推广产品">
          <el-input v-model="searchForm.product" placeholder="请搜索推广产品" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="订购号码">
          <el-input v-model="searchForm.subscribeNumber" placeholder="请输入订购号码" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="办理账号">
          <el-input v-model="searchForm.handleAccount" placeholder="请输入办理账号" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="办理方式">
          <el-select v-model="searchForm.handleType" placeholder="请选择办理方式" clearable style="width: 120px;">
            <el-option label="示例方式A" value="示例方式A"></el-option>
            <el-option label="示例方式B" value="示例方式B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办理时间">
          <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <span class="date-separator">至</span>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">
            <el-icon><component :is="icons.Search" /></el-icon>
            查询
          </el-button>
          <el-button @click="reset">
            <el-icon><component :is="icons.Refresh" /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin-bottom: 16px;">
      <el-button type="success" @click="testClick">测试点击</el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="externalOrderId" label="外部订单号"></el-table-column>
      <el-table-column prop="handleAccount" label="办理用户"></el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="planName" label="策划信息"></el-table-column>
      <el-table-column prop="promotionInfo" label="推广信息"></el-table-column>
      <el-table-column prop="status" label="办理状态">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="subscribeAt" label="订购时间" width="160"></el-table-column>
      <el-table-column prop="handleType" label="办理方式"></el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
    ></el-pagination>

    <el-dialog title="详情" :visible="detailDialogVisible" @close="detailDialogVisible = false" width="800px">
      <div class="detail-header">
        <div class="header-item">
          <span class="label">订单号：</span>
          <span class="value">{{ detailData.orderId }}</span>
        </div>
        <div class="header-item">
          <span class="label">状态：</span>
          <span class="value status success">{{ detailData.status }}</span>
        </div>
        <div class="header-item">
          <span class="label">运营商订单号：</span>
          <span class="value">{{ detailData.operatorOrderId }}</span>
        </div>
        <div class="header-item">
          <span class="label">渠道订单号：</span>
          <span class="value">{{ detailData.channelOrderId }}</span>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="section-title">基本信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">运营商：</span>
            <span class="value">{{ detailData.operator }}</span>
          </div>
          <div class="info-item">
            <span class="label">办理用户：</span>
            <span class="value">{{ detailData.handleUser }}</span>
          </div>
          <div class="info-item">
            <span class="label">订购时间：</span>
            <span class="value">{{ detailData.subscribeTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">退订时间：</span>
            <span class="value">{{ detailData.cancelTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">策划ID：</span>
            <span class="value">{{ detailData.planId }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品名称：</span>
            <span class="value">{{ detailData.productName }}</span>
          </div>
          <div class="info-item">
            <span class="label">产品ID：</span>
            <span class="value">{{ detailData.productId }}</span>
          </div>
          <div class="info-item">
            <span class="label">权益名称：</span>
            <span class="value">{{ detailData.rightsName }}</span>
          </div>
          <div class="info-item">
            <span class="label">权益ID：</span>
            <span class="value">{{ detailData.rightsId }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="section-title">办理信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">推广方：</span>
            <span class="value">{{ detailData.promoter }}</span>
          </div>
          <div class="info-item">
            <span class="label">验证码：</span>
            <span class="value">{{ detailData.verifyCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">广告平台：</span>
            <span class="value">{{ detailData.adPlatform }}</span>
          </div>
          <div class="info-item">
            <span class="label">APP名称：</span>
            <span class="value">{{ detailData.appName }}</span>
          </div>
          <div class="info-item">
            <span class="label">APP安装包名称：</span>
            <span class="value">{{ detailData.appPackageName }}</span>
          </div>
          <div class="info-item">
            <span class="label">办理页面链接：</span>
            <span class="value link">{{ detailData.handleUrl }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="section-title">附加信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">处理结果：</span>
            <span class="value">{{ detailData.processResult }}</span>
          </div>
          <div class="info-item">
            <span class="label">订单查询：</span>
            <span class="value">{{ detailData.orderQuery }}</span>
          </div>
          <div class="info-item">
            <span class="label">查询次数：</span>
            <span class="value">{{ detailData.queryCount }}</span>
          </div>
          <div class="info-item">
            <span class="label">同步状态：</span>
            <span class="value">{{ detailData.syncStatus }}</span>
          </div>
          <div class="info-item">
            <span class="label">回调次数：</span>
            <span class="value">{{ detailData.callbackCount }}</span>
          </div>
          <div class="info-item">
            <span class="label">回调地址：</span>
            <span class="value">{{ detailData.callbackUrl }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div style="text-align: center;">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

const icons = { Search, Refresh }

const searchForm = reactive({
  month: '',
  orderId: '',
  phoneNumber: '',
  ipsChannel: '',
  plan: '',
  product: '',
  subscribeNumber: '',
  handleAccount: '',
  handleType: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  {
    id: 1,
    orderId: 'ORD2026051000001',
    externalOrderId: 'EX2026051000001',
    handleAccount: '13800000001',
    ipsChannel: '示例运营商A',
    planName: '示例策划A',
    promotionInfo: '示例推广信息A',
    status: '1',
    subscribeAt: '2026-05-10 09:00:01',
    handleType: '示例方式A'
  },
  {
    id: 2,
    orderId: 'ORD2026051000002',
    externalOrderId: 'EX2026051000002',
    handleAccount: '13800000002',
    ipsChannel: '示例运营商B',
    planName: '示例策划B',
    promotionInfo: '示例推广信息B',
    status: '1',
    subscribeAt: '2026-05-10 10:30:19',
    handleType: '示例方式B'
  },
  {
    id: 3,
    orderId: 'ORD2026051000003',
    externalOrderId: 'EX2026051000003',
    handleAccount: '13800000003',
    ipsChannel: '示例运营商A',
    planName: '示例策划A',
    promotionInfo: '示例推广信息A',
    status: '1',
    subscribeAt: '2026-05-10 11:15:33',
    handleType: '示例方式A'
  },
  {
    id: 4,
    orderId: 'ORD2026051000004',
    externalOrderId: 'EX2026051000004',
    handleAccount: '13800000004',
    ipsChannel: '示例运营商B',
    planName: '示例策划C',
    promotionInfo: '示例推广信息C',
    status: '0',
    subscribeAt: '2026-05-10 14:00:59',
    handleType: '示例方式A'
  },
  {
    id: 5,
    orderId: 'ORD2026051000005',
    externalOrderId: 'EX2026051000005',
    handleAccount: '13800000005',
    ipsChannel: '示例运营商A',
    planName: '示例策划B',
    promotionInfo: '示例推广信息B',
    status: '1',
    subscribeAt: '2026-05-10 15:21:01',
    handleType: '示例方式B'
  },
  {
    id: 6,
    orderId: 'ORD2026051000006',
    externalOrderId: 'EX2026051000006',
    handleAccount: '13800000006',
    ipsChannel: '示例运营商B',
    planName: '示例策划A',
    promotionInfo: '示例推广信息A',
    status: '2',
    subscribeAt: '2026-05-10 16:45:30',
    handleType: '示例方式A'
  }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(1804)

const detailDialogVisible = ref(false)
const detailData = reactive({
  orderId: '',
  status: '',
  operatorOrderId: '',
  channelOrderId: '',
  operator: '',
  handleUser: '',
  subscribeTime: '',
  cancelTime: '',
  planId: '',
  productName: '',
  productId: '',
  rightsName: '',
  rightsId: '',
  promoter: '',
  verifyCode: '',
  adPlatform: '',
  appName: '',
  appPackageName: '',
  handleUrl: '',
  processResult: '',
  orderQuery: '',
  queryCount: '',
  syncStatus: '',
  callbackCount: '',
  callbackUrl: ''
})

const getStatusLabel = (status) => {
  const labels = { '0': '订购中', '1': '成功', '2': '已退订' }
  return labels[status] || ''
}

const getStatusType = (status) => {
  const types = { '0': 'warning', '1': 'success', '2': 'danger' }
  return types[status] || 'info'
}

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.month = ''
  searchForm.orderId = ''
  searchForm.phoneNumber = ''
  searchForm.ipsChannel = ''
  searchForm.plan = ''
  searchForm.product = ''
  searchForm.subscribeNumber = ''
  searchForm.handleAccount = ''
  searchForm.handleType = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const testClick = () => {
  console.log('Test button clicked!')
  alert('测试按钮点击成功！')
}

const handleDetail = (row) => {
  console.log('handleDetail clicked, row:', row)
  detailData.orderId = 'ORDER202605100000' + row.id
  detailData.status = getStatusLabel(row.status)
  detailData.operatorOrderId = 'OP202605100000' + row.id
  detailData.channelOrderId = 'CH202605100000' + row.id
  detailData.operator = row.ipsChannel
  detailData.handleUser = row.handleAccount
  detailData.subscribeTime = row.subscribeAt
  detailData.cancelTime = ''
  detailData.planId = 'PLAN' + row.id.toString().padStart(8, '0')
  detailData.productName = '示例产品' + row.id
  detailData.productId = 'PROD' + row.id.toString().padStart(10, '0')
  detailData.rightsName = '示例权益' + row.id
  detailData.rightsId = 'RIGHTS' + row.id.toString().padStart(10, '0')
  detailData.promoter = '示例推广方' + row.id
  detailData.verifyCode = ''
  detailData.adPlatform = '示例广告平台'
  detailData.appName = '示例APP名称'
  detailData.appPackageName = 'com.example.app' + row.id
  detailData.handleUrl = 'https://example.com/order/' + row.id
  detailData.processResult = ''
  detailData.orderQuery = 'false'
  detailData.queryCount = '0'
  detailData.syncStatus = '结束'
  detailData.callbackCount = '0'
  detailData.callbackUrl = ''
  detailDialogVisible.value = true
}
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.search-form {
  background: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.search-form :deep(.el-form-item) {
  margin-bottom: 12px;
}

.date-separator {
  margin: 0 8px;
  color: #999;
}

.el-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.el-table :deep(.el-button) {
  margin: 0 4px;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}

.detail-header {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header-item {
  display: flex;
  align-items: center;
}

.header-item .label {
  font-weight: 500;
  color: #666;
  margin-right: 8px;
}

.header-item .value {
  color: #333;
}

.header-item .value.status.success {
  color: #67c23a;
}

.detail-section {
  margin-bottom: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  flex-wrap: wrap;
}

.info-item .label {
  font-weight: 500;
  color: #666;
  margin-right: 8px;
}

.info-item .value {
  color: #333;
}

.info-item .value.link {
  color: #409eff;
  word-break: break-all;
}
</style>