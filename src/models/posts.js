import { getList } from '@/api/user'
export default {
  namespace: 'posts',

  state: {
    list: []
  },

  reducers: {
    savePost (state, action) {
      state.list = action.payload
    },

    addPost (state, action) {
      state.list.push(action.payload)
    },
  },

  effects: {
    *getList(action, { put, call}) {

      const { result } = yield call(getList)

      yield put({ type: 'savePost', payload: result })
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/index') {
          dispatch({ type: 'getList' });
        }
      });
    }
  }
}
