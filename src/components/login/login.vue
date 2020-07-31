<template>
  <div>
    <h1>登录页面</h1>
    <el-button type="primary" @click="goHome" :disabled="false"
      >跳去HOME页面</el-button
    >

    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
    >
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getLoginData"
          >登录</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

// import api from '@/api/index.js'
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'right',
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'Home' })
    },
    async getLoginData () {
      const res = await this.$http.getLoginData(this.formData)
      console.log(res.data)
    },
    resetForm () {
      this.formData = {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
