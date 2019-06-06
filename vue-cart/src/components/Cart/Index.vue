<template>
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
      <!-- v-if 是否展示该元素  渲染不渲染的区别  -->
      <!-- v-show 渲染 display:none的区别  -->
      <!-- <p v-if="showName">{{hukui}}</p> -->
      <!-- 循环语句 -->
      <!-- :xxx 表达式 -->
      <li v-for="(good, index) in goods" :key="index">
        <span style="margin: 0 5px">{{good.name}}</span>
        <span style="margin: 0 20px">${{good.price}}</span>
        <button style="margin: 0 5px" @click="addGood(index)">加入购物车</button>
      </li>
    </ul>
    <!-- 购物车 -->
    <Cart :name="name"></Cart>
  </div>
</template>

<script>
import axios from "axios";
import Cart from "./Cart.vue";

export default {
  // data中的数据  this.xxx即可
  name: "mall",
  components: {
    Cart
  },
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

    // 测试自己派发, 自己监听
    this.$on("myself", msg => {
      alert(`我自己和自己说话:${msg}`);
    });

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
      this.$emit("myself", "添加商品");
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

<style scoped>
ol,
ul {
  list-style: none;
}
li {
  list-style-type: none;
}
</style>