import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

// home模块小仓库
// action用户处理派发action地方的，可以书写异步语句，自己逻辑的地方
const actions = {
  // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  },
}
// mutations是唯一修改state的地方
const mutations = {
  // 第一个参数：修改state，进入state，第二个参数：传入进来的参数的形参
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16)
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
// 存储数据
const state = {
  // state中数据默认初始值别乱写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
  categoryList: [],
  bannerList: [],
  // floor的数据
  floorList: [],
}
// 计算属性
const getters = {}

// 对外暴露
export default {
  actions,
  mutations,
  state,
  getters,
}
