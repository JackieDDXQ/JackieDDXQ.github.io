<template>
  <div class="page-container">
    <div class="page-header">
      <h2>模板管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="模板ID">
          <el-input v-model="searchForm.id" placeholder="请输入模板ID" clearable style="width: 140px;"></el-input>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="searchForm.name" placeholder="请输入模板名称" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="所属策划">
          <el-select v-model="searchForm.planId" placeholder="请选择策划" clearable style="width: 140px;">
            <el-option label="示例策划A" value="PLAN001"></el-option>
            <el-option label="示例策划B" value="PLAN002"></el-option>
            <el-option label="示例策划C" value="PLAN003"></el-option>
            <el-option label="示例策划D" value="PLAN004"></el-option>
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
      <el-button type="primary" @click="createTemplate">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="id" label="模板ID" width="80"></el-table-column>
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column prop="planName" label="所属策划"></el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="serviceHand" label="办理服务"></el-table-column>
      <el-table-column prop="referenceUrl" label="参考链接"></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editTemplate(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteTemplate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNum"
      v-model:page-size="pageSize"
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
  planId: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  { id: 7, name: '示例模板A', planName: '示例策划A - PLAN001', ipsChannel: '示例运营商A', serviceHand: '示例办理服务A', referenceUrl: 'https://example.com/template/001', createAt: '2025-06-13 18:17:00' },
  { id: 6, name: '示例模板B', planName: '示例策划B - PLAN002', ipsChannel: '示例运营商B', serviceHand: '示例办理服务B', referenceUrl: 'https://example.com/template/002', createAt: '2025-06-12 11:20:22' },
  { id: 5, name: '示例模板C', planName: '示例策划C - PLAN003', ipsChannel: '示例运营商C', serviceHand: '示例办理服务C', referenceUrl: 'https://example.com/template/003', createAt: '2025-06-03 18:34:59' },
  { id: 4, name: '示例模板D', planName: '示例策划D - PLAN004', ipsChannel: '示例运营商D', serviceHand: '示例办理服务D', referenceUrl: 'https://example.com/template/004', createAt: '2025-03-31 08:47:29' },
  { id: 3, name: '示例模板E', planName: '示例策划A - PLAN001', ipsChannel: '示例运营商A', serviceHand: '示例办理服务A', referenceUrl: 'https://example.com/template/005', createAt: '2025-03-31 08:47:29' },
  { id: 2, name: '示例模板F', planName: '示例策划B - PLAN002', ipsChannel: '示例运营商B', serviceHand: '示例办理服务B', referenceUrl: 'https://example.com/template/006', createAt: '2025-03-13 18:09:14' },
  { id: 1, name: '示例模板G', planName: '示例策划C - PLAN003', ipsChannel: '示例运营商C', serviceHand: '示例办理服务C', referenceUrl: 'https://example.com/template/007', createAt: '2025-03-13 18:07:55' }
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
  searchForm.id = ''
  searchForm.name = ''
  searchForm.planId = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const createTemplate = () => {
  router.push('/template/create')
}

const editTemplate = (id) => {
  router.push(`/template/edit/${id}`)
}

const deleteTemplate = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  deleteDialogVisible.value = false
  ElMessage.success('删除成功')
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
