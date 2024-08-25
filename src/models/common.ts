import { queryUserLogin, getUserRouteList } from '@/service'
import { message } from 'antd'
export default {
  namespace: 'common',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      //app.start阶段执行
      //查询用户是否登录
      dispatch({ type: 'queryUserLogin', payload: { history } })
    },
  },
  effects: {
    *queryUserLogin({ payload }, { call }) {
      const {
        history,
        history: {
          location: { pathname },
        },
      } = payload
      if (pathname !== '/users/login' && pathname !== 'users/forgetPassword') {
        //需要验证用户登录状态
        if (sessionStorage.getItem('userInfo') && sessionStorage.getItem('token') && sessionStorage.getItem('routeList')) {
          const data = yield call(queryUserLogin)
          if (data.code !== 0) {
            message.error(data.msg)
            sessionStorage.clear()
            return history.replace('/users/login')
          } else {
            //获取用户路由表
            const { data: routeList } = yield call(getUserRouteList)
            if (routeList) {
              sessionStorage.setItem('routeList', JSON.stringify(routeList))
            }
          }
        } else {
          sessionStorage.clear()
          history.replace('/users/login')
        }
      } else {
        sessionStorage.clear()
      }
    },
  },
}
