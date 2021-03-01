<template>
  <div class="booklist">
    <div :class="isFixed ? 'list-title-fixed' : 'list-title'" v-if="isCatalog">
      {{ bookList[0].catalog }}
    </div>
    <div class="booklist-lay">
      <div
        class="item"
        v-for="item in bookList"
        :key="item.bid"
        @click="handleToDetail(item)"
      >
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
      bookList: [],
      isFixed: false,
      isCatalog: false
    };
  },
  watch: {
    $route: {
      handler() {
        this.handleData();
        this.getList();
      },
      deep: true
    }
  },
  mounted() {
    this.handleData();
    this.getList();
  },
  methods: {
    handleData() {
      this.filter.id = this.$route.query.id;
      this.filter.bookname = this.$route.query.name;
      this.filter.page = 1;
      if (this.filter.id) {
        this.isCatalog = true;
      } else {
        this.isCatalog = false;
      }
    },
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
    // 跳转详情
    handleToDetail(val) {
      let routeUrl = this.$router.resolve({
        path: `/detail`,
        query: {
          id: val.bid
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    // 滚动条 分类标签样式切换
    getScrollTop(val) {
      if (this.isCatalog) {
        if (val >= 140) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      }
    },
    // 下拉加载
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
  .list-title {
    width: 1200px;
    margin: 10px auto;
  }
  .list-title-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    line-height: 60px;
    background: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
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
