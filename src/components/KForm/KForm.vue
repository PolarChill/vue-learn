<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: "KForm",
  provide() {
    return {
      // 将表单实例传递给后代
      form: this
    };
  },
  created () {
      this.fileds = []
      this.$on('formItemAdd', item => this.fileds.push(item));
  },
  methods: {
      // 回调函数
      async validate(callback) {
          // 将formItem数组转换为valiadate()返回的prmoise数组
          const tasks = this.fileds.map( item => item.validate())
          // 获取所有结果统一处理
          const results = await Promise.all(tasks)
          let ret = true
          results.forEach(
              valid => {
                  if (!valid) {
                      ret = false
                  }
              }
          )
          callback(ret)
          
      }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    // 校验规则不是必须的
    rules: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
</style>