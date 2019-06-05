<template>
  <div>
    <input :type="type" :value="inputValue" @input="handleInput" @blur="handleBlur">
  </div>
</template>
<script>
export default {
  name: "KInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type:{
      type:String,
      default:'text',
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
      // 通知formItem做校验
      // this.$parent.$emit('validate', this.inputValue)
    },
    handleBlur(event) {
      this.$parent.$emit('validate' , this.inputValue)
    }
  }
};
</script>
<style scoped>
</style>
