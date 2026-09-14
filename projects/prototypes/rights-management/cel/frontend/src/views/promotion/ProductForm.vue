
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑推广' : '新建推广' }}</h2>
      <div>
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>

    <el-form :model="formData" :rules="rules" ref="formRef" class="form-container">
      <el-form-item label="渠道ID" prop="channelId">
        <el-input v-model="formData.channelId" type="number" placeholder="请输入渠道ID"></el-input>
      </el-form-item>
      <el-form-item label="推广编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入推广编码"></el-input>
      </el-form-item>
      <el-form-item label="推广名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入推广名称"></el-input>
      </el-form-item>
      <el-form-item label="套餐ID" prop="packageId">
        <el-input v-model="formData.packageId" type="number" placeholder="请输入套餐ID"></el-input>
      </el-form-item>
      <el-form-item label="推广方" prop="promoter">
        <el-input v-model="formData.promoter" placeholder="请输入推广方"></el-input>
      </el-form-item>
      <el-form-item label="出资方" prop="investor">
        <el-input v-model="formData.investor" placeholder="请输入出资方"></el-input>
      </el-form-item>
      <el-form-item label="合作方式" prop="cooperationType">
        <el-select v-model="formData.cooperationType" placeholder="请选择合作方式">
          <el-option label="CPA" :value="1"></el-option>
          <el-option label="CPS-合作分成" :value="2"></el-option>
          <el-option label="CPS-流水分成" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成比例" prop="cooperationRatio">
        <el-input v-model="formData.cooperationRatio" type="number" step="0.01" placeholder="请输入分成比例"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status">
          <el-option label="上架" :value="1"></el-option>
          <el-option label="下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { productApi } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  channelId: '',
  code: '',
  name: '',
  packageId: '',
  promoter: '',
  investor: '',
  cooperationType: '',
  cooperationRatio: '',
  status: 1
})

const rules = {
  channelId: [{ required: true, message: '请输入渠道ID', trigger: 'blur' }],
  code: [{ required: true, message: '请输入推广编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入推广名称', trigger: 'blur' }],
  packageId: [{ required: true, message: '请输入套餐ID', trigger: 'blur' }],
  promoter: [{ required: true, message: '请输入推广方', trigger: 'blur' }],
  investor: [{ required: true, message: '请输入出资方', trigger: 'blur' }],
  cooperationType: [{ required: true, message: '请选择合作方式', trigger: 'change' }],
  cooperationRatio: [{ required: true, message: '请输入分成比例', trigger: 'blur' }]
}

const goBack = () => {
  router.push('/product')
}

const save = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return
  })

  try {
    if (isEdit.value) {
      await productApi.update(formData)
      ElMessage.success('编辑成功')
    } else {
      await productApi.save(formData)
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
    const res = await productApi.get(id)
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
