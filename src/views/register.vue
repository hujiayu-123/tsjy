<template>
  <div class="register">
    <div class="register-box">
      <div class="avatar-img">
        <img :src="require('@/assets/img/logo.png')" alt="" />
      </div>
      <div class="register-form">
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
          <el-form-item prop="name">
            <el-input
              placeholder="昵称"
              type="text"
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="okpassword">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="ruleForm.okpassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="ver-inp" prop="verification">
            <el-input
              placeholder="验证码"
              type="text"
              v-model="ruleForm.verification"
            ></el-input>
            <div class="ver-box">
              <div class="verification-img" v-html="svgHtml"></div>
              <div class="tip" @click="handleChangeSvg">看不清？换一张</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-sub" type="primary" @click="handleSubmit"
              >立即注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.okpassword !== "") {
          this.$refs.ruleForm.validateField("okpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        name: "",
        password: "",
        okpassword: "",
        verification: "",
        sid: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        okpassword: [{ validator: validatePass2, trigger: "blur" }],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      svgHtml: "",
    };
  },
  mounted() {
    this.handleSvg();
  },
  methods: {
    // 切换验证码
    handleChangeSvg() {
      this.handleSvg();
    },
    // 获取图片验证码
    handleSvg() {
      let param = {
        sid: uuidv4(),
      };
      this.ruleForm.sid = param.sid;
      api.captcha(param).then((res) => {
        this.svgHtml = res.data;
      });
    },
    // 注册
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let ruleForm = this.ruleForm;
          let params = {
            name: ruleForm.name,
            username: ruleForm.email,
            password: ruleForm.okpassword,
            sid: ruleForm.sid,
            svgCode: ruleForm.verification,
          };
          api.reg(params).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: "注册成功",
                type: "success",
              });
              this.$router.push({ path: "/login" });
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less">
.register {
  width: 100%;
  height: 100vh;
  background: #f9f9f9;
  overflow: hidden;
  .register-box {
    width: 800px;
    background: #fff;
    margin: calc(50vh - 250px) auto;
    .avatar-img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .register-form {
      width: 330px;
      height: calc(100% - 100px);
      margin: 0 auto;
      .ver-inp {
        .el-input {
          width: calc(100% - 120px);
          margin-right: 20px;
        }
      }
      .ver-box {
        float: right;
        .verification-img {
          width: 100px;
          height: 40px;
          vertical-align: middle;
        }
        .tip {
          font-size: 12px;
          line-height: 20px;
          color: #999999;
          text-decoration: underline;
          cursor: pointer;
          position: absolute;
          &:hover {
            color: #409eff;
          }
        }
      }
      .btn-sub {
        width: 100%;
      }
    }
  }
}
</style>
