<template>
  <div class="userInfo likeshop">
    <div class="title">
      喜欢的商品
    </div>
    <!-- <div class="list">
      <div class="item" @click="handleToDetail(item)">
        <div class="image-img">
          <img :src="require('@/assets/img/1.jpg')" alt="" />
        </div>
        <div class="name">书名</div>
        <div class="money color">1111元</div>
        <div class="btn">
          <div class="del" @click="handleDel(item)">删除</div>
          <div class="detail" @click="handleToDetail(item)">查看详情</div>
        </div>
      </div>
    </div> -->
    <div class="content">您暂未收藏任何商品。</div>
  </div>
</template>
<script>
import api from "../../api/index";
export default {
  data() {
    return {
      likeList: []
    };
  },
  methods: {
    // 获取喜欢的商品
    getList() {},
    // 删除商品
    handleDel(val) {
      this.$confirm("确定删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 跳转详情
    handleToDetail(val) {
      let routeUrl = this.$router.resolve({
        path: `/detail`,
        query: {
          id: val.bid
        }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
<style scoped lang="less">
.likeshop {
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
        margin: 20px 0 5px 0;
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
}
</style>
