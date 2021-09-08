export default {
  namespace: 'route',

  state: {
    routes: [],
  },

  reducers: {
    saveRoutes (state, action) {
      state.routes = action.payload
    }
  }
}
