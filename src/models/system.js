export default {
  namespace: 'system',

  state: {
    isLogin: false,
    loadMenu: false
  },

  reducers: {
    setIsLogin (state, action) {
      state.isLogin = action.payload
    },

    setLoadMenu (state, action) {
      state.loadMenu = action.payload
    },
  }
}