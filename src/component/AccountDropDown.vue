<template>
  <div class="dropdown">
    <el-dropdown class="el-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">个人中心</el-dropdown-item>
        <el-dropdown-item command="b">我的喜欢</el-dropdown-item>
        <el-dropdown-item command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.handleUserInfo();
  },
  methods: {
    // 获取用户信息
    handleUserInfo() {
      let userInfo = localStorage.getItem("userInfo");
      this.userInfo = JSON.parse(userInfo);
    },
    handleCommand(type) {
      if (type === "a") {
        let routeUrl = this.$router.resolve({
          path: "/user/center"
        });
        window.open(routeUrl.href, "_blank");
      } else if (type === "b") {
        let routeUrl = this.$router.resolve({
          path: "/user/likeShop"
        });
        window.open(routeUrl.href, "_blank");
      } else {
        this.$router.push({ path: "/login" });
        localStorage.clear();
      }
    }
  }
};
</script>
<style lang="less">
.dropdown {
  .el-dropdown {
    font-size: 12px;
    color: #b0b0b0;
  }
}
.el-dropdown-menu__item {
  font-size: 12px;
}
</style>
