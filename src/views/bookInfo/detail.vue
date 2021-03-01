<template>
  <div class="detail">
    <div class="detail-lay">
      <div class="book-img">
        <img :src="detailData.bookimg" alt="" />
      </div>
      <div class="detail-info">
        <div class="book-name">{{ detailData.bookname }}</div>
        <div class="book-detail">
          <div>作者：{{ detailData.author }}</div>
          <div>出版社：{{ detailData.pubcompany }}</div>
        </div>
        <div class="price-type">
          <div>
            <el-radio v-model="bookType" label="1"
              >新书售价：<span class="color1"
                >￥{{ detailData.price }}</span
              ></el-radio
            >
          </div>
          <div>
            <el-radio v-model="bookType" label="2"
              >二手书售价：<span class="color1"
                >￥{{ detailData.price * 0.8 }}</span
              ><span class="dis">（8折）</span></el-radio
            >
          </div>
        </div>
        <div class="time">
          上书时间：<span class="time-col">{{ detailData.created }}</span>
        </div>
        <div class="time">数量: <span class="color">100</span></div>
        <div class="btn">
          <el-button plain @click="handelPay">立即购买</el-button>
          <el-button type="primary" @click="handleToShopCar"
            >加入购物车</el-button
          >
          <el-button @click="handleLike"
            ><i class="iconfont icon-xihuan" :class="isLike ? 'red' : ''"></i
            >喜欢</el-button
          >
        </div>
      </div>
    </div>
    <div class="detail-des">
      <div class="left">
        <div class="left-list">
          <div class="title">临时通知</div>
          <div class="content">
            正常发货。谢绝议价。议价信息不回复。临近年底，快递都大幅涨价，加之各地疫情管控不同，快递时效不保，请耐心等待。
          </div>
        </div>
        <div class="left-list">
          <div class="title">本店分类</div>
          <div class="content">
            <div
              class="item"
              v-for="item in typeList"
              :key="item.cid"
              @click="handleToList(item)"
            >
              {{ item.catalog }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div
          :class="isActive ? 'title-a title' : 'title'"
          @click="isActive = true"
        >
          商品详情
        </div>
        <div
          :class="isActive ? 'title' : 'title-a title'"
          @click="isActive = false"
        >
          店铺评价
        </div>
        <div class="des-bg">
          <div v-if="isActive">
            <div>商品分类：{{ detailData.catalog }}</div>
            <div>内容</div>
            <div class="detail-img">
              <img :src="require('@/assets/img/1.jpg')" alt="" />
              <img :src="require('@/assets/img/2.jpg')" alt="" />
              <img :src="require('@/assets/img/3.jpg')" alt="" />
            </div>
          </div>
          <div v-else>
            <div
              class="item flex-m"
              v-for="item in commentList"
              :key="item.cid"
            >
              <div class="comment-info">
                <div>
                  <el-rate disabled v-model="item.rate" show-text> </el-rate>
                </div>
                <div class="content">
                  {{ item.content }}
                </div>
                <div class="list-img">
                  <el-image
                    v-for="i in item.commImg"
                    :key="i"
                    style="width: 100px; height: 100px"
                    :src="i"
                    :preview-src-list="[i]"
                  >
                  </el-image>
                </div>
                <div class="time">{{ item.created }}</div>
              </div>
              <div class="user-info">
                <div class="avater-img">
                  <img :src="item.avater" alt="" />
                </div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div class="no-data-txt" v-if="commentList.length === 0">
              该商品暂无评价
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
      detailData: {},
      isActive: true,
      typeList: [],
      bookType: "1",
      isLike: false,
      rate: 5,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ],
      commentList: []
    };
  },
  mounted() {
    this.handleDetail();
    this.handleComment();
    this.typeList = this.$store.state.typeList;
  },
  methods: {
    // 获取详情数据
    handleDetail() {
      let params = {
        bid: this.$route.query.id
      };
      api.detail(params).then(res => {
        if (res.code === 200) {
          this.detailData = res.data[0];
        }
      });
    },
    // 获取评论列表
    handleComment() {
      api
        .getComment({
          bid: this.$route.query.id
        })
        .then(res => {
          if (res.code === 200) {
            this.commentList = res.data;
          }
        });
    },
    // 判断商品是否被喜欢
    handleIsLike() {},
    // 喜欢/取消喜欢
    handleLike() {
      this.$message({
        type: "warning",
        message: "该功能暂未开发，敬请期待！"
      });
      // this.isLike = !this.isLike;
    },
    // 跳转分类图书列表
    handleToList(val) {
      let routeUrl = this.$router.resolve({
        path: "/bookList",
        query: {
          id: val.cid
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    // 添加购物车
    handleToShopCar() {
      let params = {
        bid: this.detailData.bid,
        count: 1,
        pubbook: this.bookType === "1" ? "新书" : "二手书"
      };
      api.shop(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "添加成功，可以到购物车查看",
            type: "success"
          });
          this.$store.dispatch("getShopList");
        }
      });
    },
    // 立即购买
    handelPay() {
      let params = {
        count: 1,
        pubbook: this.bookType === "1" ? "新书" : "二手书",
        price: this.detailData.price
      };
      let obj = { ...this.detailData, ...params };
      let puyList = [];
      puyList.push(obj);
      this.$router.push({
        path: "okOrder",
        name: "okOrder",
        params: {
          shop: JSON.stringify(puyList)
        }
      });
    }
  }
};
</script>
<style lang="less">
.detail {
  .detail-lay {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    .book-img {
      width: 200px;
      height: 220px;
      margin-right: 30px;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
    .detail-info {
      width: 100%;
      & > div {
        margin-bottom: 20px;
      }
      .book-name {
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
      }
      .book-detail {
        width: 100%;
        padding: 14px;
        border: 1px solid #e5e5e5;
        font-size: 14px;
        display: flex;
        box-sizing: border-box;
        div {
          width: 50%;
        }
      }
      .price-type {
        padding: 14px;
        background: #f3f0e9;
        font-size: 14px;
        .el-radio {
          color: #999;
        }
        div {
          margin-bottom: 10px;
          &:nth-child(2) {
            margin-bottom: 0;
          }
        }
        .color1 {
          font-size: 18px;
        }
        .dis {
          margin-left: 6px;
        }
      }
      .time {
        font-size: 14px;
        color: #999;
        .time-col {
          color: #2c3e50;
        }
      }
      .btn {
        display: flex;
        .iconfont {
          margin-right: 5px;
          font-size: 20px;
          vertical-align: text-bottom;
        }
        .red {
          color: red;
        }
      }
    }
  }
  .detail-des {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .left {
      width: 200px;
      flex-shrink: 0;
      margin-right: 10px;
      .left-list {
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .title {
          width: 100%;
          line-height: 40px;
          background: #f2f7fd;
          padding: 0 14px;
        }
        .content {
          font-size: 12px;
          padding: 14px;
          .item {
            margin-bottom: 5px;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }
    .right {
      width: 100%;
      background: #fafafa;
      .title {
        padding: 0 30px;
        line-height: 40px;

        cursor: pointer;

        display: inline-block;
      }
      .title-a {
        border-top: 2px solid #409eff;
        background: #fff;
      }
      .des-bg {
        width: 80%;
        background: #fff;
        padding: 0 30px 30px;
        font-size: 14px;
        overflow: hidden;
        & > div > div {
          margin-top: 10px;
        }
        .detail-img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        .item {
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #f0f0f0;
          .comment-info {
            width: 80%;
            .content {
              margin: 8px 0 5px 0;
            }
            .time {
              font-size: 12px;
              color: #969696;
              margin-top: 10px;
            }
          }
          .user-info {
            text-align: center;
            align-self: flex-start;
            .avater-img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              margin-bottom: 10px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        .no-data-txt {
          font-size: 20px;
          margin: 40px 0 0 0;
          color: #969696;
        }
      }
    }
  }
}
</style>
