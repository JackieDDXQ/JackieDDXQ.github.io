<template>
  <div class="page-container">
    <div class="page-header">
      <h2>限办策略</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="策略名称">
          <el-input v-model="searchForm.name" placeholder="请输入策略名称" clearable style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="searchForm.ipsChannel" placeholder="请选择运营商" clearable style="width: 140px;">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
            <el-option label="系统" value="系统"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略类型">
          <el-select v-model="searchForm.type" placeholder="请选择策略类型" clearable style="width: 120px;">
            <el-option label="限量策略" :value="1"></el-option>
            <el-option label="限时策略" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略状态">
          <el-select v-model="searchForm.status" placeholder="请选择策略状态" clearable style="width: 120px;">
            <el-option label="生效" :value="1"></el-option>
            <el-option label="未生效" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="openCreateDialog">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新增策略
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="id" label="策略ID"></el-table-column>
      <el-table-column prop="name" label="策略名称"></el-table-column>
      <el-table-column prop="type" label="策略类型">
        <template #default="scope">
          <span>{{ getTypeLabel(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ipsChannel" label="运营商"></el-table-column>
      <el-table-column prop="status" label="策略状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">
            {{ scope.row.status === 1 ? '生效' : '未生效' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="updateAt" label="最后更新时间" width="160"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <el-dialog title="基本信息" :visible.sync="createDialogVisible" width="480px">
      <el-form :model="createForm" label-width="100px">
        <el-form-item label="运营商" required>
          <el-select v-model="createForm.ipsChannel" placeholder="请选择运营商">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略类型" required>
          <el-radio-group v-model="createForm.type">
            <el-radio :value="1">限量策略</el-radio>
            <el-radio :value="2">限时策略</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="策略名称" required>
          <el-input v-model="createForm.name" placeholder="请输入策略名称"></el-input>
        </el-form-item>
        <el-form-item :label="createForm.type === 1 ? '限量时间' : '限时时间'">
          <el-date-picker v-model="createForm.startTime" type="datetime" placeholder="开始时间"></el-date-picker>
          <span style="margin: 0 10px;">-</span>
          <el-date-picker v-model="createForm.endTime" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item v-if="createForm.type === 1" label="允许办理个数">
          <el-input-number v-model="createForm.limitCount" :min="0" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="策略状态">
          <el-switch v-model="createForm.status" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCreate">确认</el-button>
      </template>
    </el-dialog>

    <el-dialog title="限办策略详情" :visible.sync="detailDialogVisible" width="700px">
      <div class="detail-section">
        <h3 class="section-title">基本信息</h3>
        <div class="detail-grid">
          <div class="grid-item">
            <span class="detail-label">策略名称：</span>
            <span class="detail-value">{{ detailData.name }}</span>
          </div>
          <div class="grid-item">
            <span class="detail-label">运营商：</span>
            <span class="detail-value">{{ detailData.ipsChannel }}</span>
          </div>
          <div class="grid-item">
            <span class="detail-label">限量时间：</span>
            <span class="detail-value">{{ detailData.limitTime }}</span>
          </div>
          <div class="grid-item">
            <span class="detail-label">策略类型：</span>
            <span class="detail-value">{{ getTypeLabel(detailData.type) }}</span>
          </div>
          <div class="grid-item">
            <span class="detail-label">允许办理个数：</span>
            <span class="detail-value">{{ detailData.limitCount }}</span>
          </div>
          <div class="grid-item">
            <span class="detail-label">策略状态：</span>
            <span class="detail-value">{{ detailData.status === 1 ? '生效' : '未生效' }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 class="section-title">策划信息</h3>
          <el-button type="primary" size="small">新增策划</el-button>
        </div>
        <el-table :data="detailData.plans" border>
          <el-table-column prop="planName" label="策划名称"></el-table-column>
          <el-table-column prop="dailyLimit" label="每日允许办理量"></el-table-column>
          <el-table-column prop="limitTime" label="限量时间"></el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" type="primary">查看详情</el-button>
              <el-button size="small" type="primary">修改渠道</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="detailDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">编辑</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const icons = { Plus }

const searchForm = reactive({
  name: '',
  ipsChannel: '',
  type: '',
  status: ''
})

const tableData = ref([
  { id: 'QUOTA001', name: '示例策略A', type: 1, ipsChannel: '示例运营商A', status: 1, createAt: '2025-05-22 15:48:09', updateAt: '2025-10-29 17:54:11' },
  { id: 'QUOTA002', name: '示例策略B', type: 2, ipsChannel: '系统', status: 1, createAt: '2025-05-21 11:09:28', updateAt: '2025-10-29 17:55:59' },
  { id: 'QUOTA003', name: '示例策略C', type: 1, ipsChannel: '示例运营商A', status: 1, createAt: '2025-05-19 10:11:27', updateAt: '2025-10-29 17:55:59' },
  { id: 'QUOTA004', name: '示例策略D', type: 2, ipsChannel: '示例运营商B', status: 0, createAt: '2025-05-07 17:33:03', updateAt: '2025-05-22 13:36:41' },
  { id: 'QUOTA005', name: '示例策略E', type: 1, ipsChannel: '示例运营商B', status: 1, createAt: '2025-05-06 15:21:04', updateAt: '2025-05-23 10:16:52' },
  { id: 'QUOTA006', name: '示例策略F', type: 1, ipsChannel: '示例运营商B', status: 1, createAt: '2025-02-27 10:26:56', updateAt: '2025-05-21 14:45:27' },
  { id: 'QUOTA007', name: '示例策略G', type: 1, ipsChannel: '示例运营商A', status: 1, createAt: '2025-02-25 08:24:24', updateAt: '2025-10-29 17:55:59' },
  { id: 'QUOTA008', name: '示例策略H', type: 2, ipsChannel: '示例运营商A', status: 1, createAt: '2025-02-24 11:01:56', updateAt: '2025-10-29 17:55:59' },
  { id: 'QUOTA009', name: '示例策略I', type: 2, ipsChannel: '示例运营商A', status: 1, createAt: '2025-02-24 11:01:56', updateAt: '2025-10-29 17:55:59' },
  { id: 'QUOTA010', name: '示例策略J', type: 1, ipsChannel: '系统', status: 1, createAt: '2025-02-23 09:58:04', updateAt: '2025-05-07 17:34:57' }
])

const pageNum = ref(2)
const pageSize = ref(10)
const total = ref(19)

const deleteDialogVisible = ref(false)
const deleteId = ref(null)

const createDialogVisible = ref(false)
const createForm = reactive({
  ipsChannel: '',
  type: 1,
  name: '',
  startTime: '',
  endTime: '',
  limitCount: 0,
  status: '1'
})

const detailDialogVisible = ref(false)
const detailData = reactive({
  name: '',
  ipsChannel: '',
  type: 1,
  limitTime: '-',
  limitCount: 0,
  status: 1,
  plans: []
})

const getTypeLabel = (type) => {
  const labels = { 1: '限量策略', 2: '限时策略' }
  return labels[type] || ''
}

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.name = ''
  searchForm.ipsChannel = ''
  searchForm.type = ''
  searchForm.status = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const openCreateDialog = () => {
  createForm.ipsChannel = ''
  createForm.type = 1
  createForm.name = ''
  createForm.startTime = ''
  createForm.endTime = ''
  createForm.limitCount = 0
  createForm.status = '1'
  createDialogVisible.value = true
}

const confirmCreate = () => {
  createDialogVisible.value = false
  ElMessage.success('创建成功')
}

const handleEdit = (row) => {
  detailData.name = row.name
  detailData.ipsChannel = row.ipsChannel
  detailData.type = row.type
  detailData.limitTime = '-'
  detailData.limitCount = 2
  detailData.status = row.status
  detailData.plans = [
    { planName: '示例策划A', dailyLimit: 0, limitTime: '-' },
    { planName: '示例策划B', dailyLimit: 1, limitTime: '-' }
  ]
  detailDialogVisible.value = true
}

const confirmEdit = () => {
  detailDialogVisible.value = false
  ElMessage.success('修改成功')
}

const handleDelete = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = () => {
  deleteDialogVisible.value = false
  ElMessage.success('删除成功')
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

.action-bar {
  margin-bottom: 16px;
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

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.grid-item {
  display: flex;
  flex-wrap: wrap;
}

.detail-label {
  font-weight: 500;
  color: #666;
}

.detail-value {
  color: #333;
}
</style>
