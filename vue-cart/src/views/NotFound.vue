<template>
  <div style="text-align: center">
      <h1>404</h1>
    <span @click="goHome">跳转到首页</span>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      if (sessionStorage.getItem('user')) {
        this.$router.push({ name: "home" });
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style  scoped>
span {
  cursor: pointer;
}
span:hover {
  color: silver;
}
</style>