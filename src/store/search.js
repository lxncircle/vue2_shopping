import { reqGetSearchInfo } from '@/api'
// search模块小仓库
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params形参：是当用户派发action的时候，第二个参数传递过来，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}
const state = {
  // 仓库初始状态
  searchList: {},
}
// 计算属性
// 项目中getters主要的作用是：简化仓库中的数据（简化数据而生）
// 可以把组件需要用到的数据简化【将来组件在更方便获取数据】
const getters = {
  // 当前形参state，当前仓库中的state，并非大仓库中的哪个state
  goodsList(state) {
    // 这样书写是有问题的
    // state.searchList.goodsList如果服务器数据回来了
    // 网络好返回一个数组，网络差返回undefined
    // 计算新的属性的属性值至少初始化（空数组）
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
}

// 对外暴露
export default {
  actions,
  mutations,
  state,
  getters,
}
