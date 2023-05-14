<template>
  <div class="main" v-loading="loading">
    <template v-if="!loading && tableData.length < 1">
      <el-empty description="there is nothing to show" />
    </template>
    <el-row :gutter="10">
      <el-col 
        :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
        v-for="(item, index) in tableData"
        :key="'row-' + index"
        @click="handleDetail(item)"
      >
        <div class="product-item">
          <div class="product-image">
            <img v-if="item.image" :src="proxy.$imagePre + item.image" />
          </div>
          <div class="product-name">{{item.tradeName}}</div>
          <div class="product-price">$ {{item.tradePrice}}</div>
          <div class="btns">
            <span class="remove" @click.stop="remove(item)">Remove</span>
            <span class="buy" @click.stop="AddCar(item)">Buy</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance();
const request = inject('request')
const router = useRouter()
const store = useStore()
const tableData = ref([])
const loading = ref(false)

const getData = () => {
  loading.value = true
  request.post('/api/customer/querywish', {id: store.state.user.userinfo?.id}).then(res => {
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

const remove = (item) => {
  ElMessageBox.alert('Remove it ?', 'Make Sure', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      runRemove(item)
    }
  })
}
const runRemove = (item) => {
  const params = {
    productID: item.id,
    ownerID: store.state.user.userinfo?.id
  }
  loading.value = true
  request.post('/api/customer/removewish', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: res.data.data,
        type: 'success',
      })
      getData()
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  }) 
}
const handleDetail = item => {
  sessionStorage.setItem('productData', JSON.stringify(item))
  router.push('/custome/detail?id=' + item.id)
}

const AddCar = (item) => {
  const params = {
    productID: item.id,
    ownerID: store.state.user.userinfo?.id,
    count: 1
  }

  loading.value = true
  request.post('/api/customer/addcar', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'Done',
        type: 'success',
      })
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
  getData()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  overflow: hidden;
  margin: 40px 40px;
}
.product-item {
  position: relative;
  overflow: hidden;
  border: 1px solid #dedede;
  border-radius: 8px;
  text-align: center;
  transition: .3s;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    border-color: #8cba4d;
    box-shadow: 0 0 8px rgba(0,0,0, 0.1);
    color: #8cba4d;
    .btns {
      transform: translateY(0);
    }
  }
  .product-image {
    font-size: 0;
    height: 160px;
    background: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .product-name {
    font-size: 20px;
    margin-top: 12px;
    padding: 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product-price {
    font-size: 20px;
    margin: 8px 0 12px 0;
  }
  .btns {
    transition: .3s;
    transform: translateY(-150%);
    background: rgba(0,0,0, 0.5);
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    span {
      display: inline-block;
      width: 50%;
      height: 100%;
      padding: 8px 0;
    }
    .buy {
      background: rgba(255,0,0,0.5);
    }
  }
}
</style>