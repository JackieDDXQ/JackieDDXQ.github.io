
<template>
  <div class="page-container">
    <div class="page-header">
      <h2>{{ isEdit ? '编辑策划' : '新建策划' }}</h2>
      <div>
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>

    <el-form :model="formData" :rules="rules" ref="formRef" class="form-container">
      <el-form-item label="运营商" prop="ipsChannel">
        <el-input v-model="formData.ipsChannel" placeholder="请输入运营商"></el-input>
      </el-form-item>
      <el-form-item label="策划ID" prop="offerId">
        <el-input v-model="formData.offerId" placeholder="请输入策划ID"></el-input>
      </el-form-item>
      <el-form-item label="策划名称" prop="offerName">
        <el-input v-model="formData.offerName" placeholder="请输入策划名称"></el-input>
      </el-form-item>
      <el-form-item label="策划类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择策划类型">
          <el-option label="联合会员" :value="1"></el-option>
          <el-option label="活动" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办理服务" prop="serviceHand">
        <el-input v-model="formData.serviceHand" placeholder="请输入办理服务"></el-input>
      </el-form-item>
      <el-form-item label="权益编码" prop="equityCode">
        <el-input v-model="formData.equityCode" placeholder="请输入权益编码"></el-input>
      </el-form-item>
      <el-form-item label="权益名称" prop="equityName">
        <el-input v-model="formData.equityName" placeholder="请输入权益名称"></el-input>
      </el-form-item>
      <el-form-item label="扩展信息">
        <el-input type="textarea" v-model="formData.extraJson" placeholder="请输入扩展信息(JSON格式)"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-select v-model="formData.enable">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { planApi } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  ipsChannel: '',
  offerId: '',
  offerName: '',
  type: '',
  serviceHand: '',
  equityCode: '',
  equityName: '',
  extraJson: '',
  enable: 1,
  remark: ''
})

const rules = {
  ipsChannel: [{ required: true, message: '请输入运营商', trigger: 'blur' }],
  offerId: [{ required: true, message: '请输入策划ID', trigger: 'blur' }],
  offerName: [{ required: true, message: '请输入策划名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择策划类型', trigger: 'change' }],
  serviceHand: [{ required: true, message: '请输入办理服务', trigger: 'blur' }],
  equityCode: [{ required: true, message: '请输入权益编码', trigger: 'blur' }],
  equityName: [{ required: true, message: '请输入权益名称', trigger: 'blur' }]
}

const goBack = () => {
  router.push('/plan')
}

const save = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return
  })

  try {
    if (isEdit.value) {
      await planApi.update(formData)
      ElMessage.success('编辑成功')
    } else {
      await planApi.save(formData)
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
    const res = await planApi.get(id)
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
