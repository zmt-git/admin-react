import { getNumTypesR } from '@/api/device'

export default {
  namespace: 'types',

  state: {
    numType: []
  },

  reducers: {
    reducersNumType (state, actions) {
      state.numType = actions.payload
    }
  },

  effects: {
    *getNums (action, { call, put}) {
      const { result } = yield call(getNumTypesR)

      yield put({ type: 'reducersNumType', payload: result })
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/device/index') {
          dispatch({ type: 'getNums' })
        }
      })
    }
  }
}
