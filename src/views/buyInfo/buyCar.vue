<template>
  <div class="buycar">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"> </el-table-column>
      <el-table-column label="商品名称" width="300">
        <template slot-scope="scope">
          <div class="shop-info">
            <div class="avatar-img">
              <img :src="scope.row.bookimg" alt="" />
            </div>
            <div class="name">
              {{ scope.row.bookname
              }}{{ scope.row.pubbook === "新书" ? "" : "(二手书)" }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          {{
            scope.row.pubbook === "新书"
              ? scope.row.price
              : scope.row.price * 0.8
          }}元
        </template>
      </el-table-column>
      <el-table-column prop="address" label="数量" align="center">
        <template slot-scope="scope"
          ><el-input-number
            v-model="scope.row.count"
            @change="handleInputNum(scope.row)"
            :min="1"
            :max="10"
          ></el-input-number
        ></template>
      </el-table-column>
      <el-table-column prop="address" label="小计" align="center">
        <template slot-scope="scope">
          <span class="color"
            >{{
              scope.row.pubbook === "新书"
                ? scope.row.price * scope.row.count
                : scope.row.price * 0.8 * scope.row.count
            }}元</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="del" @click="handleDel(scope.row)">
            <i class="iconfont icon-delete"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="settlement">
      <div>
        <span class="con" @click="handleToHome">继续购物</span>共<span
          class="color"
          >{{ sumNum }}</span
        >件商品，已选择<span class="color">{{ selectNum }}</span
        >件
      </div>
      <div class="right">
        <div class="money color">
          合计：<span class="color size">{{ sumMoney }}</span
          >元
        </div>
        <div
          :class="isMoney ? 'btn a-btn' : 'btn hui-btn'"
          @click="isMoney ? handleToSet() : ''"
        >
          去结算
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
      tableData: [],
      multipleSelection: [],
      sumNum: 0,
      selectNum: 0,
      sumMoney: 0,
      isMoney: false
    };
  },
  watch: {
    sumMoney(val) {
      if (val === 0) {
        this.isMoney = false;
      } else {
        this.isMoney = true;
      }
    },
    "$store.state.shopList": function(val) {
      this.tableData = val;
      this.handleComputer();
    }
  },
  mounted() {
    this.$store.dispatch("getShopList");
  },
  methods: {
    // 表格多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.handleMoney();
      this.handleComputer();
    },
    // 删除商品
    handleDel(val) {
      this.$confirm("确定删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("handleShopDel", val);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 数字框值
    handleInputNum(val) {
      this.handleComputer();
      this.handleMoney();
      let params = {
        bid: val.bid,
        count: val.count,
        pubbook: val.pubbook
      };
      api.shop(params).then(res => {
        if (res.code === 200) {
          this.$store.dispatch("getShopList");
        }
      });
    },
    // 计算当前 商品数量
    handleComputer() {
      this.sumNum = 0;
      this.selectNum = 0;
      this.tableData.map(item => {
        this.sumNum += item.count;
      });
      this.multipleSelection.map(item => {
        this.selectNum += item.count;
      });
    },
    // 计算当前总计金额
    handleMoney() {
      this.sumMoney = 0;
      this.multipleSelection.map(item => {
        this.sumMoney +=
          item.pubbook === "新书"
            ? item.price * item.count
            : item.price * 0.8 * item.count;
      });
    },
    // 跳转首页
    handleToHome() {
      this.$router.push({ path: "/home" });
    },
    // 去结算
    handleToSet() {
      this.$router.push({
        path: "okOrder",
        name: "okOrder",
        params: {
          shop: JSON.stringify(this.multipleSelection)
        }
      });
    }
  }
};
</script>
<style lang="less">
.buycar {
  width: 1200px;
  margin: 0 auto;
  .shop-info {
    display: flex;
    align-items: center;
    .avatar-img {
      width: 60px;
      height: 80px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }
    .name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .del {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    color: #757575;
    display: inline-block;
    cursor: pointer;
    &:hover {
      background: #409eff;
      color: #fff;
    }
  }
  .settlement {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #757575;
    font-size: 14px;
    .con {
      margin-left: 30px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .right {
      display: flex;
      height: 100%;
      align-items: center;
      .size {
        font-size: 30px;
      }
      .btn {
        width: 200px;
        font-size: 18px;
        height: 100%;
        line-height: 50px;
        text-align: center;
        margin-left: 40px;
      }
      .a-btn {
        background: #409eff;
        color: #fff;
        cursor: pointer;
        &:hover {
          background: #66b1ff;
          background-color: #66b1ff;
        }
      }
      .hui-btn {
        background: #e0e0e0;
        color: #b0b0b0;
      }
    }
  }
  .el-table tbody tr:hover > td {
    background-color: #ffffff !important;
  }
}
</style>
