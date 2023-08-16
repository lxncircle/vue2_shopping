// 引入路由组件
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由组件引入
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/* 把不同路由对应组件分隔，当路由被访问时才加载对应组件，类似按需引入 */

// 路由配置信息
export default [
  // 路由路径小写
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        // 其他组件来，停留在当前
        next(false)
      }
    },
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        // 其他组件来，停留在当前
        next(false)
      }
    },
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true },
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true },
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: 'search',
    // 路由组件能不能传props数据？
    // 布尔值写法
    // props: true,
    // 对象写法：额外的给路由组件传递一些props
    // props: { a: 1, b: 2 },
    // 函数写法：可以params参数、query参数、通过props传递给路由组件
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k,
      }
    },
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false },
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: '*',
    redirect: '/home',
  },
]
