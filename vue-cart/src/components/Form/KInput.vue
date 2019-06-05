<template>
  <div>
    <input type="text" :value="inputValue" @input="handleInput">
  </div>
</template>
<script>
export default {
  name: "KInput",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
        // 单项数据流, 不能更改props
      inputValue: this.value
    };
  },
  methods: {
    handleInput(event) {
      this.inputValue = event.target.value;
      // 通知父组件更新值
      this.$emit('input', this.inputValue)
    }
  }
};
</script>
<style scoped>
</style>
