<template>
  <ul class="nav">
    <li
      v-for="(item, index) in navlist.list"
      :key="index"
      @click="handleClick(item)"
    >
      {{item.label}}
    </li>
  </ul>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter()
const menus = [
  {label: 'Home', path: '/home'}, // 首页
  {label: 'User Info', path: '/user/personal'}, // 个人信息
  {label: 'Shopcar', path: '/custome/shopcar'}, // 购物车
  {label: 'Orderlist', path: '/custome/orderlist'}, // 订单列表
  {label: 'Trade Manager', path: '/business/list'}, // 商品管理·列表
  {label: 'Summary', path: '/admin/summary'}, // 数据汇总
  {label: 'Products', path: '/custome/products'}, // 顾客-查看商品列表
  {label: 'Wish', path: '/custome/wish'}, // 顾客-心愿单/收藏夹
  {label: 'Import', path: '/business/import'}, // 批量导入商品
  {label: 'User List', path: '/admin/userList'}, // 用户统计
  {label: 'Order Summary', path: '/admin/orderList'}, // 订单概览
  {label: 'Sold Datas', path: '/admin/soldList'}, // 商品销售记录
  {label: 'Goods List', path: '/admin/goodsList'}, // 全部商品
]
const navlist = reactive({
  list: []
})

const handleClick = item => {
  router.push(item.path)
}

onMounted(() => {
  const role = store.state.user.userinfo.role
  let nav = []
  let common_nav = [menus[0], menus[1]]
  switch (role) {
    case 'Farmer':
      nav = common_nav.concat(menus[3],menus[4],menus[8])
      break;
    case 'Customer':
      nav = common_nav.concat(menus[2],menus[3],menus[6],menus[7])
      break;
    case 'admin':
      nav = common_nav.concat(menus[9],menus[10],menus[11],menus[12])
      break;
  }
  navlist.list = nav
})
</script>

<style lang="scss" scoped>
.nav {
  li {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    padding: 18px 12px;
    transition: .3s;
    &:hover {
      background: rgb(67, 74, 80);
    }
  }
}
</style>