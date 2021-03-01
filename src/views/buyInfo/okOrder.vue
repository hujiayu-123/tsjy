<template>
  <div class="order">
    <div class="okorder">
      <div class="order-title">
        <div class="tit-add">收货地址</div>
        <div class="address-list">
          <div
            :class="
              isActive === item.aid ? 'a-address address' : 'h-address address'
            "
            v-for="(item, index) in addressList"
            :key="index"
            @click="handleClick(item)"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.mobile }}</div>
            <div>{{ item.controlment.replace(/,/g, " ") }}</div>
            <div>{{ item.location }}</div>
            <div class="edit color" @click="handleShowAddress('edit', item)">
              修改
            </div>
          </div>
          <div
            class="address h-address"
            @click="handleShowAddress('add', null)"
          >
            <i class="iconfont icon-jia3"></i>
            添加新地址
          </div>
        </div>
      </div>
      <div class="order-title shop">
        <div class="tit-add ">商品及优惠券</div>
        <el-row class="shop-item" v-for="item in shop" :key="item.sid">
          <el-col class="shop-info" :span="12"
            ><div class="avatar-img">
              <img :src="item.bookimg" alt="" />
            </div>
            <div>
              {{ item.bookname }}{{ item.pubbook === "新书" ? "" : "(二手书)" }}
            </div></el-col
          >
          <el-col :span="12" class="shop-money">
            <div>
              {{ item.pubbook === "新书" ? item.price : item.price * 0.8 }}元 x
              {{ item.count }}
            </div>
            <div class="color">
              {{
                item.pubbook === "新书"
                  ? item.price * item.count
                  : item.price * 0.8 * item.count
              }}元
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="order-title type">
        <div class="tit-type">配送方式</div>
        <div class="color">包邮</div>
      </div>
      <div class="total">
        <div class="total-lay">
          <div>商品件数：</div>
          <div class="color">{{ sumNum }}件</div>
        </div>
        <div class="total-lay">
          <div>商品总价：</div>
          <div class="color">{{ sumMoney }}元</div>
        </div>
        <div class="total-lay">
          <div>活动优惠：</div>
          <div class="color">-0元</div>
        </div>
        <div class="total-lay">
          <div>优惠券抵扣：</div>
          <div class="color">-0元</div>
        </div>
        <div class="total-lay">
          <div>运费：</div>
          <div class="color">-0元</div>
        </div>
        <div class="total-lay total-money">
          <div>应付总额：</div>
          <div class="color">
            <span class="size">{{ sumMoney }}</span
            >元
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="order-add" v-if="activeAddress.name">
          <div>
            {{ activeAddress.name
            }}<span class="margin">{{ activeAddress.mobile }}</span>
          </div>
          <div>
            {{ activeAddress.controlment.replace(/,/g, " ") }}
            {{ activeAddress.location }}
            <span
              class="color"
              @click="handleShowAddress('edit', activeAddress)"
              >修改</span
            >
          </div>
        </div>
      </div>

      <div class="flex-m">
        <el-button plain @click="handleToBack">返回购物车</el-button>
        <el-button type="primary" @click="handleBuy">立即下单</el-button>
      </div>
    </div>

    <AddressDialog
      v-if="dialogVisible"
      @close="dialogVisible = false"
      @update="getAddressList"
      :dialogVisible="dialogVisible"
      :ruleForm="ruleForm"
      :address="address"
      :addressTitle="addressTitle"
    />
  </div>
