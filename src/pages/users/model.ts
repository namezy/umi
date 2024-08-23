import { actionLogin } from '@/service'
export default {
  namespace: 'user',
  state: {
    userInfo: null,
  },
  reducer: {},
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(actionLogin, payload)
      console.log(data)
    },
  },
}
