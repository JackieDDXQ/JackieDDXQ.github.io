<template>
  <div class="page-container">
    <div class="page-header">
      <h2>策划管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="移动方业务ID">
          <el-input v-model="searchForm.offerId" placeholder="请输入移动方业务ID" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="searchForm.ipsChannel" placeholder="请选择运营商" clearable style="width: 140px;">
            <el-option label="海南移动" value="海南移动"></el-option>
            <el-option label="陕西移动" value="陕西移动"></el-option>
            <el-option label="上海移动" value="上海移动"></el-option>
            <el-option label="四川移动" value="四川移动"></el-option>
            <el-option label="广东移动" value="广东移动"></el-option>
            <el-option label="山东移动" value="山东移动"></el-option>
            <el-option label="重庆移动" value="重庆移动"></el-option>
            <el-option label="贵州移动" value="贵州移动"></el-option>
            <el-option label="湖南移动" value="湖南移动"></el-option>
            <el-option label="快钱支付" value="快钱支付"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划名称">
          <el-input v-model="searchForm.offerName" placeholder="请输入策划名称" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="办理服务">
          <el-select v-model="searchForm.serviceHand" placeholder="请选择办理服务" clearable style="width: 140px;">
            <el-option label="海南移动办理服务" value="海南移动办理服务"></el-option>
            <el-option label="快钱支付" value="快钱支付"></el-option>
            <el-option label="四川移动办理服务" value="四川移动办理服务"></el-option>
            <el-option label="广东移动办理服务" value="广东移动办理服务"></el-option>
            <el-option label="重庆移动办理服务" value="重庆移动办理服务"></el-option>
            <el-option label="贵州移动办理服务" value="贵州移动办理服务"></el-option>
            <el-option label="湖南移动办理服务" value="湖南移动办理服务"></el-option>
            <el-option label="空" value="空"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入方式">
          <el-select v-model="searchForm.accessType" placeholder="请选择接入方式" clearable style="width: 120px;">
            <el-option label="同步" value="同步"></el-option>
            <el-option label="办理" value="办理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="开始日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <span class="date-separator">→</span>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="结束日期时间"></el-date-picker>
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

    <div class="action-bar">
      <el-button type="primary" @click="createPlan">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="offerId" label="移动方业务ID"></el-table-column>
      <el-table-column prop="offerName" label="策划名称"></el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="serviceHand" label="办理服务"></el-table-column>
      <el-table-column prop="accessType" label="对接方式"></el-table-column>
      <el-table-column prop="equityName" label="下发权益"></el-table-column>
      <el-table-column prop="enable" label="状态" width="80">
        <template #default="scope">
          <el-switch v-model="scope.row.enable" active-color="#10b981" inactive-color="#d9d9d9" @change="toggleStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editPlan(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="deletePlan(scope.row.id)">删除</el-button>
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

    <el-dialog title="确认删除" :visible.sync="deleteDialogVisible">
      <p>删除后无法恢复，是否确定删除？</p>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确定删除</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const icons = { Plus, Search, Refresh }
const router = useRouter()

const searchForm = reactive({
  offerId: '',
  ipsChannel: '',
  offerName: '',
  serviceHand: '',
  accessType: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  { id: 1, offerId: 'OFFER001', offerName: '示例权益包A', ipsChannel: '示例运营商A', serviceHand: '示例办理服务A', accessType: '办理', equityName: '示例下发权益A', enable: true, createAt: '2025-06-13 16:16:43' },
  { id: 2, offerId: 'OFFER002', offerName: '示例权益包B', ipsChannel: '示例运营商B', serviceHand: '示例办理服务B', accessType: '办理', equityName: '示例下发权益B', enable: true, createAt: '2025-06-12 12:12:08' },
  { id: 3, offerId: 'OFFER003', offerName: '示例权益包C', ipsChannel: '示例运营商C', serviceHand: '示例办理服务C', accessType: '同步', equityName: '示例下发权益C', enable: true, createAt: '2025-06-03 18:32:54' },
  { id: 4, offerId: 'OFFER004', offerName: '示例权益包D', ipsChannel: '示例运营商D', serviceHand: '示例办理服务D', accessType: '同步', equityName: '示例下发权益D', enable: false, createAt: '2025-06-03 09:46:10' },
  { id: 5, offerId: 'OFFER005', offerName: '示例权益包E', ipsChannel: '示例运营商E', serviceHand: '示例办理服务E', accessType: '办理', equityName: '示例下发权益E', enable: true, createAt: '2025-06-03 09:46:10' },
  { id: 6, offerId: 'OFFER006', offerName: '示例权益包F', ipsChannel: '示例运营商F', serviceHand: '示例办理服务F', accessType: '同步', equityName: '示例下发权益F', enable: true, createAt: '2025-06-03 13:36:07' },
  { id: 7, offerId: 'OFFER007', offerName: '示例权益包G', ipsChannel: '示例运营商G', serviceHand: '示例办理服务G', accessType: '同步', equityName: '示例下发权益G', enable: true, createAt: '2025-06-03 13:13:51' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(46)
const deleteDialogVisible = ref(false)
const deleteId = ref(null)

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.offerId = ''
  searchForm.ipsChannel = ''
  searchForm.offerName = ''
  searchForm.serviceHand = ''
  searchForm.accessType = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const createPlan = () => {
  router.push('/plan/create')
}

const editPlan = (id) => {
  router.push(`/plan/edit/${id}`)
}

const deletePlan = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  deleteDialogVisible.value = false
  ElMessage.success('删除成功')
}

const toggleStatus = (row) => {
  ElMessage.success(row.enable ? '已启用' : '已禁用')
}

onMounted(() => {})
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

.search-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #666;
}

.date-separator {
  margin: 0 8px;
  color: #999;
}

.action-bar {
  margin-bottom: 16px;
}

.el-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.el-table :deep(.el-table__header-wrapper) {
  border-radius: 8px 8px 0 0;
}

.el-table :deep(.el-table__body-wrapper) {
  border-radius: 0 0 8px 8px;
}

.el-table :deep(.el-button) {
  margin: 0 4px;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>