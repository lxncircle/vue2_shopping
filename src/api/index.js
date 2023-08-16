// 当前这个模块：api进行统一管理
import requests from './ajax'
import mockRequests from './mockAjax'

// 三级联动接口
//    /api/product/getBaseCategoryList    get请求，无参数

// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)
// requests({
//   url: '/product/getBaseCategoryList',
//   method: 'GET',
// })

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get(`/banner`)

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜素模块数据 地址：/api/list   请求方式：POST   参数：需要带参数
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */

// 当前这个函数需不需要接收外部传递参数
// 当前该接口(获取搜索模块的数据)，给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) =>
  requests({
    url: '/list',
    method: 'POST',
    data: params,
  })

// 获取产品详情信息的接口  URL:/api/item/{ skuId }  请求方式:get
export const reqGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'get',
  })

//将产品添加到购物车中(获取更新某个产品的个数)
//     URL:/api/cart/addToCart/{ skuId }/{ skuNum }   post
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })

// 获取购物车列表数据接口
// URL:/api/cart/cartList  method:get
export const reqCartList = () =>
  requests({
    url: `/cart/cartList`,
    method: 'get',
  })

// 删除购物产品的接口
// URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })
// 修改商品选中状态
// url:/api/cart/checkCart/{skuId}/{isChecked}    method: get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
  })

// 获取验证码
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
  })

// 注册
// url: /api/user/passport/register method:post  phone code password
export const reqUserRegister = (data) =>
  requests({
    url: '/user/passport/register',
    method: 'post',
    data,
  })

// 登录
export const reqUserLogin = (data) =>
  requests({
    url: '/user/passport/login',
    method: 'post',
    data,
  })
// 获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })

export const reqLogout = () =>
  requests({
    url: '/user/passport/logout',
    method: 'get',
  })

// 获取用户地址信息
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  })

// 获取商品清单
export const reqOrderInfo = () =>
  requests({
    url: '/order/auth/trade',
    method: 'get',
  })

// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
  })

// 获取支付信息
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
  })

// 获取支付订单状态
// url:/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  })

// 获取个人中心的数据
// /order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
  })
