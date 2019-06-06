<template>
  <div>
    <hr>
    <label>store中的count</label>
    <h2>{{process}}:{{count}}</h2>
    <button @click="increase">同步增加</button>
    <button @click="increaseAsync">异步增加</button>
    <h2>{{money}}</h2>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "vuex-learn",

  computed: {
    ...mapGetters(["money"]),
    ...mapState(["count"])
  },
  data() {
    return {
      process: [this.$store.state.count]
    };
  },
  watch: {
    count(newValue, oldValue) {
      this.process.push(newValue);
      console.log("new: %s, old: %s", newValue, oldValue);
    }
  },
  methods: {
    ...mapActions(["increaseAsync"]),
    ...mapMutations(["increase"])
  }
};
</script>

<style  scoped>
</style>