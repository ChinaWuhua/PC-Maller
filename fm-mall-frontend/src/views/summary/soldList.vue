<template>
  <div class="main">
    <el-empty v-if="tableData.length < 1 && !loading" description="there is nothing to show" />
    <el-button type="primary" @click="handleExport">Export</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column prop="orderID" label="Order ID" />
      <el-table-column prop="tradeName" label="Trade Name" />
      <el-table-column prop="soldTime" label="Sold Time">
        <template #default="scope">
          {{scope.row.soldTime ? moment(scope.row.soldTime).format('YYYY-MM-DD HH:mm:ss') : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="tradePrice" label="Price" />
      <el-table-column prop="count" label="count" />
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
import { onMounted, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { soldJsonToExcel } from '@/utils/common'

const request = inject('request')
const loading = ref(false);
const tableData = ref([])
const currentPage = ref(1)
const total = ref(0)

const handleExport = () => {
  loading.value = true
  request.post('/api/admin/exportGoods').then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      soldJsonToExcel(res.data.data)
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

const currentChange = (page) => {
  getTableData(page)
}

const getTableData = (current) => {
  loading.value = true
  request.post('/api/admin/querySoldGoods', {
    page: current || currentPage.value,
  }).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      tableData.value = res?.data?.data || []
      currentPage.value = res?.data?.page || 1
      total.value = res?.data?.total || 0
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

onMounted(() => {
  getTableData()
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
</style>