import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/utils/request'
import ElementPlus from 'element-plus' // 全局导入
import 'element-plus/dist/index.css' // 样式导入
const app = createApp(App);

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
app.provide('request', request)
app.config.globalProperties.$imagePre = "/api/business/getImage?id=";
app.use(ElementPlus).use(store).use(router).mount('#app')
