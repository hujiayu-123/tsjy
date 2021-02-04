<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { getList } from "../api/login";
export default {
  name: "Home",
  components: {},
  mounted() {
    getList({ page: 1, limit: 10 }).then(res => {
      console.log(res);
    });
  }
};
</script>
