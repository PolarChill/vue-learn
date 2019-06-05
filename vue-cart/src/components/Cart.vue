<template>
  <div>
    <p>{{name}}</p>
    <div class="cart">
      <table border="1">
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
        </tr>
        <!-- 动态样式类  绑定属性的表达式方式 :xxx = '{}' -->
        <!-- 动态样式类 -->
        <!-- 动态内联属性 -->
        <tr
          v-for="(c,index) in cart"
          :key="index"
          :class="{'cart-active':c.active}"
          :style="{'background' : c.active ? 'red' : 'white' }"
        >
          <td>
            <input type="checkbox" name="hukui" id="hukui" v-model="c.active">
          </td>
          <td>{{c.name}}</td>
          <td>￥{{c.price}}</td>
          <td>
            <button @click="minus(index)">-</button>
            {{c.count}}
            <button @click="add(index)">+</button>
          </td>

          <td>￥{{c.price*c.count}}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">{{activeCount}}/{{count}}</td>
          <td colspan="2">{{total}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "cart",
  props: { name: { type: String, default: "", required: true } },
  created() {
    // 订阅
    this.$bus.$on("addGood", good => {
      this.addGood(good);
    });
    this.cart = JSON.parse(window.localStorage.getItem("cart") || []);
  },
  data() {
    return {
      cart: []
    };
  },
  methods: {
    addGood(good) {
      // 查找有没有
      const ret = this.cart.find(v => v.id === good.id);
      if (ret) {
        ret.count += 1;
      } else {
        this.cart.push({
          ...good,
          count: 1,
          active: true
        });
      }
    },
    minus(i) {
      const count = this.cart[i].count;
      if (count > 1) {
        this.cart[i].count -= 1;
      } else {
        this.cart.splice(i, 1);
      }
    },
    add(i) {
      this.cart[i].count += 1;
    },
    setLocal() {
      window.localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  watch: {
    // 监听cart  浅
    cart: function() {
      this.setLocal();
    },
    // 深
    // cart:{
    //     hanalde(n, o) {
    //         this.setLocal()
    //     },
    //     deep: true
    // }
  },
  // 随着data的变化而时刻变化, 计算复杂字段  return
  computed: {
    total() {
      let num = 0;
      this.cart.forEach(v => {
        if (v.active) {
          num += v.count * v.price;
        }
      });
      return num;
    },
    activeCount() {
      return this.cart.filter(v => v.active).length;
    },
    count() {
      return this.cart.length;
    }
  }
};
</script>
<style  scoped>
.cart {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-active {
  color: green;
}
</style>
