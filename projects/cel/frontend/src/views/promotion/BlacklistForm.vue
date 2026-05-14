
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑黑名单策略' : '新建黑名单策略' }}</h2>
      <div>
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>

    <el-form :model="formData" :rules="rules" ref="formRef" class="form-container">
      <el-form-item label="策略名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入策略名称"></el-input>
      </el-form-item>
      <el-form-item label="策略类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择策略类型">
          <el-option label="运营商" :value="1"></el-option>
          <el-option label="策划" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营商" prop="ipsChannel">
        <el-input v-model="formData.ipsChannel" placeholder="请输入运营商"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="策划ID">
        <el-input v-model="formData.planId" type="number" placeholder="请输入策划ID"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="策划名称">
        <el-input v-model="formData.planName" placeholder="请输入策划名称"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { blacklistApi } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  name: '',
  type: '',
  ipsChannel: '',
  planId: '',
  planName: ''
})

const rules = {
  name: [{ required: true, message: '请输入策略名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择策略类型', trigger: 'change' }],
  ipsChannel: [{ required: true, message: '请输入运营商', trigger: 'blur' }]
}

const goBack = () => {
  router.push('/blacklist')
}

const save = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return
  })

  try {
    if (isEdit.value) {
      await blacklistApi.strategyUpdate(formData)
      ElMessage.success('编辑成功')
    } else {
      await blacklistApi.strategySave(formData)
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
    const res = await blacklistApi.strategyGet(id)
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
