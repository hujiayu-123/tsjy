<template>
  <div class="order">
    <div class="title">
      我的订单
    </div>
    <div class="flex-m">
      <div class="tab">
        <div :class="isActive == 0 ? 'color' : ''" @click="handleTabOrder(0)">
          全部有效订单
        </div>
        <div class="hr"></div>
        <div :class="isActive == 1 ? 'color' : ''" @click="handleTabOrder(1)">
          待支付
        </div>
        <div class="hr"></div>
        <div :class="isActive == 2 ? 'color' : ''" @click="handleTabOrder(2)">
          待收货
        </div>
        <div class="hr"></div>
        <div :class="isActive == 3 ? 'color' : ''" @click="handleTabOrder(3)">
          已完成
        </div>
      </div>
      <div class="search">
        <el-input
          @keyup.enter.native="handleSearch"
          v-model="keyword"
          placeholder="输入商品名称、订单号"
        />
        <div class="search-btn" @click="handleSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-list">
        <div class="section-item" v-for="item in orderList" :key="item.oid">
          <div class="section-title">
            <div>
              <div class="color size">{{ status[item.pstate] }}</div>
              <div class="info">
                <div>{{ item.created }}</div>
                <div class="hr"></div>
                <div>{{ addressInfo.name }}</div>
                <div class="hr"></div>
                <div>订单号：{{ item.oid }}</div>
                <div class="hr"></div>
                <div>在线支付</div>
              </div>
            </div>
            <div class="money">
              应付金额：<span class="size">{{ item.tprice }}</span
              >元
            </div>
          </div>
          <div class="section-info">
            <div>
              <div
                class="shop-info"
                v-for="(i, index) in item.content"
                :key="index"
              >
                <div class="avatar-img">
                  <img :src="i.bookImg" alt="" />
                </div>
                <div class="info">
                  <div>
                    {{ i.bookname
                    }}{{ i.booktype === "新书" ? "" : "（二手书）" }}
                  </div>
                  <div>{{ i.price }}元 x {{ i.count }}</div>
                </div>
              </div>
            </div>
            <div class="btn">
              <div class="pay" @click="handlePay(item)">立即付款</div>
              <div class="detail" @click="handleToDetail(item)">订单详情</div>
            </div>
          </div>
        </div>
        <div class="pagination" v-if="orderList.length !== 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="1"
            :current-page="currentPage"
            :total="total"
            @current-change="handleCurrent"
          >
          </el-pagination>
        </div>
      </div>
      <Empty :msg="'暂无订单信息'" v-if="orderList.length === 0" />
    </div>
  </div>
