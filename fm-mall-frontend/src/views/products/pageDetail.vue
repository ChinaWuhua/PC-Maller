<template>
  <div class="main" v-loading="loading">
    <div class="product-message">
      <div class="product-image">
        <img v-if="productData.image" :src="proxy.$imagePre + productData.image" />
      </div>
      <div class="product-parameter">
        <p><span>product name:</span> {{productData.tradeName}}</p>
        <p><span>farmer name:</span> {{productData.createorName}}</p>
        <p><span>price:</span> {{productData.tradePrice}}</p>
        <p><span>sold:</span> {{productData.tradeSold * 1}}</p>
        <p><span>stock:</span> {{productData.tradeStock}}</p>
        <p><span>description:</span> {{productData.description}}</p>
        <el-button-group style="margin-top: 25px;">
          <el-button type="warning" @click="addWish">Add To Wish</el-button>
          <el-button v-if="productData.statu === 'true'" type="success" @click="addToCar">Add To Car</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

const { proxy } = getCurrentInstance();
const request = inject('request')
const productData = ref({})
const store = useStore()
const loading = ref(false)

const getProductData  = () => {
  const str = sessionStorage.getItem('productData')
  const params = JSON.parse(str)
  productData.value = params
}
// 加入愿望单
const addWish = () => {
  const params = {
    productID: productData.value.id,
    ownerID: store.state.user.userinfo?.id
  }
  loading.value = true
  request.post('/api/customer/addwish', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'Done !',
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
// 加入购物车
const addToCar = () => {
  ElMessageBox.prompt('Please enter the count', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:  /^\d+$/,
    inputErrorMessage: 'Invalid count',
  })
    .then(({ value }) => {
      sendToCar(value)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
// 发送至购物车
const sendToCar = (count) => {
  const params = {
    productID: productData.value.id,
    ownerID: store.state.user.userinfo?.id,
    count
  }

  loading.value = true
  request.post('/api/customer/addcar', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'Done !',
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
  getProductData()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  overflow: hidden;
  margin: 40px 40px;
}
.product-name {
  font-size: 26px;
  margin-bottom: 30px;
}
.product-message {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .product-image {
    width: 250px;
    height: 230px;
    background: #efefef;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-parameter {
    flex: 1;
    font-size: 20px;
    p {
      font-size: 20px;
      margin-top: 12px;
      &:first-child {
        margin-top: 0;
      }
      span {
        display: inline-block;
        width: 160px;
        color: #999;
      }
    }
  }
}
</style>