<template>
  <div class="layout">
    <div class="home-img" v-if="isShow">
      <div class="home-lay">
        <img class="img" :src="require('@/assets/img/home.png')" alt="" />
      </div>
    </div>
    <div class="nav">
      <div class="nav-lay" v-if="isLogin">
        <div>
          <el-dropdown class="el-dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">我的喜欢</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>我的订单</div>
        <div :class="isShop ? 'shop-car-a' : 'shop-car'">
          <el-popover
            @show="handleShow"
            placement="bottom-end"
            width="300"
            trigger="hover"
          >
            <div slot="reference">
              <i class="icon-gouwuche iconfont"></i>
              购物车(0)
            </div>
            <div class="shop">购物车中还没有选购商品，赶紧选购吧</div>
          </el-popover>
        </div>
      </div>
      <div class="nav-lay" v-else>
        <div @click="handleToLogin">登录</div>
        <div @click="handleToRegister">注册</div>
      </div>
    </div>
    <div class="nav-filter-lay">
      <div class="nav-filter">
        <div class="left">
          <div class="avatar-img">
            <img :src="require('@/assets/img/logo1.png')" alt="" />
          </div>
          <div class="type">
            <div class="type-item" v-for="item in navList" :key="item.cid">
              {{ item.catalog }}
              <div class="hidden-list">
                <div class="list">
                  <div
                    class="list-lay"
                    v-for="(i, index) in item.list.slice(0, 6)"
                    :key="i.bid"
                  >
                    <div class="item">
                      <div class="avatar-img">
                        <img
                          :src="
                            i.bookimg
                              ? i.bookimg
                              : 'require(`@/assets/img/pic-top.jpg`)'
                          "
                          alt=""
                        />
                      </div>
                      <div class="title">{{ i.bookname }}</div>
                      <div class="price">￥{{ i.price }}</div>
                    </div>
                    <div class="hr" v-if="index != 5"></div>
                  </div>
                  <div
                    class="more"
                    v-if="item.list.length > 6"
                    @click="handleToMore(item)"
                  >
                    查看更多<i class="iconfont icon-xiangyou1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <el-input
            class="inp"
            placeholder="请输入关键字"
            v-model="keyword"
            @keyup.enter.native="handleSearch"
          />
          <div class="search-btn" @click="handleSearch">
            <i class="iconfont icon-sousuo"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="item">
        <div><i class="iconfont icon-wode"></i></div>
        <div>个人中心</div>
      </div>
      <div class="item">
        <div><i class="iconfont icon-gouwuche"></i></div>
        <div>购物车</div>
      </div>
    </div>
    <el-backtop> </el-backtop>
    <router-view></router-view>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      isShop: false,
      keyword: "",
      isShow: false,
      navList: [],
      isLogin: false,
      userInfo: {}
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
    this.handleNav();
    this.handleIsLogin();
    this.handleIsPath();
  },
  methods: {
    handleIsPath() {
      if (this.$route.path === "/home") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 判断当前是否登录
    handleIsLogin() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    // 获取导航数据
    handleNav() {
      api.catc().then(res => {
        if (res.code === 200) {
          this.navList = res.data;
        }
      });
    },
    // 跳转登录页
    handleToLogin() {
      this.$router.push({ path: "/login" });
    },
    // 跳转注册页
    handleToRegister() {
      this.$router.push({ path: "/register" });
    },
    // 查看更多
    handleToMore(val) {
      console.log(val);
      this.$router.push({
        path: "/bookList",
        query: {
          id: val.cid
        }
      });
    },
    // 搜索关键字
    handleSearch() {
      this.$router.push({
        path: "/bookList",
        query: {
          name: this.keyword
        }
      });
    },
    handleCommand(type) {
      console.log(type);
    },
    handleShow() {
      console.log(111);
    }
  }
};
</script>
<style lang="less">
.layout {
  .home-img {
    width: 100%;
    height: 120px;
    background-image: linear-gradient(#208af8, #999b55);
    .home-lay {
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      position: relative;
      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 200px;
      }
    }
  }
  .nav {
    width: 100%;
    height: 40px;
    font-size: 12px;
    color: #b0b0b0;
    background: #333;
    .nav-lay {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      div {
        padding: 0 15px;
        height: 100%;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
        .el-dropdown {
          font-size: 12px;
          color: #b0b0b0;
        }
      }
    }
  }
  .nav-filter-lay {
    position: relative;
    width: 100%;
    .nav-filter {
      width: 1200px;
      height: 100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        width: 100%;
        .avatar-img {
          width: 80px;
          height: 80px;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .type {
          display: flex;
          height: 100%;
          line-height: 100px;
          .type-item {
            padding: 0 15px;
            cursor: pointer;
            .hidden-list {
              width: 100%;
              position: absolute;
              height: 0;
              background: #fff;
              line-height: 20px;
              left: 0;
              top: 100px;
              z-index: 99;
              transition: height 0.3s;
              box-shadow: 0px 3px 7px #f0f0f0;
              overflow: hidden;
              border-top: 0;
              .list {
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                .list-lay {
                  display: flex;
                  width: 16%;
                }
                .item {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  justify-content: center;
                  overflow: hidden;
                  .avatar-img {
                    width: 80px;
                    height: 100px;
                    margin-right: 0;
                    margin-bottom: 5px;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .title {
                    margin: 5px 0;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 90%;
                    margin: 0 auto;
                    text-align: center;
                  }
                  .price {
                    color: #409eff;
                  }
                }
                .hr {
                  width: 1px;
                  height: 100px;
                  background: #f0f0f0;
                }
                .more {
                  font-size: 14px;
                  color: #c0c0c0;
                  width: 70px;
                  .iconfont {
                    font-size: 12px;
                  }
                  &:hover {
                    color: #409eff;
                  }
                }
              }
            }
            &:hover {
              color: #409eff;
              .hidden-list {
                color: #2c3e50;
                height: 200px;
                border-top: 1px solid #f0f0f0;
              }
            }
          }
        }
      }
      .right {
        width: 300px;
        flex-shrink: 0;
        margin-left: 50px;
        display: flex;
        .inp {
          width: calc(100% - 38px);
          .el-input__inner {
            border-radius: 0;
          }
        }
        .search-btn {
          width: 38px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          border: 1px solid #dcdfe6;
          border-left: 0;
          cursor: pointer;
          .iconfont {
            font-size: 20px;
          }
          &:hover {
            background: #409eff;
            color: #fff;
            border: 1px solid #409eff;
          }
        }
      }
    }
  }
  .aside {
    position: fixed;
    right: 0;
    top: 125px;
    border-left: 1px solid #f5f5f5;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    z-index: 9999;
    .item {
      width: 80px;
      height: 80px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      color: #757575;
      div {
        margin-top: 5px;
      }
      .iconfont {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .icon-gouwuche {
        font-size: 25px;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
}
.el-dropdown-menu__item {
  font-size: 12px;
}
.shop {
  font-size: 12px;
  text-align: center;
  padding: 20px;
}
.shop-car {
  background: #424242;
}
.shop-car-a {
  background: #409eff;
  color: #fff;
}
</style>
