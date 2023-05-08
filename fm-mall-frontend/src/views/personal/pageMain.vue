<template>
  <div class="main">
    <div><span>email: </span>{{data.email}}</div>
    <div><span>role: </span>{{data.role}}</div>
    <div><span>registDate: </span>{{data.registDate}}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const data = ref({})

onMounted(() => {
  data.value = store.state.user.userinfo
})
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 20px;
  div {
    margin: 12px 0 0 0;
    font-size: 18px;
    color: #333;
    span {
      display: inline-block;
      width: 140px;
    }
  }
}
</style>