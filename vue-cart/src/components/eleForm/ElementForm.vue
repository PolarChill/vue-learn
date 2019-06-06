<template>
  <el-form :model="eleForm" :rules="eleRules" ref="LoginForm">
    <el-form-item label="用户名" prop="name">
      <el-input type="text" v-model="eleForm.name"></el-input>
    </el-form-item>
    <!-- 绑定的要和prop相同 -->
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="eleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('eleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "ElementForm",
  data() {
    return {
      // element form data
      eleForm: {
        name: "",
        pwd: ""
      },
      eleRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // eleForm
    submitForm() {
      // 拿实例
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          alert("表单提交成功");
        } else {
          console.log("表单提交失败");
          // alert('校验失败')
          return false;
        }
      });
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
</style>
