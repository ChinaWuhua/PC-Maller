<template>
  <div class="main" v-loading="loading">
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
          <div class="product-operation" @click.stop="AddCar(item)">
            <span>Add To Car</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, watch, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const { proxy } = getCurrentInstance();
const store = useStore();
const request = inject('request')
const router = useRouter()
const loading = ref(false);
const tableData = ref([])

watch(
  () => store.state.product.searchtext,
  () => {
    getProducts()
  }
);

const getProducts = () => {
  const params = {
    keyword: store.state.product.searchtext
  }
  loading.value = true
  request.post('/api/customer/products', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      tableData.value = res?.data?.data || []
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
  getProducts()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  margin: 30px 40px;
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
    .product-operation {
      transform: translateY(0);
    }
  }
  .product-operation {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    font-size: 16px;
    padding: 8px 0;
    text-align: center;
    color: #fff;
    background: rgba(250,0,0,0.5);
    transition: .3s;
    transform: translateY(-150%);
  }
  .product-image {
    font-size: 0;
    height: 200px;
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
}
</style>