<template>
  <div class="main" v-loaidng="loading">
    <div class="buttons">
      <el-button @click="download">template file</el-button>
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="/api/business/import"
        :show-file-list="false"
        :auto-upload="true"
        @success="success"
      >
        <el-button style="margin-left: 20px;">Upload</el-button>
      </el-upload>
    </div>
    
    <template v-if="previewData.length > 0">
      <div class="previewBox">
        <el-alert title="please check the datas, and click the 'OK' button to save" type="warning" />
        <el-table :data="previewData" stripe>
          <el-table-column prop="tradeName" label="tradeName" />
          <el-table-column prop="tradePrice" label="tradePrice" />
          <el-table-column prop="tradeStock" label="tradeStock" />
        </el-table>
        <div class="btns">
          <el-button type="primary" @click="save">OK</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const path = process.env.BASE_URL
const store = useStore()
const router = useRouter()
const request = inject('request')
let previewData = ref([])
const loading = ref(false)

const success = (response) => {
  if (response.statu === 'success') {
    previewData.value = response.data
  } else {
    ElMessage({
      message: response.data,
      type: 'warning',
    })
  }
}
const save = () => {
  const params = {
    createorName: store.state.user.userinfo?.username,
    creatorID: store.state.user.userinfo?.id,
    data: previewData.value
  }
  loading.value = true
  request.post('/api/business/batchImport', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      // console.log('done')
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

const download = () => {
  let a = document.createElement("a");
  a.href = `${path}template.xls`;
  a.download = "template.xls";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 20px;
}
.previewBox {
  margin-top: 30px;
}
.btns {
  text-align: center;
  margin-top: 12px;
}
.buttons {
  display: flex;
  align-items: center;
}
</style>