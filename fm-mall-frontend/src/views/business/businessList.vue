<template>
  <div class="main">
    <el-button-group class="ml-4">
      <el-button type="primary" @click="handleAdd">Add New</el-button>
    </el-button-group>
    <el-table :data="tableData" stripe>
      <el-table-column prop="tradeName" label="Rrade Name" />
      <el-table-column prop="tradePrice" label="Price" />
      <el-table-column prop="tradePictrue" label="Pictrue" />
      <el-table-column prop="tradeStock" label="Stock" />
      <el-table-column prop="statu" label="Statu">
        <template #default="scope">
          <span v-if="scope.row.statu === 'true'" class="green">
            on
          </span>
          <span v-else class="gray">
            off
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button type="primary" @click="handleModify(scope.row)">Modify</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const router = useRouter()
const request = inject('request')
const loading = ref(false)
const store = useStore()
const tableData = ref([])
const handleAdd = () => {
  router.push('/business/modify?mode=add')
}
const getList = () => {
  const userinfo = store.state.user.userinfo
  loading.value = true
  request.post('/api/business/myTrades', {id: userinfo.id}).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      tableData.value = res?.data?.data || []
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warn',
    })
  })
}

const handleModify = data => {
  sessionStorage.setItem('modifyData', JSON.stringify(data))
  router.push({
    path: '/business/modify',
    query: {
      mode: 'modify'
    }
  })
}

onMounted(() => {
  getList();
})
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 20px;
}
.green, .gray {
  font-size: 16px;
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
  }
}
.green {
  color: green;
  &:before {
    background: green;
  }
}
.gray {
  color: gray;
  &:before {
    background: gray;
  }
}
</style>