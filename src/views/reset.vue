<template>
  <div class="reset">
    <div class="reset-box">
      <div class="avatar-img">
        <img :src="require('@/assets/img/logo.png')" alt="" />
      </div>
      <div class="reset-form" v-show="isReset">
        <div class="title">重置密码</div>
        <div class="tip">请输入新的密码</div>
        <el-form
          :model="resetForm"
          :rules="resetRules"
          ref="resetForm"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              v-model="resetForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="okpassword">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="resetForm.okpassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn-sub"
              type="primary"
              @click="handleSubmit('resetForm')"
              >完成
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="reset-form" v-show="!isReset">
        <div class="title">重置密码</div>
        <div class="tip">请输入注册时的邮箱地址</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱"
              type="text"
              v-model="ruleForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn-sub"
              type="primary"
              @click="handleSubmit('ruleForm')"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resetForm.okpassword !== "") {
          this.$refs.resetForm.validateField("okpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isReset: false,
      ruleForm: {
        email: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      resetForm: {
        password: "",
        okpassword: ""
      },
      resetRules: {
        okpassword: [{ validator: validatePass2, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.$route.query.username) {
      this.ruleForm.email = this.$route.query.username;
      this.isReset = true;
    } else {
      this.isReset = false;
    }
  },
  methods: {
    // 注册
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ruleForm = this[formName];
          if (formName === "ruleForm") {
            let params = {
              username: ruleForm.email
            };
            api.resetPwdemail(params).then(res => {
              if (res.code === 200) {
              }
            });
          } else {
            let params = {
              username: this.ruleForm.email,
              password: ruleForm.okpassword
            };
            api.reset(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: "修改成功，请重新登录",
                  type: "success"
                });
                this.$router.push({ path: "/login" });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.reset {
  width: 100%;
  height: 100vh;
  background: #f9f9f9;
  overflow: hidden;
  .reset-box {
    width: 800px;
    background: #fff;
    position: absolute;
    padding-bottom: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .avatar-img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .reset-form {
      width: 330px;
      height: calc(100% - 100px);
      margin: 0 auto;
      .title {
        font-size: 25px;
        text-align: center;
        margin-bottom: 30px;
      }
      .tip {
        font-weight: bold;
        color: #666;
        margin-bottom: 10px;
      }
      .btn-sub {
        width: 100%;
      }
    }
  }
}
</style>
