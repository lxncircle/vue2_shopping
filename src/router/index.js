//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'
import user from '@/store/user'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push | replace
// 第一个参数：告诉原来push方法，往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call || apply区别
    //相同点：都可以调用函数一次，可以改变函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savePosition) {
    //返回的这个y = 0，代表的滚动条在最上方
    return { y: 0 }
  },
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取要跳转到哪个路由信息
  // from:可以获取从哪个路由而来的信息
  // next:放行函数  next()放行    next(path)--next('/login')放行到指定路由              next(false)
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // console.log(userInfo)
  if (token) {
    // 用户已登录
    if (to.path == '/login' || to.path == '/register') {
      // 用户已经登录，则不能跳转到login页面,停留在首页
      next('/home')
    } else {
      // 登陆，但是去的不是login
      // 用户名已存在
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息在首页展示
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // token失效了 获取不到用户信息，需要从新登录
          // 清除token
          console.log(error.message)
          await store.dispatch('userLogout')
          next('login')
        }
      }
    }
  } else {
    // 未登录：不能去交易、支付、个人中心等相关的页面
    // 未登录去上面这些路由则跳去登录页面
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去而没去成的信息，存储于地址栏中【路由】
      next('login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
