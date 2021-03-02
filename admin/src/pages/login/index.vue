<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="register('ruleForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.postJson("/login", this.ruleForm).then(res => {
            console.log("登录参数", res);
            if (res.code != 200)
              return this.$message({
                type: "warning",
                message: `${res.msg}`
              });

            let data = res.body;
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("userInfo", data.userInfo);
            this.$router.push("/ArticleList");
          });
        } else {
          return false;
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.postJson("/register", this.ruleForm).then(res => {
            if (res.code != 200)
              return this.$message({
                type: "warning",
                message: `${res.msg}`
              });
            let data = res.body;
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("userInfo", data.userInfo);
            this.$message({
              type: "success",
              message: `${res.msg}`
            });
            this.$router.push("/ArticleList");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
