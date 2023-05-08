export default {
  namespaced: true,
  state: {
    userinfo: {}
  },
  getters: {
    userinfo: state => state.userinfo
  },
  mutations: {
    setUserinfo: (state, payload) => {
      state.userinfo = payload
    },
  },
  // 可进行异步操作
  actions: {
  }
}
