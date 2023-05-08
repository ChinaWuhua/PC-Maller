<template>
  <div class="header">
    <div class="logo"><img src="@/assets/logo_dark.png" />Farmer Market</div>
    <div 
      class="search"
      v-if="store.state.user.userinfo.role === 'Customer'"
    >
      <el-input v-model="searchtext" placeholder="Search Products" style="width: 40%;" />
      <el-button type="success" style="margin-left: 12px;" @click="toSearch">Search</el-button>
    </div>
    <div class="userinfo">
      welcome! {{state.email}} | 
      <span @click="logout">Logout</span>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const store = useStore();
const searchtext = ref('') 
const router = useRouter()
const state = reactive({
  email: computed(() => store?.state?.user?.userinfo?.email || 'unknow user')
})
const logout = () => {
  store.commit('user/setUserinfo', {})
  router.replace('/login')
}

const toSearch = () => {
  store.commit('product/setSearchText', searchtext.value)
  store.commit('product/setRenew')
  router.replace('/custome/products')
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  .logo {
    color: #3cc23a;
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    img {
      width: 50px;
      height: auto;
      margin-right: 12px;
    }
  }
  .userinfo {
    span {
      cursor: pointer;
      color: #3cc23a;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
  }
}
</style>