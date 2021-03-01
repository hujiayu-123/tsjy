<template>
  <div class="address">
    <div class="title">
      收货地址
    </div>
    <div class="section">
      <div class="address" @click="handleShowAddress('add', null)">
        <i class="iconfont icon-jia3"></i>
        添加新地址
      </div>
      <div
        class="address
            "
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div>{{ item.name }}</div>
        <div>{{ item.mobile }}</div>
        <div>{{ item.controlment.replace(/,/g, " ") }}</div>
        <div>{{ item.location }}</div>
        <div class="edit color">
          <span @click="handleShowAddress('edit', item)">修改</span
          ><span class="del" @click="handleDel(item)">删除</span>
        </div>
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
import api from "@/api/index.js";
import AddressDialog from "../../component/AddressDialog";
export default {
  components: {
    AddressDialog
  },
  data() {
    return {
      addressList: [],
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
      addressTitle: "添加收货地址"
    };
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    // 获取收货地址
    getAddressList() {
      api.address().then(res => {
        if (res.code === 200) {
          this.addressList = res.data;
        }
      });
    },
    // 地址弹窗
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
        this.ruleForm = {
          name: "",
          phone: "",
          specificAddress: "",
          aid: ""
        };
        this.address = {
          province: "",
          city: "",
          area: ""
        };
      }
      this.dialogVisible = true;
    },
    // 删除地址
    handleDel(val) {
      this.$confirm("确认删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.delAddress({ aid: val.aid }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getAddressList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
.address {
  color: #757575;
  padding: 20px;
  .title {
    font-size: 30px;
  }
  .section {
    margin-top: 20px;
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
    border: 1px solid #e0e0e0;
    color: #b0b0b0;
    box-sizing: border-box;
    &:hover {
      border-color: #b0b0b0;
      .edit {
        display: block;
      }
      .iconfont {
        color: #b0b0b0;
      }
    }
    .edit {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: none;
      .del {
        margin-left: 10px;
      }
    }
    .iconfont {
      font-size: 25px;
      margin-bottom: 6px;
      color: #e0e0e0;
    }
  }
}
</style>
