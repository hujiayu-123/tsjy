<template>
  <div class="userInfo comment">
    <div class="title">
      订单评价
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in commentList"
        :key="index"
        @click="handleToOrderDetail(item)"
      >
        <div class="image-img">
          <img :src="item.bookImg" alt="" />
        </div>
        <div class="name">
          {{ item.bookname }}{{ item.booktype === "二手书" ? "(二手书)" : "" }}
        </div>
        <div class="money color">{{ item.price }}元</div>
        <div class="btn">
          <div class="detail" @click.stop="handleShowDialog(item)">评价</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="评价"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="星级：" prop="rate">
          <el-rate v-model="ruleForm.rate" show-text> </el-rate>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :http-request="handleProgress"
            :on-change="fileChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content" v-if="commentList.length === 0">
      暂时没有符合条件的商品。
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      ruleForm: {
        oid: "",
        bid: "",
        rate: 0,
        content: ""
      },
      rules: {
        rate: [{ required: true, message: "请选择星级", trigger: "change" }],
        content: [
          { required: true, message: "请输入评价内容", trigger: "change" }
        ]
      },
      fileList: [],
      commentList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取待评价列表
    getList() {
      api.pstateorder().then(res => {
        if (res.code === 200) {
          this.commentList = res.data;
        }
      });
    },
    // 评价弹窗
    handleShowDialog(val) {
      this.dialogVisible = true;
      this.ruleForm.bid = val.bid;
      this.ruleForm.oid = val.oid;
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 上传图片
    handleProgress(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      api.upload(formData).then(res => {
        if (res.code === 200) {
          let obj = {
            name: file.file.name,
            url: "https://3g7096967c.qicp.vip/" + res.data
          };
          this.fileList.push(obj);
        }
      });
    },
    fileChange() {
      /**
       * 1. 清除文件对象
       * */
      this.$refs.upload.clearFiles();
    },
    // 提交评价 表单
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        let commImg = [];
        this.fileList.map(item => {
          commImg.push(item.url);
        });
        if (valid) {
          let params = {
            ...this.ruleForm,
            commImg
          };
          api.addComment(params).then(res => {
            if (res.code === 200) {
              this.handleClose();
              this.getList();
              this.$message({
                type: "success",
                message: res.msg
              });
            }
          });
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.ruleForm.rate = 0;
      this.ruleForm.content = "";
      this.fileList = [];
    },
    // 跳转订单详情
    handleToOrderDetail(val) {
      this.$router.push({
        path: "/user/detail",
        query: {
          id: val.oid
        }
      });
    }
  }
};
</script>
<style lang="less">
.comment {
  .content {
    font-size: 18px;
    text-align: center;
    color: #b0b0b0;
    margin: 40px 0;
  }
  .list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .item {
      border-bottom: 1px solid #e0e0e0;
      margin-top: 20px;
      width: 25%;
      height: 330px;
      text-align: center;
      cursor: pointer;
      .image-img {
        width: 80%;
        margin: 0 auto;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        width: 80%;
        margin: 20px auto 5px auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        margin-top: 20px;
        justify-content: space-around;
        display: none;
        & > div {
          width: 40%;
          height: 25px;
          text-align: center;
          line-height: 25px;
          cursor: pointer;
          font-size: 12px;
        }
        .del {
          border: 1px solid #e0e0e0;
          color: #b0b0b0;
          &:hover {
            background: #b0b0b0;
            border-color: #b0b0b0;
            color: #fff;
          }
        }
        .detail {
          border: 1px solid #409eff;
          color: #fff;
          background: #409eff;
        }
      }
      &:hover {
        .btn {
          display: flex;
        }
      }
    }
  }
  .el-form-item {
    display: flex;
    justify-content: center;
  }
  .el-form-item__content {
    width: 80%;
    display: flex;
    align-items: center;
    margin-left: 0 !important;
  }
  .upload-demo {
    width: 100%;
  }
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
}
</style>
