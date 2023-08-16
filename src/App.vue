<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer>
  </div>
</template>

<script>
// 引入非路由组件
// 引入Header
import Header from "./components/Header";
// 引入Footer
import Footer from "./components/Footer";
//注册
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发action
    // 通知Vuex发送请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped>
</style>