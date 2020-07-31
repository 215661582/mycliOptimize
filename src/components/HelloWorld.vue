<template>
  <div class="hello">
    <h1>vue 首页</h1>
    <el-button type="primary" @click="goLogin">去登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
