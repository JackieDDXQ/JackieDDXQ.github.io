
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>角色管理</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="action-bar">
      <el-button type="primary" @click="createRole">新建</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="角色ID" width="80"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="code" label="角色编码"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column prop="permissions" label="权限列表">
        <template #default="scope">
          <span class="permission-tags">
            <el-tag v-for="p in scope.row.permissions" :key="p" size="small">{{ p }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button link @click="editRole(scope.row.id)">编辑</el-button>
          <el-button link @click="assignPermission(scope.row.id)">权限配置</el-button>
          <el-button link class="delete-btn" @click="deleteRole(scope.row.id)">删除</el-button>
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
import { ref, reactive } from 'vue'

const searchForm = reactive({
  name: ''
})

const tableData = ref([
  { id: 1, name: '管理员', code: 'admin', description: '系统管理员', permissions: ['全部权限'], createAt: '2026-01-01 10:00:00' },
  { id: 2, name: '操作员', code: 'operator', description: '业务操作员', permissions: ['订单管理', '会员管理'], createAt: '2026-01-02 11:00:00' },
  { id: 3, name: '查看员', code: 'viewer', description: '只读查看员', permissions: ['查看权限'], createAt: '2026-01-03 14:00:00' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(3)

const search = () => {}
const reset = () => {
  searchForm.name = ''
}
const handlePageChange = (page) => {
  pageNum.value = page
}
const createRole = () => {}
const editRole = (id) => {}
const assignPermission = (id) => {}
const deleteRole = (id) => {}
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
.permission-tags { display: flex; flex-wrap: wrap; gap: 4px; }
</style>
