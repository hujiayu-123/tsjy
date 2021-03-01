<template>
  <div class="empty">
    <div class="empty-img">
      <img :src="require('@/assets/img/no-data.png')" alt="" />
    </div>
    <div class="tip">{{ msg }}</div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      default() {
        return "什么都没有哦，去看看其它吧！";
      }
    }
  }
};
</script>
<style scoped lang="less">
.empty {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  .empty-img {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .tip {
    color: #c7c7c7;
    margin-top: 10px;
  }
}
</style>
