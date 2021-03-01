<template>
  <div class="user">
    <div class="user-lay">
      <div class="left">
        <p>订单中心</p>
        <router-link to="/user/order" tag="div">我的订单</router-link>
        <router-link to="/user/comment" tag="div">评价晒图</router-link>
        <p>个人中心</p>
        <router-link to="/user/center" tag="div">我的个人中心</router-link>
        <router-link to="/user/likeShop" tag="div">喜欢的商品</router-link>
        <router-link to="/user/address" tag="div">收货地址</router-link>
        <p>账户管理</p>
        <router-link to="/user/userInfo" tag="div">个人信息</router-link>
        <router-link to="/reset" tag="div">修改密码</router-link>
      </div>
      <div class="right"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="less">
.user {
  min-height: calc(100vh - 140px);
  background: #f5f5f5;
  overflow: hidden;
  .user-lay {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    .left {
      width: 200px;
      background: #fff;
      margin-right: 20px;
      flex-shrink: 0;
      padding: 20px;
      & > div {
        cursor: pointer;
        color: #757575;
        font-size: 14px;
        line-height: 30px;
        &:hover {
          color: #333;
        }
      }
      p {
        font-size: 18px;
      }
      .router-link-active {
        color: #409eff;
        &:hover {
          color: #409eff;
        }
      }
    }
    .right {
      width: 100%;
      padding: 20px;
      background: #fff;
    }
  }
}
</style>
