import ajax from '../http'

//获取部门信息
export const getDepartmentList = async param => ajax.get('/department', param)
