<template>
  <div class="home">主页</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store.state.token);
  },
};
</script>
<style scoped lang="less"></style>
