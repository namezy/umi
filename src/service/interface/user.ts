import ajax from '../http'

// 登录
export const actionLogin = async (data: any) => {
  return ajax.post('/login', data)
}
//获取手机验证码
export const getMobileCode = async (data: any) => {
  return ajax.get('/getCode', data)
}

//重置密码前验证手机号码
export const actionCheckMobileCode = async (data: any) => {
  return ajax.get('/checkSmCode', data)
}
//重置密码
export const actionResetPassword = async (data: any) => {
  return ajax.post('/resetPassword', data)
}
//检测用户是否登录
export const queryUserLogin = async () => {
  return ajax.get('/queryLoginStatus')
}
//获取用户路由表
export const getUserRouteList = async () => {
  return ajax.get('/getRouteList')
}
