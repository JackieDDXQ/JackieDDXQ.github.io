
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>应用配置</h2>
    </div>

    <el-card class="config-card">
      <el-form :model="configForm" label-width="120px">
        <el-form-item label="系统名称">
          <el-input v-model="configForm.systemName" placeholder="请输入系统名称"></el-input>
        </el-form-item>
        <el-form-item label="系统版本">
          <el-input v-model="configForm.version" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
          <el-input v-model="configForm.apiUrl" placeholder="请输入API地址"></el-input>
        </el-form-item>
        <el-form-item label="超时时间">
          <el-input v-model="configForm.timeout" placeholder="请输入超时时间（秒）"></el-input>
        </el-form-item>
        <el-form-item label="日志级别">
          <el-select v-model="configForm.logLevel" placeholder="请选择日志级别">
            <el-option label="DEBUG" value="DEBUG"></el-option>
            <el-option label="INFO" value="INFO"></el-option>
            <el-option label="WARN" value="WARN"></el-option>
            <el-option label="ERROR" value="ERROR"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveConfig">保存配置</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const configForm = reactive({
  systemName: '灵霄系统',
  version: '1.0.0',
  apiUrl: 'http://localhost:8080/api',
  timeout: '30',
  logLevel: 'INFO'
})

const saveConfig = () => {
  ElMessage.success('配置保存成功')
}

const resetForm = () => {
  configForm.systemName = '灵霄系统'
  configForm.version = '1.0.0'
  configForm.apiUrl = 'http://localhost:8080/api'
  configForm.timeout = '30'
  configForm.logLevel = 'INFO'
}
</script>

<style scoped>
.page-container { padding: 20px; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
.config-card { max-width: 600px; }
</style>
