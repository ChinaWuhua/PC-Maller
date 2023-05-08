<template>
  <div class="body">
    <div class="header" v-if="!isFullScreen">
      <com-header />
    </div>
    <div class="middle">
      <div class="nav" v-if="!isFullScreen">
        <sider-bar />
      </div>
      <div class="container">
        <div class="container-box">
          <template v-if="!isFullScreen && router.currentRoute.value.meta.label">
            <div class="crumbs">{{router.currentRoute.value.meta.label}}</div>
          </template>
          <contain-box />
        </div>
      </div>
    </div>
    <div class="footer" v-if="!isFullScreen">
      Farmer Market
    </div>
  </div>
</template>

<script setup>
import comHeader from './comHeader.vue'
import siderBar from './sideBar.vue'
import containBox from './containBox.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isFullScreen = ref(false)
watch(() => router.currentRoute.value.path, () => {
  const judge = router.currentRoute.value.meta.fullScreen || false
  isFullScreen.value = judge;
})
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    overflow: hidden;
    background: gray;
    color: #fff;
  }
  .middle {
    flex: 1;
    display: flex;
    .nav {
      width: 250px;
      background: #545c64;
      border-right: 1px solid #ddd;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .container {
      flex: 1;
      overflow: auto;
      position: relative;
      .crumbs {
        font-size: 20px;
        margin: 20px 20px 0 20px;
      }
      .container-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
      }
    }
  }
  .footer {
    color: #3cc23a;
    font-size: 18px;
    text-align: center;
    padding: 18px 0;
    background: gray;
  }
}
</style>