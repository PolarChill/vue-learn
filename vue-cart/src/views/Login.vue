<template>
  <div style="text-align: center">
    <label for="user">用户名</label>
    <input name="user" v-model="user" type="text">
    <br>
    <button @click="login">点击确认登录</button>
    <h3>{{loginStatus}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      loginStatus: ""
    };
  },
  methods: {
    login() {
      window.isLogin = true;
      sessionStorage.setItem('user',this.user)
    //   localStorage.setTimeout(60)
      window.user= this.user
      this.loginStatus = "登录中...";
      this.$router.push(`/home`);
    }
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => next(), 1000);
  }
};
</script>

<style  scoped>
</style>