
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>操作日志</h2>
    </div>

    <div class="search-form">
      <el-form :model="searchForm" inline>
        <el-form-item label="操作用户">
          <el-input v-model="searchForm.user" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="searchForm.type" placeholder="请选择操作类型" clearable>
            <el-option label="新增" value="create"></el-option>
            <el-option label="编辑" value="update"></el-option>
            <el-option label="删除" value="delete"></el-option>
            <el-option label="查询" value="query"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <span class="date-separator">→</span>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="日志ID" width="80"></el-table-column>
      <el-table-column prop="user" label="操作用户"></el-table-column>
      <el-table-column prop="type" label="操作类型">
        <template #default="scope">
          <el-tag :type="getTypeTag(scope.row.type)">{{ getTypeLabel(scope.row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="module" label="操作模块"></el-table-column>
      <el-table-column prop="content" label="操作内容"></el-table-column>
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="createAt" label="操作时间" width="180"></el-table-column>
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
  user: '',
  type: '',
  startDate: '',
  endDate: ''
})

const tableData = ref([
  { id: 1, user: 'admin', type: 'create', module: '策划管理', content: '新增策划：椰岛天猫权益包', ip: '192.168.1.100', createAt: '2026-04-27 17:57:36' },
  { id: 2, user: 'admin', type: 'update', module: '渠道管理', content: '编辑渠道：文彦', ip: '192.168.1.100', createAt: '2026-04-27 17:55:20' },
  { id: 3, user: 'operator', type: 'query', module: '订单管理', content: '查询订单列表', ip: '192.168.1.101', createAt: '2026-04-27 17:50:15' },
  { id: 4, user: 'admin', type: 'delete', module: '黑名单', content: '删除黑名单手机号', ip: '192.168.1.100', createAt: '2026-04-27 17:45:30' },
  { id: 5, user: 'operator', type: 'create', module: '推广管理', content: '新增推广：椰岛霸王茶姬权益包', ip: '192.168.1.101', createAt: '2026-04-27 17:40:00' }
])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(128)

const getTypeLabel = (type) => {
  const labels = { create: '新增', update: '编辑', delete: '删除', query: '查询' }
  return labels[type] || type
}

const getTypeTag = (type) => {
  const tags = { create: 'success', update: 'warning', delete: 'danger', query: 'info' }
  return tags[type] || ''
}

const search = () => {}
const reset = () => {
  searchForm.user = ''
  searchForm.type = ''
  searchForm.startDate = ''
  searchForm.endDate = ''
}
const handlePageChange = (page) => {
  pageNum.value = page
}
</script>

<style scoped>
.page-container { padding: 20px; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
.search-form { background: #fff; padding: 16px 20px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.date-separator { margin: 0 8px; color: #999; }
.el-table { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.el-pagination { margin-top: 20px; text-align: right; }
</style>
