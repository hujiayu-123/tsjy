<template>
  <div class="confirm">
    <div :class="isShrink ? 'confirm-lay confirm-show' : 'confirm-lay'">
      <div class="success-icon">
        <i class="iconfont icon-chenggong"></i>
      </div>
      <div class="info">
        <div class="info-top">
          <div>
            <div class="size info-title">订单提交成功！去付款咯 ~</div>
            <div class="margin">超时后将取消订单</div>
            <div class="address-info" v-if="!isShrink">
              {{ addressInfo.name }} {{ addressInfo.mobile }}
              {{ addressInfo.location }}
            </div>
          </div>
          <div class="right">
            <div class="color">
              应付总额：<span class="size">{{ orderDetail.tprice }}</span
              >元
            </div>
            <div class="more" @click="handleShowDetail">
              订单详情<i class="iconfont icon-arrow_down"></i>
            </div>
          </div>
        </div>
        <div class="info-detail">
          <div>
            订单账号：<span class="color">{{ orderDetail.oid }}</span>
          </div>
          <div>
            收货信息：{{ addressInfo.name }} {{ addressInfo.mobile }}
            {{ addressInfo.location }}
          </div>
          <div class="flex-m">
            <div>商品信息：</div>
            <div>
              <div v-for="item in orderDetail.content" :key="item.oid">
                {{ item.bookname }}
              </div>
            </div>
          </div>
          <div>发票信息：电子普通发票 个人</div>
        </div>
      </div>
    </div>
    <div class="pay-type">
      <div class="pay-title">选择以下支付方式付款</div>
      <div class="pay-list">
        <div
          :class="isActive === 1 ? 'pay-item pay-item-a' : 'pay-item'"
          @click="handlePayType(1)"
        >
          <img :src="require('@/assets/img/wx-pay.jpg')" alt="" />
        </div>
        <div
          :class="isActive === 2 ? 'pay-item pay-item-a' : 'pay-item'"
          @click="handlePayType(2)"
        >
          <img :src="require('@/assets/img/zfb-pay.jpg')" alt="" />
        </div>
      </div>
    </div>
    <el-dialog
      :title="payTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="code-img" v-html="qrCode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  data() {
    return {
      isShrink: false,
      isActive: 0,
      dialogVisible: false,
      payTitle: "微信支付",
      qrCode: "",
      orderDetail: {},
      addressInfo: {}
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      api.orderList({ oid: this.$route.query.id }).then(res => {
        if (res.code === 200) {
          this.orderDetail = res.data;
          api.address({ aid: res.data.aid }).then(res => {
            if (res.code === 200) {
              this.addressInfo = res.data;
            }
          });
        }
      });
    },
    // 详情 展开 收起
    handleShowDetail() {
      this.isShrink = !this.isShrink;
    },
    // 支付弹窗
    handlePayType(type) {
      this.getQrCode();
      this.isActive = type;
      if (type === 1) {
        this.payTitle = "微信支付";
      } else {
        this.payTitle = "支付宝支付";
      }
      this.dialogVisible = true;
    },
    // 获取支付二维码
    getQrCode() {
      api.qrCode({ oid: this.$route.query.id }).then(res => {
        this.qrCode = res;
        setTimeout(() => {
          api.scan({ oid: this.$route.query.id }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "支付成功！"
              });
              this.$router.push({ path: "/home" });
            }
          });
        }, 2000);
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.isActive = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.confirm {
  .confirm-lay {
    width: 1200px;
    padding: 20px 0;
    background: #fff;
    margin: 0 auto;
    display: flex;
    max-height: 130px;
    transition: max-height 0.3s;
    overflow: hidden;
    .success-icon {
      width: 180px;
      text-align: center;
      flex-shrink: 0;
      .iconfont {
        font-size: 100px;
        color: #83c44e;
      }
    }
    .info {
      width: 100%;
      padding: 20px 40px 20px 0;
      color: #757575;
      font-size: 14px;
      .info-top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .info-title {
          color: #424242;
        }
        .margin {
          margin: 10px 0;
        }
        .right {
          text-align: right;
          .more {
            margin-top: 15px;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
            .iconfont {
              font-size: 10px;
              margin-left: 4px;
            }
          }
        }
        .size {
          font-size: 30px;
        }
      }
    }
    .info-detail {
      padding-top: 10px;
      & > div {
        margin-top: 10px;
      }
      .flex-m {
        align-items: baseline;
      }
    }
  }
  .confirm-show {
    max-height: 500px;
    .info-detail {
      border-top: 1px solid #f0f0f0;
    }
  }
  .pay-type {
    width: 1200px;
    margin: 20px auto;
    padding: 0 30px 30px 30px;
    background: #fff;
    box-sizing: border-box;
    .pay-title {
      font-size: 18px;
      line-height: 75px;
      border-bottom: 1px solid #f0f0f0;
    }
    .pay-list {
      padding-top: 20px;
      display: flex;
      .pay-item {
        margin-bottom: 10px;
        margin-right: 10px;
        border: 1px solid #c0c0c0;
        cursor: pointer;
      }
      .pay-item-a {
        border-color: #409eff;
      }
    }
  }
  .code-img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
