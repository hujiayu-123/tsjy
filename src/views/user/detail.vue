<template>
  <div class="order-detail">
    <div class="bg-border">
      <div class="title">
        订单详情
      </div>
      <div class="flex-m">
        <div class="code">订单号：{{ orderDetail.oid }}</div>
        <div class="btn">
          <div class="canel" @click="handleCancel">取消订单</div>
          <div class="pay" @click="handlePay">立即付款</div>
        </div>
      </div>
    </div>
    <div>
      <div class="status color">{{ status[orderDetail.pstate] }}</div>
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="percentage"
        :format="format(orderDetail)"
        status="exception"
      ></el-progress>
      <div class="list">
        <div
          class="item flex-m"
          v-for="(item, index) in orderDetail.content"
          :key="index"
        >
          <div class="avatar-img">
            <img :src="item.bookImg" alt="" />
          </div>
          <div>{{ item.bookname }} ({{ item.booktype }})</div>
          <div>{{ item.price }}元 x {{ item.count }}</div>
        </div>
      </div>
      <div class="status">收货信息</div>
      <div class="item-b">
        <div class="item-txt">
          <span class="font"
            >姓<span v-html="'\u00a0'"></span><span v-html="'\u00a0'"></span
            ><span v-html="'\u00a0'"></span><span v-html="'\u00a0'"></span
            ><span v-html="'\u00a0'"></span><span v-html="'\u00a0'"></span
            ><span v-html="'\u00a0'"></span>名：</span
          >{{ addressInfo.name }}
        </div>
        <div class="item-txt">
          <span class="font">联系电话：</span>{{ addressInfo.mobile }}
        </div>
        <div class="item-txt">
          <span class="font">收货地址：</span>{{ addressInfo.location }}
        </div>
      </div>
      <div class="status">支付方式</div>
      <div class="item-b">
        <div class="item-txt"><span class="font">支付方式：</span>在线支付</div>
      </div>
      <div class="right">
        <div>
          <div>商品总价:</div>
          <div class="color">{{ orderDetail.tprice }}元</div>
        </div>
        <div>
          <div>运费:</div>
          <div class="color">0元</div>
        </div>
        <div>
          <div>应付金额:</div>
          <div class="color">
            <span class="size">{{ orderDetail.tprice }}</span
            >元
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  data() {
    return {
      oid: "",
      orderDetail: {},
      status: {
        0: "等待付款",
        1: "等待收货",
        2: "交易完成"
      },
      progressStates: {
        0: "下单",
        1: "配货",
        2: "交易完成"
      },
      percentage: 0,
      addressInfo: {}
    };
  },
  mounted() {
    this.oid = this.$route.query.id;
    this.getOrderDetail();
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      api.orderList({ oid: this.$route.query.id }).then(res => {
        if (res.code === 200) {
          this.orderDetail = res.data;
          api.address({ aid: res.data.aid }).then(res => {
            if (res.code === 200) {
              this.addressInfo = res.data;
            }
          });
          if (this.orderDetail.pstate === 0) {
            this.percentage = 33.33;
          } else if (this.orderDetail.pstate === 1) {
            this.percentage = 66.66;
          } else if (this.orderDetail.pstate === 2) {
            this.percentage = 100;
          }
        }
      });
    },
    format(list) {
      return () => {
        return this.progressStates[list.pstate];
      };
    },
    // 取消订单
    handleCancel() {
      this.$confirm("您确定要取消订单吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.drawOrder({ oid: this.orderDetail.oid }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "取消订单成功!"
              });
              this.$router.push({ path: "/user/order" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 立即付款
    handlePay() {
      this.$router.push({
        path: "/buy/confirm",
        query: {
          id: this.orderDetail.oid
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order-detail {
  color: #757575;
  padding: 20px;
  .bg-border {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  .title {
    font-size: 30px;
  }
  .flex-m {
    justify-content: space-between;
    margin-top: 20px;
    .code {
      font-size: 18px;
      color: #333333;
    }
    .btn {
      display: flex;
      & > div {
        padding: 5px 30px;
        margin-bottom: 10px;
        font-size: 12px;
        cursor: pointer;
        margin-left: 10px;
      }
      .pay {
        background: #409eff;
        color: #fff;
      }
      .canel {
        border: 1px solid #c0c0c0;
      }
    }
  }
  .status {
    line-height: 60px;
    font-size: 18px;
  }
  .list {
    margin-top: 20px;
    .item {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #e0e0e0;
      margin-top: 0;
      font-size: 14px;
      .avatar-img {
        width: 60px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .item-b {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
    .font {
      font-weight: bold;
    }
    .item-txt {
      margin-bottom: 5px;
    }
  }
  .right {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & > div {
      display: flex;
      margin-bottom: 5px;
    }
    & > div:last-child {
      margin-top: 10px;
    }
    .color {
      min-width: 100px;
      display: flex;
      justify-content: flex-end;
    }
    .size {
      font-size: 20px;
    }
  }
}
</style>
