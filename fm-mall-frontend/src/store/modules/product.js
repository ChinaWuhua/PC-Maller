export default {
  namespaced: true,
  state: {
    searchtext: '',
    renew: false,
  },
  getters: {
    searchtext: state => state.searchtext,
    renew: state => state.renew
  },
  mutations: {
    setSearchText: (state, payload) => {
      state.searchtext = payload
    },
    setRenew: (state) => {
      state.renew = !state.renew
    },
  },
  // 可进行异步操作
  actions: {
  }
}
