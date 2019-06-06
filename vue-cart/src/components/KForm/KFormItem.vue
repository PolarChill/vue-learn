<template>
  <div>
    <label v-if="lable">{{lable}}</label>
    <div>
      <slot></slot>
      <span v-if="validateStatus == 'error'" class="error">{{errorMessage}}</span>
    </div>
  </div>
</template>
<script>
import schema from "async-validator";
export default {
  name: "KFormItem",
  inject: ["form"],
  created() {
    // 创建时监听事件
    this.$on("validate", this.validate);
  },
  mounted() {
    if (this.prop) {
      this.$parent.$emit("formItemAdd", this);
    }
  },
  data() {
    return {
      validateStatus: "",
      errorMessage: ""
    };
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        // 校验当前项 依赖async-validate
        const descriptor = { [this.prop]: this.form.rules[this.prop] };
        const validator = new schema(descriptor);
        validator.validate({ [this.prop]: this.form.model[this.prop] }, errors => {
          if (errors) {
            this.validateStatus = "error";
            this.errorMessage = errors[0].message;
            resolve(false)
          } else {
            this.validateStatus = "";
            this.errorMessage = "";
            resolve(true)
          }
        });
      });
    }
  },
  props: {
    lable: {
      type: String
    },
    prop: {
      type: String
    }
  }
};
</script>
<style scoped>
.error {
  color: red;
}
</style>
