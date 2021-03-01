<template>
  <div class="buy">
    <div class="title">
      <div class="title-lay">
        <div class="left">
          <div class="avatar-img">
            <img :src="require('@/assets/img/logo1.png')" alt="" />
          </div>
          <div class="title-name">{{ titleName }}</div>
        </div>
        <div class="right">
          <AccountDropDown />
          <div @click="handleToOrder">我的订单</div>
        </div>
      </div>
    </div>
    <div class="section"><router-view></router-view></div>
  </div>
</template>
<script>
import AccountDropDown from "../../component/AccountDropDown";
export default {
  components: {
    AccountDropDown
  },
  data() {
    return {
      titleName: "我的购物车"
    };
  },
  watch: {
    $route: {
      handler() {
        this.handleIsPath();
      },
      deep: true
    }
  },
  mounted() {
    this.handleIsPath();
  },
  methods: {
    handleIsPath() {
      let path = this.$route.path;
      if (path === "/buy/buyCar") {
        this.titleName = "我的购物车";
      } else if (path === "/buy/okOrder") {
        this.titleName = "确认订单";
      } else if (path === "/buy/confirm") {
        this.titleName = "支付订单";
      }
    },
    // 跳转我的订单页面
    handleToOrder() {
      let routeUrl = this.$router.resolve({
        path: "/user/order"
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
<style lang="less">
.buy {
  .title {
    width: 100%;
    height: 100px;
    border-bottom: 2px solid #409eff;
    .title-lay {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      .left {
        display: flex;
        align-items: center;
        .avatar-img {
          width: 80px;
          height: 80px;
          margin-right: 20px;
          img {
            width: 100%;
          }
        }
        .title-name {
          font-size: 25px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #757575;
        .el-dropdown {
          color: #757575;
          font-size: 14px;
        }
        div {
          padding: 0 15px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
  .section {
    background: #f5f5f5;
    min-height: calc(100vh - 102px);
    padding: 40px 0;
    box-sizing: border-box;
  }
}
</style>
