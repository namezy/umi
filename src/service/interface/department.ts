import ajax from '../http'

//获取部门信息
/**
 *
 * @param param page size departmentName
 * @returns
 */
export const getDepartmentList = async param => {
  const queryData = param.queryData || {}
  delete param.queryData
  param = { ...param, ...queryData }
  return ajax.get('/department', param)
}

//获取部门详情
export const getDepartmentDetail = async id => ajax.get(`/department/${id}`)
