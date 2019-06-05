 <template>
  <div id="app">
    <!-- elementUI -->
    <h6 style="text-align:center">elementUI FormItem</h6>
    <element-form/>
    <hr>
    <h6 style="text-align:center">My FormItem</h6>
    <form-test></form-test>
    <hr>
    <!-- v-if 是否展示该元素  渲染不渲染的区别  -->
    <!-- v-show 渲染 display:none的区别  -->
    <p v-if="showName">{{hukui}}</p>
    <!-- 循环语句 -->

    <div>
      <p>
        <label for="text">商品名称</label>
        <input type="text" v-model="text">
        <label for="price">商品价格</label>
        <input type="text" v-model="price">
        <!-- 事件处理 @ -->
        <button @click="addNewGood">添加新商品</button>
      </p>
      <ul>
        <!-- :xxx 表达式 -->
        <li v-for="(good, index) in goods" :key="index">
          <span>{{good.name}}</span>
          <span>${{good.price}}</span>
          <button @click="addGood(index)">加入购物车</button>
        </li>
      </ul>
      <hr>
      <!-- 购物车 -->
      <Cart :name="name"></Cart>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Cart from "./components/Cart.vue";
import axios from "axios";
import ElementForm from "./components/ElementForm.vue";
import FormTest from "./components/Form/FormTest";
// import RandomId from "./components/utils";
export default {
  name: "app",
  // 组件按需引入
  components: {
    HelloWorld,
    Cart,
    ElementForm,
    FormTest
  },
  // data中的数据  this.xxx即可
  data() {
    return {
      // cart data
      hukui: "hukui",
      showName: true,
      text: "test",
      price: "10",
      goods: [],
      name: "购物车表",
      myInput: "input"
    };
  },
  async created() {
    // 创建钩子, 组件创建时完成执行一次
    setTimeout(() => {
      this.showName = false;
    }, 2000);
    // 查询产品列表
    try {
      const res = await axios.get("/api/goods");
      this.goods = res.data.list;
    } catch (error) {
      console.log(error);
    }

    // 旧写法
    // axios
    //   .get("/api/goods")
    //   .then(res => {
    //     this.goods = res.data.list;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  // 增加应该在cart中维护, cart拥有该字段, 通知
  methods: {
    // eleForm
    submitForm() {
      if (true) {
        alert("表单提交成功");
      } else {
        console.log(errors);
      }
    },
    // cart
    addGood(index) {
      const good = this.goods[index];
      // Vue的每个实例都有发布订阅模式 $emit $on  父子通过props传递, 如果没有明显的关系, 用总线机制传输
      // 发布 $emit 订阅$on
      this.$bus.$emit("addGood", good);
      // this.$emit("addGood", good)
      // this.cart.push({});
      // this.text = "";
    },

    addNewGood() {
      this.goods.push({
        name: this.text,
        price: this.price,
        id: this.RandomId(6)
      });
      this.text = "";
      this.price = "";
    },

    RandomId(len) {
      Math.random()
        .toString(36)
        .substr(3, len);
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
