<template>
  <div class="main" v-loading="loading">
    <div class="search">
      <el-input v-model="input" placeholder="Enter a Keyword" />
      <el-button @click="Search" type="primary" style="margin-left: 12px;">Search</el-button>
      <el-button @click="Clear" style="margin-left: 12px;">Clear</el-button>
      <template v-if="store.state.user.userinfo.role !== 'Customer'">
        <el-button @click="Export" type="primary" style="margin-left: 12px;">Export Out</el-button>
      </template>
    </div>
    <el-table :data="listData" stripe>
      <el-table-column prop="orderID" label="Order Number" />
      <el-table-column prop="customerName" label="Customer" />
      <el-table-column prop="products" label="Products" />
      <el-table-column prop="amount" label="Order Amount">
        <template #default="scope">
          $ {{scope.row.amount}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Order Time">
        <template #default="scope">
          {{scope.row.createTime ? moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="orderStatu" label="Order Statu" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="viewMore(scope.row)">More</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="total" 
        :current-page="currentPage"
        @current-change="currentChange" 
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { jsonToExcel } from '@/utils/common'
import moment from 'moment'

const store = useStore()
const router = useRouter()
const request = inject('request')
const listData = ref([])
const loading = ref(false)
const currentPage = ref(1)
const total = ref(0)
const input = ref('')

const currentChange = (page) => {
  getListData(page)
}

const Search = () => {
  getListData()
}

const Clear = () => {
  input.value = ''
  getListData()
}

const Export = () => {
  const params = {
    id: store.state.user.userinfo.id,
    keyword: input.value
  }
  loading.value = true
  request.post('/api/customer/exportOrderList', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      console.log('export data: ', res.data.data)
      jsonToExcel(res.data.data)
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

const getListData = (current) => {
  const params = {
    id: store.state.user.userinfo.id,
    role: store.state.user.userinfo.role,
    page: current || currentPage.value,
    keyword: input.value
  }
  loading.value = true
  request.post('/api/customer/queryOrderList', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      listData.value = res?.data?.data || []
      currentPage.value = res?.data?.page || 1
      total.value = res?.data?.total
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warn',
    })
  })
}

const viewMore = item => {
  router.push({
    path: '/custome/orderdetail',
    query: {
      orderid: item.orderID,
      farmerID: item.farmerID
    }
  })
}

onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 20px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.search {
  max-width: 500px;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
}
</style>