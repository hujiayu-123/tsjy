<template>
  <div class="addressdialog">
    <el-dialog
      :title="addressTitle"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="flex-m">
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="ruleForm.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone" style="margin-left: 5px;">
              <el-input
                type="text"
                v-model.number="ruleForm.phone"
                placeholder="手机号"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <v-distpicker
              :province="address.province"
              :city="address.city"
              :area="address.area"
              @province="handleProvince"
              @city="handleCity"
              @area="handleArea"
            ></v-distpicker>
          </el-form-item>
          <el-form-item prop="specificAddress">
            <el-input
              type="textarea"
              v-model="ruleForm.specificAddress"
              placeholder="详细地址"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import api from "../api/index";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    ruleForm: {
      type: Object,
      default() {
        return {};
      }
    },
    address: {
      type: Object,
      default() {
        return {};
      }
    },
    addressTitle: {
      type: String,
      default() {
        return "添加收货地址";
      }
    }
  },
  components: {
    VDistpicker
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号" },
          { type: "number", message: "请输入正确的手机号" }
        ],
        specificAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.ruleForm.phone = this.ruleForm.phone
      ? Number(this.ruleForm.phone)
      : this.ruleForm.phone;
  },
  methods: {
    // 提交
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (
            this.address.province == "" ||
            this.address.city == "" ||
            this.address.area == ""
          ) {
            this.$message({
              message: "请选择收货地址",
              type: "warning"
            });
            return;
          }
          let params = {
            name: this.ruleForm.name,
            mobile: this.ruleForm.phone,
            controlment:
              this.address.province +
              "," +
              this.address.city +
              "," +
              this.address.area,
            location: this.ruleForm.specificAddress,
            aid: this.ruleForm.aid ? this.ruleForm.aid : ""
          };
          let url = "";
          if (this.addressTitle === "添加收货地址") {
            url = "addAddress";
          } else {
            url = "editAddress";
          }
          api[url](params).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.$emit("update", true);
              this.handleClose();
            }
          });
        }
      });
    },
    handleProvince(val) {
      this.address.province = val.value;
    },
    handleCity(val) {
      this.address.city = val.value;
    },
    handleArea(val) {
      this.address.area = val.value;
    },
    // 关闭弹窗
    handleClose() {
      this.$emit("close", false);
    }
  }
};
</script>
<style scoped lang="less"></style>
