<template>
  <div class="main" v-loading="loading">
    <p class="title">Order Number: {{router.currentRoute.value.query.orderid}}</p>
    <el-table :data="listData" stripe>
      <el-table-column prop="tradeName" label="Trade Name" />
      <el-table-column prop="tradePrice" label="Trade Price">
        <template #default="scope">
          $ {{scope.row.tradePrice}}
        </template>
      </el-table-column>
      <el-table-column prop="count" label="Count" />
    </el-table>
    <div class="btns">
      <el-button @click="router.go(-1)">Go Back</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// const store = useStore()
const router = useRouter()
const request = inject('request')
const listData = ref([])
const loading = ref(false)

const getGoods = () => {
  loading.value = true
  const params = {
    orderID: router.currentRoute.value.query.orderid,
    farmerID: router.currentRoute.value.query.farmerID,
  }
  request.post('/api/customer/queryOrderGoods', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      listData.value = res?.data?.data || []
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warn',
    })
  })
}

onMounted(() => {
  getGoods()
})
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 20px;
}
.title {
  padding: 8px 12px;
  font-size: 20px;
  background: #ff9900;
  color: #fff;
}
.btns {
  text-align: center;
  margin: 20px;
}
</style>