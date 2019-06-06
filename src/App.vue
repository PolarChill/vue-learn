 <template>
  <div id="app">
    <!-- 占位符 -->

    <router-view></router-view>
    <!-- elementUI -->
    <!-- <h6 style="text-align:center">elementUI FormItem</h6>
    <element-form/>
    <hr>
    <h6 style="text-align:center">My FormItem</h6>
    <form-test></form-test>
    <hr>
    <h6>Cart</h6>
    <mall></mall>-->
  </div>
</template>

<script>
// import Mall from "./components/Cart/Index.vue";
// import ElementForm from "./components/eleForm/ElementForm.vue";
// import FormTest from "./components/KForm/FormTest";
export default {
  name: "app",
  created() {
    console.log(this.$route);
  },
  // 组件按需引入
  components: {
    // ElementForm,
    // FormTest,
    // Mall
  },

  methods: {
    toHome(params) {
      this.$router.push(params);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
