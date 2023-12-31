import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
import { Button, MessageBox } from 'element-ui'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// ElementUI注册组件时，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入MockServe.js  ----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// import { reqGetSearchInfo } from '@/api'
// console.log(reqGetSearchInfo({}))
Vue.config.productionTip = false //  默认true

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import lazeload from '@/assets/lazyload.jpg'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图
  loading: lazeload,
})
// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins)

new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：地下的写法kv一致省略v【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都有$route, $router属性
  router,
  // 注册仓库：组件实例的身上会多出一个属性$store属性
  store,
}).$mount('#app')
