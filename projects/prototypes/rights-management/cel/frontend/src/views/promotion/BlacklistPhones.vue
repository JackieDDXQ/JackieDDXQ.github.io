
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ strategyName }} > 管理手机号</h2>
      <div>
        <el-button type="primary" @click="addPhone">添加号码</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phoneNumber" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border :selectable="handleSelectable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="effectiveStart" label="禁办开始时间"></el-table-column>
      <el-table-column prop="effectiveEnd" label="禁办结束时间"></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button link @click="editPhone(scope.row)">编辑</el-button>
          <el-button link @click="deletePhone(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="batch-actions">
      <span>已选择 {{ selectedIds.length }} 项</span>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </div>

    <el-pagination
      :current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog title="添加/编辑号码" :visible.sync="phoneDialogVisible">
      <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormRef">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="phoneForm.phoneNumber" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="禁办开始时间" prop="effectiveStart">
          <el-date-picker v-model="phoneForm.effectiveStart" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="禁办结束时间" prop="effectiveEnd">
          <el-date-picker v-model="phoneForm.effectiveEnd" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="phoneDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePhone">保存</el-button>
      </template>
    </el-dialog>

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
import { useRouter, useRoute } from 'vue-router'
import { blacklistApi } from '../../api'

const router = useRouter()
const route = useRoute()

const strategyId = ref(null)
const strategyName = ref('')

const searchForm = reactive({
  phoneNumber: ''
})

const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const phoneDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const deleteId = ref(null)
const isEditPhone = ref(false)

const selectedIds = ref([])

const phoneForm = reactive({
  id: '',
  strategyId: '',
  phoneNumber: '',
  effectiveStart: '',
  effectiveEnd: ''
})

const phoneRules = {
  phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  effectiveStart: [{ required: true, message: '请选择禁办开始时间', trigger: 'blur' }],
  effectiveEnd: [{ required: true, message: '请选择禁办结束时间', trigger: 'blur' }]
}

const handleSelectable = () => true

const handleSelectionChange = (val) => {
  selectedIds.value = val.map(item => item.id)
}

const search = () => {
  pageNum.value = 1
  loadData()
}

const reset = () => {
  searchForm.phoneNumber = ''
  search()
}

const loadData = async () => {
  const params = {
    strategyId: strategyId.value,
    phoneNumber: searchForm.phoneNumber,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  const res = await blacklistApi.phoneList(params)
  tableData.value = res.data.records
  total.value = res.data.total
}

const handlePageChange = (page) => {
  pageNum.value = page
  loadData()
}

const goBack = () => {
  router.push('/blacklist')
}

const addPhone = () => {
  isEditPhone.value = false
  phoneForm.id = ''
  phoneForm.strategyId = strategyId.value
  phoneForm.phoneNumber = ''
  phoneForm.effectiveStart = ''
  phoneForm.effectiveEnd = ''
  phoneDialogVisible.value = true
}

const editPhone = (row) => {
  isEditPhone.value = true
  phoneForm.id = row.id
  phoneForm.strategyId = row.strategyId
  phoneForm.phoneNumber = row.phoneNumber
  phoneForm.effectiveStart = row.effectiveStart
  phoneForm.effectiveEnd = row.effectiveEnd
  phoneDialogVisible.value = true
}

const savePhone = async () => {
  try {
    if (isEditPhone.value) {
      await blacklistApi.phoneUpdate(phoneForm)
      ElMessage.success('编辑成功')
    } else {
      await blacklistApi.phoneSave(phoneForm)
      ElMessage.success('添加成功')
    }
    phoneDialogVisible.value = false
    loadData()
  } catch (error) {
    ElMessage.error(error || '保存失败')
  }
}

const deletePhone = (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  const res = await blacklistApi.phoneDelete(deleteId.value)
  if (res.code === 200) {
    deleteDialogVisible.value = false
    loadData()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

const batchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的项')
    return
  }
  const res = await blacklistApi.phoneBatchDelete(selectedIds.value)
  if (res.code === 200) {
    loadData()
    selectedIds.value = []
    ElMessage.success('批量删除成功')
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

onMounted(async () => {
  strategyId.value = parseInt(route.params.id)
  const res = await blacklistApi.strategyGet(strategyId.value)
  strategyName.value = res.data.name
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

.batch-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
