<template>
  <div class="page-container">
    <div class="page-header">
      <h2>渠道管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="渠道ID">
          <el-input v-model="searchForm.id" placeholder="请输入渠道ID" clearable style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input v-model="searchForm.name" placeholder="请输入渠道名称" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="渠道类型">
          <el-select v-model="searchForm.type" placeholder="请选择渠道类型" clearable style="width: 140px;">
            <el-option label="出资方" value="1"></el-option>
            <el-option label="推广方" value="2"></el-option>
            <el-option label="出资方及推广方" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 100px;">
            <el-option label="上线" value="1"></el-option>
            <el-option label="下线" value="0"></el-option>
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
      <el-button type="primary" @click="createChannel">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="id" label="渠道ID" width="80"></el-table-column>
      <el-table-column prop="name" label="渠道名称"></el-table-column>
      <el-table-column prop="type" label="渠道类型">
        <template #default="scope">
          <span>{{ getTypeLabel(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-color="#10b981" inactive-color="#d9d9d9" @change="toggleStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editChannel(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteChannel(scope.row.id)">删除</el-button>
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
  id: '',
  name: '',
  type: '',
  status: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  { id: 4, name: '示例渠道A', type: 3, status: 1, createAt: '2025-03-12 10:10:08' },
  { id: 3, name: '示例渠道B', type: 2, status: 0, createAt: '2025-04-02 16:30:05' },
  { id: 2, name: '示例渠道C', type: 2, status: 0, createAt: '2025-03-12 11:42:36' },
  { id: 1, name: '示例渠道D', type: 2, status: 0, createAt: '2025-04-02 16:30:05' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(13)
const deleteDialogVisible = ref(false)
const deleteId = ref(null)

const getTypeLabel = (type) => {
  const labels = { 1: '出资方', 2: '推广方', 3: '出资方及推广方' }
  return labels[type] || ''
}

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.id = ''
  searchForm.name = ''
  searchForm.type = ''
  searchForm.status = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const createChannel = () => {
  router.push('/channel/create')
}

const editChannel = (id) => {
  router.push(`/channel/edit/${id}`)
}

const deleteChannel = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  deleteDialogVisible.value = false
  ElMessage.success('删除成功')
}

const toggleStatus = (row) => {
  ElMessage.success(row.status ? '已上线' : '已下线')
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