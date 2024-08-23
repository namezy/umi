import ajax from '../http'

export const actionLogin = async (data: any) => {
  return ajax.post('/login', data)
}
