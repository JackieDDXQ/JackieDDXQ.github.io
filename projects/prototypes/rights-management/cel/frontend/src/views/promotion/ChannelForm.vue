
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑渠道' : '新建渠道' }}</h2>
      <div>
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>

    <el-form :model="formData" :rules="rules" ref="formRef" class="form-container">
      <el-form-item label="渠道名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="渠道类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择渠道类型">
          <el-option label="出资方" :value="1"></el-option>
          <el-option label="推广方" :value="2"></el-option>
          <el-option label="出资方及推广方" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status">
          <el-option label="上线" :value="1"></el-option>
          <el-option label="下线" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="AppId" prop="appId">
        <el-input v-model="formData.appId" placeholder="请输入AppId"></el-input>
      </el-form-item>
      <el-form-item label="公钥">
        <el-input type="textarea" v-model="formData.publicKey" placeholder="请输入公钥"></el-input>
      </el-form-item>
      <el-form-item label="私钥">
        <el-input type="textarea" v-model="formData.privateKey" placeholder="请输入私钥"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { channelApi } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  name: '',
  type: '',
  status: 1,
  appId: '',
  publicKey: '',
  privateKey: ''
})

const rules = {
  name: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择渠道类型', trigger: 'change' }],
  appId: [{ required: true, message: '请输入AppId', trigger: 'blur' }]
}

const goBack = () => {
  router.push('/channel')
}

const save = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return
  })

  try {
    if (isEdit.value) {
      await channelApi.update(formData)
      ElMessage.success('编辑成功')
    } else {
      await channelApi.save(formData)
      ElMessage.success('创建成功')
    }
    goBack()
  } catch (error) {
    ElMessage.error(error || '保存失败')
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEdit.value = true
    const res = await channelApi.get(id)
    Object.assign(formData, res.data)
  }
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

.form-container {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-container :deep(.el-form-item) {
  margin-bottom: 20px;
}
</style>
