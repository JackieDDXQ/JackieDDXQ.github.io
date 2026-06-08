<template>
  <div class="page-container">
    <div class="page-header">
      <h2>应用列表</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="AppId">
          <el-input v-model="searchForm.appId" placeholder="请输入AppId" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item label="应用名称">
          <el-input v-model="searchForm.name" placeholder="请输入应用名称" clearable style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">
            <el-icon><component :is="icons.Search" /></el-icon>
            搜索
          </el-button>
          <el-button @click="reset">
            <el-icon><component :is="icons.Refresh" /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="openCreateDialog">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="appId" label="AppId"></el-table-column>
      <el-table-column prop="name" label="应用名称"></el-table-column>
      <el-table-column prop="description" label="应用描述"></el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="validDate" label="有效期" width="140"></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteApp(scope.row.id)">下架</el-button>
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

    <el-dialog :title="isEdit ? '编辑应用' : '新建应用'" :visible.sync="formDialogVisible" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="应用名称" required>
          <el-input v-model="formData.name" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入应用描述" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="formData.validDate" type="datetime" placeholder="请选择有效期"></el-date-picker>
        </el-form-item>
        <el-form-item label="开启白名单">
          <el-switch v-model="formData.whiteListEnabled" active-text="开启" inactive-text="关闭"></el-switch>
        </el-form-item>
        <el-form-item label="通知URL">
          <el-input v-model="formData.notifyUrl" placeholder="请输入通知URL"></el-input>
        </el-form-item>
        <el-form-item label="通知URL">
          <el-input v-model="formData.notifyUrl2" placeholder="请输入通知URL"></el-input>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSave">{{ isEdit ? '保存' : '保存' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const icons = { Plus, Search, Refresh }

const searchForm = reactive({
  appId: '',
  name: ''
})

const tableData = ref([
  { id: 1, appId: 'APP0001', name: '示例应用A', description: '示例应用描述A', status: 1, validDate: '2028-01-02 02:22:24', createAt: '2025-04-02 18:22:31' },
  { id: 2, appId: 'APP0002', name: '示例应用B', description: '示例应用描述B', status: 1, validDate: '2031-03-31 05:13:51', createAt: '2025-03-12 21:14:08' },
  { id: 3, appId: 'APP0003', name: '示例应用C', description: '四川斯特雷普应用描述', status: 1, validDate: '-', createAt: '2025-04-13 10:21:43' },
  { id: 4, appId: 'APP0004', name: '示例应用D', description: '万象平台', status: 1, validDate: '2028-04-01 04:08:50', createAt: '2025-03-12 20:09:20' }
])

const pageNum = ref(2)
const pageSize = ref(10)
const total = ref(13)

const formDialogVisible = ref(false)
const isEdit = ref(false)
const formData = reactive({
  id: '',
  name: '',
  description: '',
  validDate: '',
  whiteListEnabled: false,
  notifyUrl: '',
  notifyUrl2: '',
  status: 1
})

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.appId = ''
  searchForm.name = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const openCreateDialog = () => {
  isEdit.value = false
  formData.id = ''
  formData.name = ''
  formData.description = ''
  formData.validDate = ''
  formData.whiteListEnabled = false
  formData.notifyUrl = ''
  formData.notifyUrl2 = ''
  formData.status = 1
  formDialogVisible.value = true
}

const openEditDialog = (row) => {
  isEdit.value = true
  formData.id = row.id
  formData.name = row.name
  formData.description = row.description
  formData.validDate = row.validDate === '-' ? '' : row.validDate
  formData.whiteListEnabled = false
  formData.notifyUrl = ''
  formData.notifyUrl2 = ''
  formData.status = row.status
  formDialogVisible.value = true
}

const confirmSave = () => {
  formDialogVisible.value = false
  ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
}

const deleteApp = (id) => {
  ElMessage.success('下架成功')
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
</style>