</template>
<script>
import Empty from "../../component/Empty";
import api from "../../api/index";
export default {
  components: {
    Empty
  },
  data() {
    return {
      isActive: 0,
      orderList: [],
      keyword: "",
      addressInfo: {},
      currentPage: 1,
      orderTotalList: [],
      total: 0,
      status: {
        0: "等待付款",
        1: "等待收货",
        2: "交易完成"
      }
    };
  },
  mounted() {
    this.isActive = Number(this.$route.query.type) || 0;
    this.getOrderList(this.isActive);
  },
  methods: {
    // 切换订单状态
    handleTabOrder(type) {
      this.currentPage = 1;
      this.isActive = type;
      this.orderList = [];
      if (type === 1) {
        this.orderTotalList.map(item => {
          if (item.pstate === 0) {
            this.orderList.push(item);
          }
        });
        this.total = this.orderList.length;
        this.orderList = this.orderList.slice(0, 1);
      } else if (type === 2) {
        this.orderTotalList.map(item => {
          if (item.pstate === 1) {
            this.orderList.push(item);
          }
        });
        this.total = this.orderList.length;
        this.orderList = this.orderList.slice(0, 1);
      } else if (type === 3) {
        this.orderTotalList.map(item => {
          if (item.pstate === 2) {
            this.orderList.push(item);
          }
        });
        this.total = this.orderList.length;
        this.orderList = this.orderList.slice(0, 1);
      } else {
        this.total = this.orderTotalList.length;
        this.orderList = this.orderTotalList.slice(0, 1);
      }
    },
    // 获取订单列表
    getOrderList(type) {
      api.orderList().then(res => {
        if (res.code === 200) {
          this.orderTotalList = res.data;
          // this.orderList = res.data.slice(0, 1);
          this.handleTabOrder(type);
          api.address({ aid: res.data[0].aid }).then(res => {
            if (res.code === 200) {
              this.addressInfo = res.data;
            }
          });
        }
      });
    },
    // 立即付款
    handlePay(val) {
      this.$router.push({
        path: "/buy/confirm",
        query: {
          id: val.oid
        }
      });
    },
    // 跳转订单详情
    handleToDetail(val) {
      this.$router.push({
        path: "/user/detail",
        query: {
          id: val.oid
        }
      });
    },
    // 分页
    handleCurrent(value) {
      this.currentPage = value;

      if (this.isActive === 1) {
        let list = [];
        this.orderTotalList.map(item => {
          if (item.pstate === 0) {
            list.push(item);
          }
        });
        this.orderList = list.slice(this.currentPage - 1, this.currentPage);
      } else if (this.isActive === 2) {
        let list = [];
        this.orderTotalList.map(item => {
          if (item.pstate === 1) {
            list.push(item);
          }
        });
        this.orderList = list.slice(this.currentPage - 1, this.currentPage);
      } else if (this.isActive === 3) {
        let list = [];
        this.orderTotalList.map(item => {
          if (item.pstate === 2) {
            list.push(item);
          }
        });
        this.orderList = list.slice(this.currentPage - 1, this.currentPage);
      } else {
        this.orderList = this.orderTotalList.slice(
          this.currentPage - 1,
          this.currentPage
        );
      }
    },
    // 搜索订单
    handleSearch() {
      console.log(this.keyword);
    }
  }
};
</script>
<style lang="less">
.order {
  color: #757575;
  padding: 20px;
  .title {
    font-size: 30px;
  }
  .flex-m {
    justify-content: space-between;
    height: 56px;
    width: 100%;
    .tab {
      display: flex;
      align-items: center;
      div {
        cursor: pointer;
      }
      .hr {
        margin: 0 15px;
        width: 1px;
        height: 14px;
        background: #e0e0e0;
      }
    }
    .search {
      display: flex;
      .search-btn {
        width: 38px;
        height: 38px;
        border: 1px solid #dcdfe6;
        text-align: center;
        line-height: 38px;
        border-left: 0;
        .iconfont {
          font-size: 18px;
        }
      }
      .el-input__inner {
        border-radius: 0;
      }
    }
  }
  .section {
    width: 100%;
    min-height: calc(100vh - 366px);
    position: relative;
    .section-list {
      margin-top: 10px;
      .section-item {
        width: 100%;
        border: 1px solid #409eff;
        .section-title {
          width: 100%;
          height: 100px;
          background: rgba(64, 158, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
          border-bottom: 0.5px solid #409eff;
          .size {
            font-size: 20px;
          }
          .money {
            align-self: flex-end;
            .size {
              font-size: 20px;
              color: #424242;
            }
          }
          .info {
            display: flex;
            font-size: 14px;
            align-items: center;
            margin-top: 10px;
            .hr {
              margin: 0 10px;
              width: 1px;
              height: 12px;
              background: #e0e0e0;
            }
          }
        }
        .section-info {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          .shop-info {
            display: flex;
            align-items: center;
            margin: 10px 0;
            .avatar-img {
              width: 40px;
              height: 60px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              & > div {
                margin-top: 10px;
              }
            }
          }
          .btn {
            & > div {
              padding: 5px 30px;
              margin-bottom: 10px;
              font-size: 12px;
              cursor: pointer;
            }
            .pay {
              background: #409eff;
              color: #fff;
            }
            .detail {
              border: 1px solid #c0c0c0;
            }
          }
        }
      }
      .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
