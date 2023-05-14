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
          <el-button class="upload-btn">
            <input type="file" ref="file" @change="chosePic" />
            Upload
          </el-button>
          <div>
            <template v-if="src_preview">
              <img class="previewPic" :src="src_preview" alt="preview">
            </template>
            <template v-else-if="src">
              <img class="previewPic" :src="imagePre + src" alt="pictrue">
            </template>
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
// const params = {
//   id: obj?.id || ''
// }
const request = inject('request')
const router = useRouter()
const store = useStore()
const loading = ref(false)
const src = ref('')
const src_preview = ref('')
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
const file = ref(null)
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
const chosePic = () => {
  console.log('file.value.files: ', file.value.files)
  const fr = new FileReader()
  fr.readAsDataURL(file.value.files[0]) // 传入文件对象开始读
  fr.onload = (e) => {
    src_preview.value = e.target.result
  }
}
const handleSave = () => {
  const mode = router.currentRoute.value.query.mode || 'add'
  if (mode === 'add') {
    create(form)
  } else if (mode === 'modify') {
    modify(form)
  }
}
const bindPictrue = async (id) => {
  const formdata = new FormData();
  formdata.append('file', file.value.files[0])
  formdata.append('id', id)

  const res = await request.post('/api/business/uploadImage', formdata, {
    headers: {'Content-Type' : 'multipart/form-data'}
  }).then(res => res).catch(err => err)
  loading.value = false
  if (res.data.statu === 'success') {
    router.replace('/business/list')
  } else {
    ElMessage({
      message: res.data,
      type: 'warning',
    })
  }
}
const create = async (form) => {
  const params = {
    ...form,
    createorName: store.state.user.userinfo?.username,
    creatorID: store.state.user.userinfo?.id,
    tradePrice: form.tradePrice * 1,
    tradeStock: form.tradeStock * 1
  }
  loading.value = true
  const res = await request.post('/api/business/create', params).then(res => res).catch(err => err)
  if (res?.data?.statu === 'success') {
    ElMessage({
      message: 'Success',
      type: 'success',
    })
    if (file.value.files.length > 0) {
      // 上传并绑定图片
      bindPictrue(res.data.id)
      return
    }
    loading.value = false
    router.replace('/business/list')
  } else {
    loading.value = false
    ElMessage({
      message: res.data,
      type: 'warning',
    })
  }
}
const modify = async (form) => {
  const params = {
    ...form,
    createorName: obj?.username,
    creatorID: obj?.id,
    tradePrice: form.tradePrice * 1,
    tradeStock: form.tradeStock * 1,
    id: obj?.id
  }
  loading.value = true
  if (file.value.files.length > 0) {
    params.oldImage = obj.image
    // 更新
    bindPictrue(obj?.id)
  }
  const res = await request.post('/api/business/modify', params).then(res => res).catch(err => err)
  if (res?.data?.statu === 'success') {
    loading.value = false
    router.replace('/business/list')
  } else {
    ElMessage({
      message: res.data,
      type: 'warning',
    })
  }
}
const Cancel = () => {
  router.go(-1)
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
  max-width: 300px;
  margin-top: 20px;
}
.upload-btn {
  position: relative;
  overflow: hidden;
  input {
    position: absolute;
    z-index: 1;
    opacity: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
}
</style>