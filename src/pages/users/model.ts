import { actionLogin, getUserRouteList } from '@/service'
import { message } from 'antd'
import { history } from 'umi'
export default {
  namespace: 'user',
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
    address: {
      a: 1,
      b: 2,
    },
  },
  reducers: {
    updateUserInfo(state, { payload }) {
      return { ...state, userInfo: payload }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data, msg } = yield call(actionLogin, payload)
      if (!data) {
        message.error(msg)
        return
      }
      const routeData = yield call(getUserRouteList)
      if (routeData.data) {
        sessionStorage.setItem('routeList', JSON.stringify(routeData.data))
        sessionStorage.setItem('userInfo', JSON.stringify(data))
        yield put({
          type: 'updateUserInfo',
          payload: data,
        })
        history.push(routeData.data[0]?.route)
      } else {
        message.error(routeData.msg)
      }
    },
  },
}
