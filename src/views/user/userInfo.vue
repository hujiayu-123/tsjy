<template>
  <div class="userInfo info">
    <div class="title">
      个人信息
    </div>
    <div class="content">
      <div class="img">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :on-change="fileChange"
          action="#"
          :http-request="handleUpload"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="tip">(点击头像修改)</div>
      </div>
      <div class="info">
        <div class="info-tit">
          <h3>基础资料</h3>
          <div class="color" @click="dialogVisible = true">编辑</div>
        </div>
        <div class="info-sec">昵称：{{ userInfo.name }}</div>
        <div class="info-sec">性别：{{ userInfo.sex }}</div>
        <div class="info-tit">
          <h3>高级设置</h3>
          <div class="color" @click="handleSet">管理</div>
        </div>
        <div class="info-sec">银行卡</div>
        <div class="info-sec">数据权力中心</div>
      </div>
    </div>
    <el-dialog
      title="编辑基础资料"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="昵称：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  inject: ["reload"],
  data() {
    return {
      imageUrl: "",
      userInfo: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        gender: "0"
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 上传头像
    handleUpload(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      api.upload(formData).then(res => {
        if (res.code === 200) {
          this.imageUrl = "https://3g7096967c.qicp.vip/" + res.data;
          this.handleApi({ avater: this.imageUrl });
        }
      });
    },
    fileChange() {
      /**
       * 1. 清除文件对象
       * */
      this.$refs.upload.clearFiles();
    },
    // 修改信息
    handleApi(params) {
      api.basic(params).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: res.msg
          });
          let userInfo = { ...this.userInfo, ...params };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.reload();
          this.getUserInfo();
        }
      });
    },
    // 获取用户信息
    getUserInfo() {
      let userInfo = localStorage.getItem("userInfo");
      this.userInfo = JSON.parse(userInfo);
      this.imageUrl = this.userInfo.avater;
      this.ruleForm.name = this.userInfo.name;
      this.ruleForm.gender = this.userInfo.sex === "女" ? "1" : "0";
    },
    // 提交表单
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            name: this.ruleForm.name,
            sex: this.ruleForm.gender === "0" ? "男" : "女"
          };
          this.handleApi(params);
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    handleSet() {
      this.$message({
        type: "warning",
        message: "该功能暂未开发，敬请期待！"
      });
    }
  }
};
</script>
<style lang="less">
.info {
  height: calc(100% - 60px);
  .content {
    display: flex;
    align-items: center;
    height: 100%;
    .tip {
      width: 178px;
      text-align: center;
      font-size: 14px;
    }
    .img {
      width: 250px;
      flex-shrink: 0;
    }
  }
  .info {
    width: 100%;
    .info-tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .color {
        cursor: pointer;
      }
    }
    .info-sec {
      margin-bottom: 15px;
    }
  }
  .el-form-item {
    display: flex;
    justify-content: center;
  }
  .el-form-item__content {
    width: 80%;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
