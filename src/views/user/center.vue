<template>
  <div class="userInfo">
    <div class="flex-m top">
      <div class="info flex-m">
        <div class="avatar-img">
          <img
            :src="
              userInfo.avater
                ? userInfo.avater
                : require('@/assets/img/top-pic.png')
            "
            alt=""
          />
        </div>
        <div class="account-info">
          <div class="user-name">{{ userInfo.name }}</div>
          <div>{{ greetTxt }}</div>
          <div class="edit-info color" @click="handleTo('/user/userInfo')">
            修改个人信息 >
          </div>
        </div>
      </div>
      <div class="info other-info">
        <div>账户安全：</div>
        <div>绑定手机：未绑定</div>
        <div>绑定邮箱：</div>
      </div>
    </div>
    <div class="shop-info">
      <div class="flex-m info">
        <div class="avatar-img">
          <img :src="require('@/assets/img/wait-pay.png')" alt="" />
        </div>
        <div>
          <div class="big">
            待支付的订单：<span class="color">{{ waitPay }}</span>
          </div>
          <div class="small" @click="handleTo('/user/order?type=1')">
            查看待支付订单<i class="iconfont icon-xiangyou1"></i>
          </div>
        </div>
      </div>
      <div class="flex-m info">
        <div class="avatar-img">
          <img :src="require('@/assets/img/wait-shop.png')" alt="" />
        </div>
        <div>
          <div class="big">
            待收货的订单：<span class="color">{{ waitRgoods }}</span>
          </div>
          <div class="small" @click="handleTo('/user/order?type=2')">
            查看待收货订单<i class="iconfont icon-xiangyou1"></i>
          </div>
        </div>
      </div>
      <div class="flex-m info">
        <div class="avatar-img">
          <img :src="require('@/assets/img/wait-comment.png')" alt="" />
        </div>
        <div>
          <div class="big">
            待评价商品数：<span class="color">{{ waitComment }}</span>
          </div>
          <div class="small" @click="handleTo('/user/comment')">
            查看待评价商品数<i class="iconfont icon-xiangyou1"></i>
          </div>
        </div>
      </div>
      <div class="flex-m info">
        <div class="avatar-img">
          <img :src="require('@/assets/img/like-shop.png')" alt="" />
        </div>
        <div>
          <div class="big">喜欢的商品：<span class="color">0</span></div>
          <div class="small" @click="handleTo('/user/likeShop')">
            查看喜欢的商品<i class="iconfont icon-xiangyou1"></i>
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
      userInfo: {},
      greetTxt: "早上好 ~",
      waitPay: 0,
      waitRgoods: 0,
      waitComment: 0
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.handleIsTime();
    this.getOrderList();
    this.getCommentList();
  },
  methods: {
    handleIsTime() {
      //判断当前时间段
      let num = new Date().getHours();
      if (num >= 6 && num <= 8) {
        this.greetTxt = "早上好 ~";
      } else if (num >= 9 && num <= 11) {
        this.greetTxt = "上午好 ~";
      } else if (num >= 12 && num <= 13) {
        this.greetTxt = "中午好 ~";
      } else if (num >= 14 && num <= 18) {
        this.greetTxt = "下午好 ~";
      } else if (num >= 19 && num <= 22) {
        this.greetTxt = "晚上好 ~";
      } else {
        this.greetTxt = "该休息了 ~";
      }
    },
    // 获取订单列表
    getOrderList(type) {
      api.orderList().then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            if (item.pstate === 0) {
              this.waitPay += 1;
            } else if (item.pstate === 2) {
              this.waitRgoods += 1;
            }
          });
        }
      });
    },
    // 获取待评价列表
    getCommentList() {
      api.pstateorder().then(res => {
        if (res.code === 200) {
          this.waitComment = res.data.length;
        }
      });
    },
    // 路由跳转
    handleTo(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>
<style scoped lang="less">
.userInfo {
  padding: 20px;
  color: #757575;
  .top {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 30px;
  }
  .flex-m {
    .info {
      width: 50%;
      .avatar-img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .account-info {
        .user-name {
          font-size: 24px;
          color: #616161;
          margin-bottom: 10px;
        }
        .edit-info {
          font-size: 12px;
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
    .other-info {
      div {
        margin-bottom: 10px;
      }
    }
  }
  .shop-info {
    display: flex;
    flex-wrap: wrap;
    .info {
      width: 50%;
      margin-top: 50px;
      .avatar-img {
        margin-right: 20px;
      }
      .big {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .small {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