</template>
<script>
import AddressDialog from "../../component/AddressDialog";
import api from "../../api/index";
export default {
  components: {
    AddressDialog
  },
  data() {
    return {
      addressList: [],
      shop: [],
      sumNum: 0,
      sumMoney: 0,
      dialogVisible: false,
      ruleForm: {
        name: "",
        phone: "",
        specificAddress: ""
      },
      address: {
        province: "",
        city: "",
        area: ""
      },
      addressTitle: "添加收货地址",
      isActive: 0,
      activeAddress: {}
    };
  },
  mounted() {
    this.shop = JSON.parse(this.$route.params.shop);
    this.shop.map(item => {
      this.sumNum += item.count;
      this.sumMoney +=
        item.pubbook === "新书"
          ? item.price * item.count
          : item.price * 0.8 * item.count;
    });
    this.getAddressList();
  },
  methods: {
    // 选择收货地址
    handleClick(val) {
      this.isActive = val.aid;
      this.activeAddress = val;
    },
    // 获取收货地址
    getAddressList() {
      api.address().then(res => {
        if (res.code === 200) {
          this.addressList = res.data;
          this.addressList.map(item => {
            if (item.aid === this.isActive) {
              this.activeAddress = item;
            }
          });
        }
      });
    },
    // 添加收货地址弹窗
    handleShowAddress(type, val) {
      if (type == "edit") {
        this.ruleForm.aid = val.aid;
        this.ruleForm.name = val.name;
        this.ruleForm.phone = val.mobile;
        this.ruleForm.specificAddress = val.location;
        this.address.province = val.controlment.split(",")[0];
        this.address.city = val.controlment.split(",")[1];
        this.address.area = val.controlment.split(",")[2];
        this.addressTitle = "修改收货地址";
      } else {
        this.addressTitle = "添加收货地址";
      }
      this.dialogVisible = true;
    },
    // 返回购物车
    handleToBack() {
      this.$router.go(-1);
    },
    // 立即下单
    handleBuy() {
      if (this.isActive === 0) {
        this.$message({
          message: "请选择收货地址",
          type: "warning"
        });
        return;
      }
      let content = [];
      let sid = [];
      this.shop.map(item => {
        let bookInfo = {
          bookname: item.bookname,
          price: item.pubbook === "新书" ? item.price : item.price * 0.8,
          count: item.count,
          booktype: item.pubbook,
          bookImg: item.bookimg,
          bid: item.bid
        };
        sid.push(item.sid);
        content.push(bookInfo);
      });

      let params = {
        content,
        tprice: this.sumMoney,
        pstate: 0,
        aid: this.isActive,
        sid
      };
      api.addOrder(params).then(res => {
        if (res.code === 200) {
          this.$router.push({
            path: "/buy/confirm",
            query: {
              id: res.data.oid
            }
          });
          this.$store.dispatch("getShopList");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  .okorder {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 2px;
    .shop {
      margin: 30px 0;
    }
    .type {
      display: flex;
      align-items: center;
      .tit-type {
        font-size: 20px;
      }
      .color {
        margin-left: 50px;
      }
    }
    .total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 14px;
      color: #757575;
      margin-top: 20px;
      padding-right: 30px;
      .total-lay {
        min-width: 160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      div {
        margin-top: 10px;
      }
      .size {
        font-size: 30px;
      }
      .total-money {
        font-size: 16px;
      }
    }
    .tit-add {
      margin-bottom: 20px;
      font-size: 18px;
    }
    .shop-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .shop-info {
        display: flex;
        align-items: center;
        width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .avatar-img {
          width: 40px;
          height: 60px;
          margin-right: 10px;
          img {
            width: 100%;
          }
        }
      }
      .shop-money {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .address-list {
      display: flex;
      flex-wrap: wrap;
    }
    .address {
      width: 270px;
      height: 180px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 10px;
      position: relative;
      margin-right: 10px;
      box-sizing: border-box;
      .edit {
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: none;
      }
      .iconfont {
        font-size: 25px;
        margin-bottom: 6px;
        color: #e0e0e0;
      }
    }
    .h-address {
      border: 1px solid #e0e0e0;
      color: #b0b0b0;
      &:hover {
        border-color: #b0b0b0;
        .edit {
          display: block;
        }
        .iconfont {
          color: #b0b0b0;
        }
      }
    }
    .a-address {
      border: 1px solid #409eff;
      .edit {
        display: block;
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 80px;
    background: #fff;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #757575;
    .color {
      cursor: pointer;
      margin-left: 5px;
    }
    .margin {
      margin-left: 20px;
    }
  }
}
</style>
