<template>
  <div class="booklist">
    <div class="booklist-lay">
      <div class="item" v-for="item in bookList" :key="item.bid">
        <div class="avatar-img">
          <img :src="item.bookimg" alt="" />
        </div>
        <div class="name">{{ item.bookname }}</div>
        <div class="tag">{{ item.tag }}</div>
        <div class="price">￥{{ item.price }}</div>
      </div>
      <Empty v-if="bookList.length === 0" />
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import mixin from "../../mixin/downLoading";
import Empty from "../../component/Empty";
export default {
  mixins: [mixin],
  components: {
    Empty
  },
  data() {
    return {
      filter: {
        id: "",
        bookname: "",
        page: 1,
        hasMore: false
      },
      bookList: []
    };
  },
  watch: {
    $route: {
      handler() {
        this.filter.id = this.$route.query.id;
        this.filter.bookname = this.$route.query.name;
        this.filter.page = 1;
        this.getList();
      },
      deep: true
    }
  },
  mounted() {
    this.filter.id = this.$route.query.id;
    this.filter.bookname = this.$route.query.name;
    this.getList();
  },
  methods: {
    // 获取图书数据
    getList() {
      let params = {
        cid: this.filter.id,
        bookname: this.filter.bookname,
        page: this.filter.page
      };
      this.loading = true;
      api.list(params).then(res => {
        if (res.code === 200) {
          if (this.filter.page == 1) {
            this.bookList = res.data;
          } else {
            this.bookList.push(...res.data);
          }

          if (res.data.length < 20) {
            this.filter.hasMore = false;
          } else {
            this.filter.hasMore = true;
          }
        }
      });
    },
    getLoad() {
      let filter = this.filter;
      if (filter.hasMore) {
        this.filter.page++;
        this.getList();
      }
    }
  }
};
</script>
<style scoped lang="less">
.booklist {
  background: #f5f5f5;
  min-height: calc(100vh - 140px);
  overflow: auto;
  .booklist-lay {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: calc(25% - 10px);
      margin-right: 10px;
      margin-bottom: 10px;
      background: #fff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      transition: all 0.2s linear;
      padding: 20px 0;
      cursor: pointer;
      .avatar-img {
        width: 120px;
        height: 140px;
        margin-bottom: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 90%;
        text-align: center;
      }
      .tag {
        color: #c7c7c7;
        font-size: 14px;
        margin: 10px auto;
      }
      .price {
        color: #409eff;
      }
      &:hover {
        box-shadow: 0px 3px 20px #c7c7c7;
        margin-top: -2px;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
