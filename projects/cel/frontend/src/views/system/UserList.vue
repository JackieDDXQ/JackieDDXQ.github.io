
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>用户管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.role" placeholder="请选择角色" clearable>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="操作员" value="operator"></el-option>
            <el-option label="查看员" value="viewer"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="createUser">新建</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-color="#10b981" inactive-color="#ef4444"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button type="text" @click="editUser(scope.row.id)">编辑</el-button>
          <el-button type="text" class="delete-btn" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const searchForm = reactive({
  username: '',
  role: ''
})

const tableData = ref([
  { id: 1, username: 'admin', realName: '管理员', email: 'admin@example.com', role: '管理员', status: 1, createAt: '2026-01-01 10:00:00' },
  { id: 2, username: 'operator', realName: '操作员', email: 'operator@example.com', role: '操作员', status: 1, createAt: '2026-01-02 11:00:00' },
  { id: 3, username: 'viewer', realName: '查看员', email: 'viewer@example.com', role: '查看员', status: 1, createAt: '2026-01-03 14:00:00' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(3)

const search = () => {}
const reset = () => {
  searchForm.username = ''
  searchForm.role = ''
}
const handlePageChange = (page) => {
  pageNum.value = page
}
const createUser = () => {}
const editUser = (id) => {}
const deleteUser = (id) => {}
</script>

<style scoped>
.page-container { padding: 20px; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
.search-form { background: #fff; padding: 16px 20px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.action-bar { margin-bottom: 16px; }
.el-table { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.delete-btn { color: #ef4444; }
.el-pagination { margin-top: 20px; text-align: right; }
</style>
