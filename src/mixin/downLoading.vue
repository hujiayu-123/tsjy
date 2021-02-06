<script>
export default {
  data() {
    return {};
  },
  methods: {
    scrollEvent() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      console.log(Math.ceil(scrollTop), scrollHeight - windowHeight);
      if (Math.ceil(scrollTop) >= scrollHeight - windowHeight) {
        this.getLoad();
      }
    }
  },

  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  }
};
</script>
