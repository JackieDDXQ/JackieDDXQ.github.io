
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>会员管理</h2>
    </div>

    <div class="tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="已订购" name="subscribed"></el-tab-pane>
        <el-tab-pane label="已退订" name="unsubscribed"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phoneNumber" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderId" placeholder="请输入订单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-input v-model="searchForm.ipsChannel" placeholder="请输入运营商" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="productName" label="订购名称"></el-table-column>
      <el-table-column prop="offerName" label="策划名称"></el-table-column>
      <el-table-column prop="subscribeAt" label="订购时间" width="150"></el-table-column>
      <el-table-column prop="unsubscribeAt" label="退订时间" width="150"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button link @click="viewDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { orderApi } from '../../api'

const router = useRouter()

const activeTab = ref('subscribed')

const searchForm = reactive({
  phoneNumber: '',
  orderId: '',
  ipsChannel: ''
})

const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const search = () => {
  pageNum.value = 1
  loadData()
}

const reset = () => {
  searchForm.phoneNumber = ''
  searchForm.orderId = ''
  searchForm.ipsChannel = ''
  search()
}

const loadData = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    status: activeTab.value === 'subscribed' ? '1' : '2',
    ...searchForm
  }
  const res = await orderApi.list(params)
  tableData.value = res.data.records
  total.value = res.data.total
}

const handlePageChange = (page) => {
  pageNum.value = page
  loadData()
}

const viewDetail = (id) => {
  router.push(`/member/detail/${id}`)
}

watch(activeTab, () => {
  search()
})

onMounted(() => {
  loadData()
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

.tabs {
  margin-bottom: 20px;
}

.search-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.el-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
