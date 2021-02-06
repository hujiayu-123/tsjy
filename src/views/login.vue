<template>
  <div class="login">
    <div class="title">
      <div class="avatar-img">
        <img :src="require('@/assets/img/logo1.png')" alt="" />
      </div>
      <div class="title-txt">
        <div class="txt-big">起点读书</div>
        <div class="txt-small">让每个人都能享受读书的乐趣</div>
      </div>
    </div>
    <div class="section">
      <div class="section-lay">
        <div class="login-box">
          <div class="box-title">账号登录</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item prop="account">
              <el-input
                placeholder="邮箱"
                type="text"
                v-model="ruleForm.account"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                type="password"
                v-model="ruleForm.password"
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
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="tip">
            <span @click="handleToRegister">立即注册</span>
            <span class="hr"></span>
            <span @click="handleToResetPwd">忘记密码？</span>
          </div>
          <div class="sanfang">
            <div>
              <i
                @click="handleToTripartite('qq')"
                title="QQ登录"
                class="iconfont icon-qq qq"
              ></i>
            </div>
            <div>
              <i
                @click="handleToTripartite('wb')"
                title="微博登录"
                class="iconfont icon-weibo-copy wb"
              ></i>
            </div>
            <div>
              <i
                @click="handleToTripartite('zfb')"
                title="支付宝登录"
                class="iconfont icon-zhifubao zfb"
              ></i>
            </div>
            <div>
              <i
                @click="handleToTripartite('wx')"
                title="微信登录"
                class="iconfont icon-weixin wx"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
        verification: "",
        sid: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      svgHtml: ""
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
        sid: uuidv4()
      };
      this.ruleForm.sid = param.sid;
      api.captcha(param).then(res => {
        this.svgHtml = res.data;
      });
    },
    // 登录
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let ruleForm = this.ruleForm;
          let params = {
            username: ruleForm.account,
            password: ruleForm.password,
            sid: ruleForm.sid,
            svgCode: ruleForm.verification
          };
          api.login(params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              localStorage.setItem("token", res.token);
              this.$store.commit("setInfo", res);
              this.$router.push({ path: "/home" });
            }
          });
        }
      });
    },
    // 跳转注册页
    handleToRegister() {
      this.$router.push({ path: "/register" });
    },
    handleToResetPwd() {
      this.$router.push({ path: "/reset" });
    },
    // 第三方登录
    handleToTripartite(type) {
      if (type === "wb") {
      } else {
        this.$message({
          message: "功能暂未开发，敬请期待",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less">
.login {
  .title {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .avatar-img {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title-txt {
      .txt-big {
        font-size: 30px;
        font-weight: bold;
      }
      .txt-small {
        font-size: 14px;
        color: #c7c7c7;
        margin-top: 10px;
      }
    }
  }
  .section {
    width: 100%;
    height: 550px;
    background: url(../assets/img/logo-bg.jpg) no-repeat;
    background-size: 100%;
    .section-lay {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .login-box {
        width: 400px;
        height: calc(100% - 30px);
        position: absolute;
        right: 20px;
        top: 30px;
        background: #fff;
        padding: 0 30px;
        box-sizing: border-box;
        .box-title {
          font-size: 25px;
          text-align: center;
          height: 80px;
          line-height: 80px;
          color: #409eff;
        }
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
        .el-input__inner {
          height: 50px;
        }
        .el-button {
          padding: 16px;
        }
        .btn-sub {
          width: 100%;
        }
        .tip {
          color: #c7c7c7;
          text-align: center;
          span {
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
          .hr {
            width: 1px;
            height: 12px;
            background: #c7c7c7;
            vertical-align: middle;
            margin: 0 5px;
            display: inline-block;
          }
        }
        .sanfang {
          position: absolute;
          bottom: 30px;
          width: 340px;
          height: 30px;
          display: flex;
          justify-content: center;
          div {
            padding: 0 15px;
            .iconfont {
              font-size: 30px;
              cursor: pointer;
            }
            .qq {
              color: #0288d1;
            }
            .wb {
              color: #d32f2f;
            }
            .zfb {
              color: #00aaee;
            }
            .wx {
              color: #00d20d;
            }
          }
        }
      }
    }
  }
}
</style>
