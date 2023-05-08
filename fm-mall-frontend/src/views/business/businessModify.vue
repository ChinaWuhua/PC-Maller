<template>
  <div class="main" v-loading="loading" element-loading-text="请稍后...">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Trade name">
        <el-input v-model="form.tradeName" />
      </el-form-item>
      <el-form-item label="Price" prop="tradePrice">
        <el-input v-model="form.tradePrice" />
      </el-form-item>
      <el-form-item label="Pictrue">
        <div>
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="/api/business/uploadImage"
            :show-file-list="false"
            :auto-upload="true"
            :data="params"
            @success="success"
          >
            <el-button>Upload</el-button>
          </el-upload>
          <div v-if="src !== ''">
            <img class="previewPic" :src="imagePre + src" alt="product pictrue">
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Stock" prop="tradeStock">
        <el-input v-model="form.tradeStock" />
      </el-form-item>
      <el-form-item label="Statu">
        <el-switch
          v-model="form.statu"
          active-text="On"
          inactive-text="Off"
          active-value="true"
        />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">Save</el-button>
        <el-button @click="Cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance();
const str = sessionStorage.getItem('modifyData')
const obj = JSON.parse(str)
const params = {
  id: obj?.id || ''
}
const request = inject('request')
const router = useRouter()
const store = useStore()
const loading = ref(false)
const src = ref('')
const imagePre = proxy.$imagePre
const tradePrice = (rule, value, callback) => {
  if (!(/^\d+(\.\d{1,2})?$/).test(value)) {
    callback(new Error('Please Enter a correct Price'))
  } else {
    callback()
  }
}
const tradeStock = (rule, value, callback) => {
  if (!(/^[1-9]\d*$/).test(value)) {
    callback(new Error('Please Enter a number'))
  } else {
    callback()
  }
}
const ruleFormRef = ref(null)
const rules = reactive({
  tradePrice: [
    { validator: tradePrice, trigger: 'blur' }
  ],
  tradeStock: [
    { validator: tradeStock, trigger: 'blur' }
  ]
})
const form = reactive({
  tradeName: '',
  tradePrice: 0,
  tradePictrue: '',
  tradeStock: 0,
  statu: 'off',
  description: ''
})
const handleSave = () => {
  const mode = router.currentRoute.value.query.mode || 'add'
  if (mode === 'add') {
    create(form)
  } else if (mode === 'modify') {
    modify(form)
  }
}
const create = (form) => {
  const params = {
    ...form,
    createorName: store.state.user.userinfo?.username,
    creatorID: store.state.user.userinfo?.id,
    tradePrice: form.tradePrice * 1,
    tradeStock: form.tradeStock * 1
  }
  loading.value = true
  request.post('/api/business/create', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'Success',
        type: 'success',
      })
      router.replace('/business/list')
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}
const modify = (form) => {
  const params = {
    ...form,
    createorName: obj?.username,
    creatorID: obj?.id,
    tradePrice: form.tradePrice * 1,
    tradeStock: form.tradeStock * 1,
    id: obj?.id
  }
  loading.value = true
  request.post('/api/business/modify', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'Success',
        type: 'success',
      })
      router.replace('/business/list')
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warn',
    })
  })
}
const Cancel = () => {
  router.go(-1)
}

const success = res => {
  // console.log('图片上传结果: ', res)
  src.value = res?.data
}

onMounted(() => {
  const mode = router.currentRoute.value.query.mode || 'add'
  if (mode === 'modify') {
    const str = sessionStorage.getItem('modifyData')
    const obj = JSON.parse(str)

    for (let item in form) {
      form[item] = obj[item]
    }
    src.value = obj.image || ''
  }
})

onBeforeUnmount(() => {
  sessionStorage.removeItem('modifyData')
})
</script>

<style lang="scss" scoped>
.main {
  width: 600px;
  margin: 50px auto;
}
.previewPic {
  max-width: 200px;
}
</style>