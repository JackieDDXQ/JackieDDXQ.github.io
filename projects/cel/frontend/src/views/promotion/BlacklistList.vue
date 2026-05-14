<template>
  <div class="page-container">
    <div class="page-header">
      <h2>黑名单</h2>
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
          </el-select>
        </el-form-item>
        <el-form-item label="策略类型">
          <el-select v-model="searchForm.type" placeholder="请选择策略类型" clearable style="width: 140px;">
            <el-option label="运营商" :value="1"></el-option>
            <el-option label="策划" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="createBlacklist">
        <el-icon><component :is="icons.Plus" /></el-icon>
        新建策略
      </el-button>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f8f9fa'}">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <span>{{ getTypeLabel(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ipsChannel" label="运营商/策划"></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="updateAt" label="最后更新时间" width="160"></el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="scope">
          <el-button size="small" type="primary" @click="openAddPhoneDialog(scope.row)">添加号码</el-button>
          <el-button size="small" type="primary" @click="openManagePhonesDialog(scope.row)">管理号码</el-button>
          <el-button size="small" type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteBlacklist(scope.row.id)">删除</el-button>
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

    <el-dialog title="添加号码" :visible.sync="addPhoneDialogVisible" width="480px">
      <el-form :model="addPhoneForm" label-width="100px">
        <el-form-item label="策略名称">
          <el-input v-model="addPhoneForm.strategyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="addPhoneForm.ipsChannel" placeholder="请选择运营商">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addPhoneForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="生效时间">
          <el-date-picker v-model="addPhoneForm.startTime" type="datetime" placeholder="开始时间"></el-date-picker>
          <span style="margin: 0 10px;">至</span>
          <el-date-picker v-model="addPhoneForm.endTime" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPhoneDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddPhone">确认</el-button>
      </template>
    </el-dialog>

    <el-dialog title="号码管理" :visible.sync="managePhonesDialogVisible" width="700px">
      <el-table :data="phoneList" border>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="startTime" label="生效开始时间" width="160"></el-table-column>
        <el-table-column prop="endTime" label="生效结束时间" width="160"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editPhone(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deletePhone(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="phonePageNum"
        :page-size="phonePageSize"
        :total="phoneTotal"
        @current-change="handlePhonePageChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
      ></el-pagination>
    </el-dialog>

    <el-dialog title="编辑策略" :visible.sync="editDialogVisible" width="480px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="策略名称">
          <el-input v-model="editForm.name" placeholder="请输入策略名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="editForm.type" placeholder="请选择类型">
            <el-option label="运营商" :value="1"></el-option>
            <el-option label="策划" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营商">
          <el-select v-model="editForm.ipsChannel" placeholder="请选择运营商">
            <el-option label="示例运营商A" value="示例运营商A"></el-option>
            <el-option label="示例运营商B" value="示例运营商B"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const icons = { Plus }
const router = useRouter()

const searchForm = reactive({
  name: '',
  ipsChannel: '',
  type: ''
})

const tableData = ref([
  { id: 1, name: '示例黑名单策略A', type: 1, ipsChannel: '示例运营商A', createAt: '2025-04-25 11:46:17', updateAt: '2025-04-14 11:24:11' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(1)
const deleteDialogVisible = ref(false)
const deleteId = ref(null)

const addPhoneDialogVisible = ref(false)
const addPhoneForm = reactive({
  strategyName: '',
  ipsChannel: '',
  phone: '',
  startTime: '',
  endTime: ''
})

const managePhonesDialogVisible = ref(false)
const phoneList = ref([
  { id: 1, phone: '18228728032', startTime: '2026-01-20 00:01:43', endTime: '2026-01-20 00:01:43' },
  { id: 2, phone: '18228728032', startTime: '2026-01-19 23:46:38', endTime: '2026-01-19 23:46:38' },
  { id: 3, phone: '13547554258', startTime: '2026-01-19 23:46:38', endTime: '2026-01-19 23:46:38' },
  { id: 4, phone: '13584877622', startTime: '2026-01-19 22:10:06', endTime: '2026-01-19 22:10:06' },
  { id: 5, phone: '13283734678', startTime: '2026-01-19 21:17:38', endTime: '2026-01-19 21:17:38' },
  { id: 6, phone: '13283734678', startTime: '2026-01-19 21:17:38', endTime: '2026-01-19 21:17:38' },
  { id: 7, phone: '15983661887', startTime: '2026-01-19 20:34:05', endTime: '2026-01-19 20:34:05' },
  { id: 8, phone: '18383487188', startTime: '2026-01-19 20:20:35', endTime: '2026-01-19 20:20:35' },
  { id: 9, phone: '18383423772', startTime: '2026-01-19 20:14:43', endTime: '2026-01-19 20:14:43' },
  { id: 10, phone: '18281302572', startTime: '2026-01-19 20:14:43', endTime: '2026-01-19 20:14:43' }
])
const phonePageNum = ref(1)
const phonePageSize = ref(10)
const phoneTotal = ref(185511)

const editDialogVisible = ref(false)
const editForm = reactive({
  id: '',
  name: '',
  type: 1,
  ipsChannel: ''
})

const getTypeLabel = (type) => {
  const labels = { 1: '运营商', 2: '策划' }
  return labels[type] || ''
}

const search = () => {
  pageNum.value = 1
}

const reset = () => {
  searchForm.name = ''
  searchForm.ipsChannel = ''
  searchForm.type = ''
}

const handlePageChange = (page) => {
  pageNum.value = page
}

const createBlacklist = () => {
  router.push('/blacklist/create')
}

const openAddPhoneDialog = (row) => {
  addPhoneForm.strategyName = row.name
  addPhoneForm.ipsChannel = row.ipsChannel
  addPhoneForm.phone = ''
  addPhoneForm.startTime = ''
  addPhoneForm.endTime = ''
  addPhoneDialogVisible.value = true
}

const confirmAddPhone = () => {
  addPhoneDialogVisible.value = false
  ElMessage.success('添加成功')
}

const openManagePhonesDialog = (row) => {
  managePhonesDialogVisible.value = true
}

const handlePhonePageChange = (page) => {
  phonePageNum.value = page
}

const editPhone = (row) => {
  ElMessage.info('编辑手机号')
}

const deletePhone = (id) => {
  ElMessage.success('删除成功')
}

const openEditDialog = (row) => {
  editForm.id = row.id
  editForm.name = row.name
  editForm.type = row.type
  editForm.ipsChannel = row.ipsChannel
  editDialogVisible.value = true
}

const confirmEdit = () => {
  editDialogVisible.value = false
  ElMessage.success('修改成功')
}

const deleteBlacklist = (id) => {
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
</style>