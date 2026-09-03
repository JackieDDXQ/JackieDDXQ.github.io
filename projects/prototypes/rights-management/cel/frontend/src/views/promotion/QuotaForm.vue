
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑限办策略' : '新建限办策略' }}</h2>
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
          <el-option label="限量" :value="1"></el-option>
          <el-option label="限办次数" :value="2"></el-option>
          <el-option label="限时" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="策略级别" prop="level">
        <el-select v-model="formData.level" placeholder="请选择策略级别">
          <el-option label="运营商" :value="0"></el-option>
          <el-option label="策划" :value="1"></el-option>
          <el-option label="渠道" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营商" prop="ipsChannel">
        <el-input v-model="formData.ipsChannel" placeholder="请输入运营商"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.level >= 1" label="策划ID">
        <el-input v-model="formData.planId" type="number" placeholder="请输入策划ID"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.level >= 1" label="策划名称">
        <el-input v-model="formData.planName" placeholder="请输入策划名称"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.level >= 2" label="渠道ID">
        <el-input v-model="formData.channelId" type="number" placeholder="请输入渠道ID"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.level >= 2" label="渠道名称">
        <el-input v-model="formData.channelName" placeholder="请输入渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="生效开始时间">
        <el-date-picker v-model="formData.effectiveStart" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="生效结束时间">
        <el-date-picker v-model="formData.effectiveEnd" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="formData.type !== 3" label="阈值" prop="threshold">
        <el-input v-model="formData.threshold" type="number" placeholder="请输入阈值"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="周期" prop="period">
        <el-select v-model="formData.period">
          <el-option label="1月" value="1M"></el-option>
          <el-option label="1年" value="1Y"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="在订">
        <el-select v-model="formData.inBooking">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-select v-model="formData.enable">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { quotaApi } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  name: '',
  type: '',
  level: '',
  rootId: 0,
  parentId: 0,
  ipsChannel: '',
  planId: '',
  planName: '',
  channelId: '',
  channelName: '',
  effectiveStart: '',
  effectiveEnd: '',
  threshold: '',
  period: '0',
  inBooking: 0,
  enable: 1
})

const rules = {
  name: [{ required: true, message: '请输入策略名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择策略类型', trigger: 'change' }],
  level: [{ required: true, message: '请选择策略级别', trigger: 'change' }],
  ipsChannel: [{ required: true, message: '请输入运营商', trigger: 'blur' }]
}

watch(() => formData.type, () => {
  if (formData.type !== 2) {
    formData.inBooking = 0
  }
})

const goBack = () => {
  router.push('/quota')
}

const save = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return
  })

  try {
    if (isEdit.value) {
      await quotaApi.update(formData)
      ElMessage.success('编辑成功')
    } else {
      await quotaApi.save(formData)
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
    const res = await quotaApi.get(id)
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
