<template>
  <div
    class="main"
    v-loading="loading"
    element-loading-text="wait a moment..."
  >
    <div class="title">FarmersMarket</div>
    <div class="box">
      <div class="form-item">
        <p>Email</p>
        <input
          type="text"
          placeholder="Enter your Email"
          v-model="form.email"
          @keyup.enter="handleLogin"
        />
      </div>
      <div class="form-item">
        <p>Password</p>
        <input
          type="password"
          placeholder="Enter your Password"
          v-model="form.password"
          @keyup.enter="handleLogin"
        />
      </div>
      <div class="btns">
        <button @click="handleLogin">Sign In</button>
        <button @click="toRegister">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from 'vuex';
const request = inject('request')
const router = useRouter();
const loading = ref(false);
const store = useStore();
const form = reactive({
  email: "",
  password: "",
});

const toRegister = () => {
  router.push("/register");
};

// 首次登陆，显示校验邮箱弹窗
const showValidatePanel = () => {
  ElMessageBox.prompt('Please input your e-mail code', 'Make Validate', {
    confirmButtonText: 'OK'
  }).then((code) => {
    valiedateCode(code.value)
    loading.value = true
  })
}

// 校验邮箱验证码
const valiedateCode = (code) => {
  loading.value = true;
  request.post('/api/user/validateCode', {email: form.email, code}).then((res) => {
    loading.value = false
    if (res.data.statu !== 'success') {
      showValidatePanel()
      ElMessage({
        message: res.data.data,
        type: 'warning',
      })
    } else {
      store.commit('user/setUserinfo', {
        ...res?.data?.data,
      })
      router.replace('/home')
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
      message: err.data,
      type: 'warning',
    })
  })
}

const handleLogin = () => {
  if (form.email !== 'admin') {
    if (!form?.email) {
      ElMessage({
        message: 'Enter Your Email',
        type: 'warning',
      })
      return ;
    } else if (!form?.password) {
      ElMessage({
        message: 'Enter Your Password',
        type: 'warning',
      })
      return ;
    }
  }
  loading.value = true;
  request.post('/api/user/login', form).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      store.commit('user/setUserinfo', {
        ...res?.data?.data,
      })
      router.replace('/home')
    } else if (res?.data?.statu === 'validate') {
      showValidatePanel()
    } else {
      ElMessage({
        message: res?.data?.data,
        type: 'warning',
      })
    }
  }).catch(err => {
    loading.value = false
    ElMessage({
        message: err.data,
        type: 'warn',
      })
  })
};
</script>


<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/market.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(4px);
  }
  .title {
    text-align: center;
    font-size: 80px;
    font-weight: bolder;
    color: #8cba4d;
    text-shadow: 2px 2px 4px #000000;
    position: relative; /* Add a relative position to allow z-index to work */
    z-index: 1; /* Set a z-index value to display the heading above the blurred background layer */
  }
  .box {
    padding: 100px;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: auto;
    position: relative;
    z-index: 2;
    width: 300px;
    margin: 0 auto;
    .form-item {
      position: relative;
      overflow: hidden;
      margin: 30px 0;
      &:first-child {
        margin-top: 0;
      }
      p {
        margin-bottom: 30px;
        text-align: left;
        color: lightyellow;
        text-shadow: 2px 2px 4px #000000;
        position: relative; /* Add a relative position to allow z-index to work */
        z-index: 1; /* Set a z-index value to display the label above the blurred background layer */
        font-size: 30px;
      }
      input {
        border: 0;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 15px;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      button {
        width: calc(50% - 10px);
        font-size: 26px;
        border-radius: 5px;
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
      }
    }
  }
}
</style>