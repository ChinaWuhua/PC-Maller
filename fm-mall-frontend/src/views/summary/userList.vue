<template>
  <div class="main">
    <el-empty v-if="tableData.length < 1 && !loading" description="there is nothing to show" />
    <el-button type="primary" @click="handleExport">Export</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column prop="username" label="User Name" />
      <el-table-column prop="id" label="User ID" />
      <el-table-column prop="disabled" width="130" label="Account Statu">
        <template #default="scope">
          <span v-if="scope.row.disabled==='true'" class="statu off">OFF</span>
          <span v-else class="statu on">ON</span>
        </template>
      </el-table-column>
      <el-table-column prop="registDate" label="Regist Date">
        <template #default="scope">
          {{scope.row.registDate ? moment(scope.row.registDate).format('YYYY-MM-DD HH:mm:ss') : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="Role" />
      <el-table-column prop="email" label="Email" />
      <el-table-column fixed="right" label="Operations" width="160">
        <template #default="scope">
          <el-button-group size="small">
            <el-button type="warning" v-if="!scope.row.disabled || scope.row.disabled === 'false'" @click="setOff(scope.row)">Set Off</el-button>
            <el-button type="success" v-if="scope.row.disabled === 'true'" @click="setOn(scope.row)">Set On</el-button>
            <el-button type="primary" @click="reset(scope.row)">Reset</el-button>
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
import { onMounted, ref, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'
import { userJsonToExcel } from '@/utils/common'

const request = inject('request')
const loading = ref(false);
const tableData = ref([])
const currentPage = ref(1)
const total = ref(0)

const setOff = (item) => {
  ElMessageBox.alert('Set off the account', 'Make Sure', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      loading.value = true
      request.post('/api/user/setOff', item).then((res) => {
        loading.value = false
        if (res?.data?.statu === 'success') {
          getTableData(currentPage.value)
        }
      }).catch(err => {
        loading.value = false
        ElMessage({
          message: err.data,
          type: 'warning',
        })
      })
    }
  })
}

const setOn = (item) => {
  ElMessageBox.alert('Set on the account', 'Make Sure', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      loading.value = true
      request.post('/api/user/setOn', item).then((res) => {
        loading.value = false
        if (res?.data?.statu === 'success') {
          getTableData(currentPage.value)
        }
      }).catch(err => {
        loading.value = false
        ElMessage({
          message: err.data,
          type: 'warning',
        })
      })
    }
  })
}

const reset = (item) => {
  ElMessageBox.alert('Reset the account password as fm123456', 'Make Sure', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      loading.value = true
      request.post('/api/user/reset', item).then((res) => {
        loading.value = false
        if (res?.data?.statu === 'success') {
          getTableData(currentPage.value)
        }
      }).catch(err => {
        loading.value = false
        ElMessage({
          message: err.data,
          type: 'warning',
        })
      })
    }
  })
}

const handleExport = () => {
  loading.value = true
  request.post('/api/admin/exportUsers').then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      userJsonToExcel(res.data.data)
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
  request.post('/api/admin/queryUsers', {
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
.statu {
  display: inline-block;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background: gray;
  width: 50px;
  text-align: center;
  border-radius: 5px;
}
.on {
  background: green;
}
</style>