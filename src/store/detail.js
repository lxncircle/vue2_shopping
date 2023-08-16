import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//游客临时身份模块uuid--> 生成一个随机字符串(不能再变了)
import { getUUID } from '@/utils/uuid_token'
const actions = {
  // 获取产品信息的actions
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  /* async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次请求成功
    // 因为服务器没有返回其余数据，因此不需要三连环
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }, */
  // 添加入购物车的
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 发请求: 前端带一些参数给服务器[需要存储这些数据]，存储成功了，没有给返回数据
    // 不选三连环(仓库存储数据了)
    // async函数返回promise，要么成功，要么失败
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      // 成功
      return 'ok'
    } else {
      //失败
      return Promise.reject(new Error('faile'))
    }
  },
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const state = {
  goodInfo: {},
  uuid_token: getUUID(),
}
// 简化数据而生
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    // 若state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    // 当前计算出的categoryView属性值至少是一个空对象，假的报错就不会有了
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
