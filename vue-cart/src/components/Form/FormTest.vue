<template>
  <div>
    <k-form :model="kForm" :rules="kRules" ref="KloginForm">
      <k-form-item lable="用户名" prop="name">
        <k-input v-model="kForm.name"></k-input>
      </k-form-item>
      <k-form-item lable="密码" prop="pwd">
        <k-input v-model="kForm.pwd" type="password"></k-input>
      </k-form-item>

      <k-form-item>
        <el-button type="primary" @click="submitForm2('eleForm')">提交</el-button>
      </k-form-item>
    </k-form>
    {{kForm}}
  </div>
</template>
<script>
import KInput from "./KInput.vue";
import KForm from "./KForm.vue";
import KFormItem from "./KFormItem.vue";
export default {
  name: "FormTest",
  components: {
    KInput,
    KForm,
    KFormItem
  },
  data() {
    return {
      kForm: {
        name: "huku",
        pwd: "123"
      },
      kRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm2() {
      // 拿到实例进行回调
      this.$refs.KloginForm.validate(valid => {
        if (valid) {
          alert("表单提交成功");
        } else {
          alert("校验失败");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
