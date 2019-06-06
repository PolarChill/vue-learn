<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld :msg="msg"/>
    <div>
      <router-link :to="{name: 'mall'}">Mall</router-link> |
      <router-link :to="{name: 'kform'}">KForm</router-link> |
      <router-link :to="{name: 'eleform'}">EleForm</router-link> |
      <router-link :to="{name: 'about'}">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {

  name: "home",
  components: {
    HelloWorld
  },
  // 解耦路由参数
  props: {
    user: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      msg: `Welcome to ${window.user} Vue.js App`
    }
  },
};
</script>
