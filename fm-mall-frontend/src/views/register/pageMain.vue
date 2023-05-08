<template>
  <div class="main" v-loading="loading" element-loading-text="wait a moment...">
    <div class="box">
      <p class="title">Register</p>
      <div class="body">
        <el-form ref="registerForm" :model="form" :rules="rules" label-width="80px" size="large">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" />
            <!-- <div class="flexWrap">
              <el-input v-model="form.email" />
              <el-button :disabled="!!timerObj" @click="sendCodes">{{timerObj ? timer : 'Send Codes'}}</el-button>
            </div> -->
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
          <!-- <el-form-item label="Code" prop="code">
            <el-input v-model="form.code" />
          </el-form-item> -->
          <el-form-item label="Role" prop="role">
            <el-radio-group v-model="form.role">
              <el-radio-button value="Customer" label="Customer" />
              <el-radio-button value="Farmer" label="Farmer" />
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="btns">
          <button @click="onSubmit">Save</button>
          <button @click="back">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const request = inject('request')
const router = useRouter()
const loading = ref(false)
const registerForm = ref(null)
// const timer = ref(120)
// const timerObj = ref(null)
const form = reactive({
  code: '',
  role: '',
  password: '',
  email: '',
})
const rules = reactive({
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, trigger: ['blur', 'change'], }
  ],
  role: [
    { required: true, trigger: ['blur', 'change'], }
  ],
  code: [
    { required: true, trigger: ['blur', 'change'], }
  ],
})

const onSubmit = async () => {
  const validate = await registerForm.value.validate(pass => pass)
  if (!validate) return;
  loading.value = true
  request.post('/api/register/add', form).then(res => {
    loading.value = false
    if (res?.data?.statu === 'success') {
      ElMessage({
        message: 'register success !',
        type: 'success',
      })
      router.replace('/login')
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
        type: 'warn',
      })
  })
}

const back = () => {
  router.go(-1)
}

// const sendCodes = () => {
//   if (!form.email) {
//     ElMessage({
//       message: 'Enter your email address please',
//       type: 'warning',
//     })
//     return
//   }
//   loading.value = true
//   request.post('/api/register/getcode', form).then(res => {
//     loading.value = false
//     if (res?.data?.statu === 'success') {
//       ElMessage({
//         message: 'success ! please pay attnetion to your email',
//         type: 'success',
//       })
//       timerObj.value = setInterval(() => {
//         if (timer.value <= 0) {
//           clearInterval(timerObj.value)
//           timerObj.value = null
//         }
//         timer.value -= 1
//       }, 1000);
//     } else {
//       ElMessage({
//         message: res.data.data,
//         type: 'warning',
//       })
//     }
//   }).catch(err => {
//     loading.value = false
//     ElMessage({
//         message: err.data,
//         type: 'warning',
//       })
//   })
// }
</script>

<style lang="scss" scoped>
.title {
  font-size: 60px;
  text-shadow: 2px 2px 4px #000000;
  color: #8cba4d;
  text-align: center;
  padding: 20px 0;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
  .box {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    transform: translateY(-100px);
  }
  .body {
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: #fff;
    padding:  30px 30px;
  }
  .btns {
    text-align: center;
    border-top: 1px solid #ededed;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    button {
      width: calc(50% - 10px);
      font-size: 26px;
      border-radius: 5px;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      outline: none;
      border: none;
    }
  }
}
.flexWrap {
  display: flex;
  align-items: center;
  width: 100%;
  & > div:first-child {
    flex: 1;
    margin-right: 10px;
  }
}
</style>