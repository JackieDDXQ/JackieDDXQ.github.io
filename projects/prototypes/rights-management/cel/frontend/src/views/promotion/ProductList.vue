<template>
  <div class="page-container">
    <div class="page-header">
      <h2>推广管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="推广编码">
          <el-input v-model="searchForm.code" placeholder="请输入推广编码" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="推广名称">
          <el-input v-model="searchForm.name" placeholder="请输入推广名称" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="searchForm.ipsChannel" placeholder="请选择运营商" clearable style="width: 140px;">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
            <el-option label="示例运营商C" value="示例运营商C"></el-option>
            <el-option label="示例运营商D" value="示例运营商D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划">
          <el-select v-model="searchForm.planName" placeholder="请搜索策划" clearable style="width: 180px;">
            <el-option label="示例策划A" value="示例策划A"></el-option>
            <el-option label="示例策划B" value="示例策划B"></el-option>
            <el-option label="示例策划C" value="示例策划C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广方">
          <el-select v-model="searchForm.promoter" placeholder="请搜索推广方" clearable style="width: 120px;">
            <el-option label="示例推广方A" value="示例推广方A"></el-option>
            <el-option label="示例推广方B" value="示例推广方B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出资方">
          <el-select v-model="searchForm.investor" placeholder="请搜索出资方" clearable style="width: 120px;">
            <el-option label="示例出资方A" value="示例出资方A"></el-option>
            <el-option label="示例出资方B" value="示例出资方B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 100px;">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
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
      <el-button type="primary" @click="createProduct">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="code" label="推广编码"></el-table-column>
      <el-table-column prop="name" label="推广名称"></el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="planName" label="所属策划"></el-table-column>
      <el-table-column prop="templateName" label="策划模板"></el-table-column>
      <el-table-column prop="promoter" label="推广方"></el-table-column>
      <el-table-column prop="investor" label="出资方"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-color="#10b981" inactive-color="#d9d9d9" @change="toggleStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editProduct(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteProduct(scope.row.id)">删除</el-button>
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
  code: '',
  name: '',
  ipsChannel: '',
  planName: '',
  promoter: '',
  investor: '',
  status: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  { id: 1, code: 'PROD001', name: '示例推广产品A', ipsChannel: '示例运营商A', planName: '示例策划A', templateName: '示例模板A', promoter: '示例推广方A', investor: '示例出资方A', status: true, createAt: '2025-04-03 09:42:41' },
  { id: 2, code: 'PROD002', name: '示例推广产品B', ipsChannel: '示例运营商B', planName: '示例策划B', templateName: '示例模板B', promoter: '示例推广方B', investor: '示例出资方B', status: true, createAt: '2025-04-02 18:13:27' },
  { id: 3, code: 'PROD003', name: '示例推广产品C', ipsChannel: '示例运营商C', planName: '示例策划C', templateName: '示例模板C', promoter: '示例推广方A', investor: '示例出资方A', status: true, createAt: '2025-04-02 18:13:00' },
  { id: 4, code: 'PROD004', name: '示例推广产品D', ipsChannel: '示例运营商D', planName: '示例策划D', templateName: '示例模板D', promoter: '示例推广方B', investor: '示例出资方B', status: true, createAt: '2025-04-02 18:13:00' },
  { id: 5, code: 'PROD005', name: '示例推广产品E', ipsChannel: '示例运营商A', planName: '示例策划A', templateName: '示例模板E', promoter: '示例推广方A', investor: '示例出资方A', status: false, createAt: '2025-03-13 18:09:41' },
  { id: 6, code: 'PROD006', name: '示例推广产品F', ipsChannel: '示例运营商B', planName: '示例策划B', templateName: '示例模板F', promoter: '示例推广方B', investor: '示例出资方B', status: true, createAt: '2025-03-13 18:08:19' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(75)
const deleteDialogVisible = ref(false)
const deleteId = ref(null)

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.code = ''
  searchForm.name = ''
  searchForm.ipsChannel = ''
  searchForm.planName = ''
  searchForm.promoter = ''
  searchForm.investor = ''
  searchForm.status = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const createProduct = () => {
  router.push('/product/create')
}

const editProduct = (id) => {
  router.push(`/product/edit/${id}`)
}

const deleteProduct = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  deleteDialogVisible.value = false
  ElMessage.success('删除成功')
}

const toggleStatus = (row) => {
  ElMessage.success(row.status ? '已上架' : '已下架')
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
