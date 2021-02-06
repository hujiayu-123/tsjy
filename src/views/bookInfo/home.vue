<template>
  <div class="home">
    <el-carousel class="carousel" :interval="4000">
      <el-carousel-item>
        <img :src="require('@/assets/img/banner1.jpg')" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="require('@/assets/img/banner2.jpg')" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="require('@/assets/img/banner3.jpg')" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img :src="require('@/assets/img/banner4.jpg')" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="list">
      <div class="list-lay">
        <div class="item" v-for="item in navList" :key="item.sid">
          <div class="title">
            <div>{{ item.catalog }}</div>
            <div class="more" @click="handleToMore(item)">
              查看更多<i class="iconfont icon-xiangyou1"></i>
            </div>
          </div>
          <div class="book-list">
            <div class="book-item" v-for="i in item.list" :key="i.tid">
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
              <div class="name">{{ i.bookname }}</div>
              <div class="tag">{{ i.tag }}</div>
              <div class="price">￥{{ i.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      navList: []
    };
  },
  mounted() {
    this.handleNav();
  },
  methods: {
    // 查看更多
    handleToMore(val) {
      this.$router.push({
        path: "/bookList",
        query: {
          id: val.cid
        }
      });
    },
    // 获取列表数据
    handleNav() {
      api.catc().then(res => {
        if (res.code === 200) {
          this.navList = res.data;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.home {
  .carousel {
    width: 1200px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .list {
    background: #f5f5f5;
    overflow: hidden;
    margin-top: 50px;
    .list-lay {
      width: 1200px;
      margin: 0px auto;
      padding-top: 20px;
    }
    .item {
      margin-bottom: 20px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 22px;
        .more {
          cursor: pointer;
          font-size: 16px;
          color: #666;
          .iconfont {
            font-size: 14px;
          }
          &:hover {
            color: #409eff;
          }
        }
      }
      .book-list {
        display: flex;
        flex-wrap: wrap;
      }
      .book-item {
        cursor: pointer;
        background: #fff;
        width: calc(20% - 10px);
        height: 300px;
        margin-right: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        transition: all 0.2s linear;
        .avatar-img {
          width: 100px;
          height: 120px;
          margin-bottom: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 90%;
          text-align: center;
        }
        .tag {
          color: #c7c7c7;
          font-size: 14px;
          margin: 10px auto;
        }
        .price {
          color: #409eff;
        }
        &:hover {
          box-shadow: 0px 3px 20px #c7c7c7;
          margin-top: -1px;
        }
      }
    }
  }
}
</style>
