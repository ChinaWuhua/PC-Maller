<template>
  <div class="main" v-loading="loading">
    <template v-if="productData.length > 0 && !loading">
      <div class="summary">
        <p v-if="invalidCount > 0">
          <span style="color: red">{{invalidCount}}</span>
          invalid items
        </p>
        <p>
          Total Amount 
          <span>$ {{totalAmount}}</span> 
        </p>
        <div class="btns">
          <el-button-group>
            <el-button type="danger" @click="Payment">Payment ( Imitate )</el-button>
            <el-button @click="router.go(-1)">Cancel</el-button>
          </el-button-group>
        </div>
      </div>
    </template>
    <el-empty v-if="productData.length < 1 && !loading" description="there is nothing to show" />
    <ul class="trade-list">
      <li 
        v-for="(item, index) in productData"
        class="trade-item"
        :key="'row' + index"
      >
        <div class="image">
          <template v-if="item.image">
            <img :src="proxy.$imagePre + item.image" />
          </template>
        </div>
        <div class="info">
          <p class="tradename" @click="handleDetail(item)">{{item.tradeName}}</p>
          <p >stock: {{item.tradeStock}}</p>
          <p>$ {{item.tradePrice}}</p>
        </div>
        <div class="operate">
          <template v-if="item.statu === 'true'">
            <div>
              <el-input-number v-model="item.count" :min="1" @change="countChange(item)" />
            </div>
            <div>
              <el-button-group style="margin-top: 25px;">
                <el-button type="warning">Add To Wish</el-button>
                <el-button type="danger" @click="remove(item)">Delete</el-button>
              </el-button-group>
            </div>
          </template>
          <template v-else>
            invalid
            <el-button type="danger" @click="remove(item)">Delete</el-button>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const { proxy } = getCurrentInstance();
const request = inject('request')
const router = useRouter()
const productData = ref([])
const store = useStore()
const loading = ref(false)
const invalidCount = ref(0)
const totalAmount = ref(0)

const caculation = () => {
  let invalidCount_inside = 0;
  let totalAmount_inside = 0;
  productData.value.forEach(item => {
    if (item.statu === 'false') {
      invalidCount_inside += 1 
    } else {
      totalAmount_inside += (item.tradePrice*item.count).toFixed(2)*1
    }
  })
  invalidCount.value = invalidCount_inside
  totalAmount.value = totalAmount_inside
}

const getCarData = () => {
  const params = {
    ownerID: store.state.user.userinfo?.id
  }

  loading.value = true
  request.post('/api/customer/querycar', params).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      productData.value = res?.data?.data || []
      caculation()
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

const countChange = item => {
  loading.value = true
  request.post('/api/customer/modifycar', item).then(() => {
    loading.value = false
    caculation()
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

const remove = item => {
  ElMessageBox.alert('Remove and no way to repaire', 'Make Sure', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      loading.value = true
      request.post('/api/customer/removecar', item).then((res) => {
        loading.value = false
        if (res?.data?.statu === 'success') {
          getCarData()
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

const handleDetail = item => {
  sessionStorage.setItem('productData', JSON.stringify(item))
  router.push('/custome/detail?id=' + item.id)
}

const Payment = () => {
  ElMessageBox.alert(`Click the 'OK' button and Simulate placing an order`, 'Notice', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action !== 'confirm') {
        return;
      }
      loading.value = true
      const data = {
        data: productData.value,
        userid: store.state.user.userinfo?.id,
        customerName: store.state.user.userinfo?.email
      }
      request.post('/api/customer/createOrder', data).then((res) => {
        loading.value = false
        if (res.data.statu === 'success') {
          router.replace('/custome/orderlist')
        } else {
          ElMessage({
            message: res.data.data,
            type: 'warning',
          })
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

onMounted(() => {
  getCarData()
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  margin: 20px 20px;
}
.trade-list {
  .trade-item {
    display: flex;
    align-items: center;
    padding: 12px 12px;
    border: 1px solid #dedede;
    margin-top: 20px;
    transition: .3s;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0, 0.1);
    }
    .image {
      width: 200px;
      height: 200px;
      background: #efefef;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .info {
      flex: 1;
      p {
        font-size: 20px;
        margin: 18px 0;
      }
      .tradename {
        cursor: pointer;
        &:hover {
          color: yellowgreen;
        }
      }
    }
    .operate {
      margin-left: 20px;
    }
  }
}
.summary {
  margin: 20px 0;
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    color: #3cc23a;
    font-weight: bold;
  }
  .btns {
    margin-left: 20px;
  }
}
</style>