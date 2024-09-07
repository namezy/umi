import ajax from '../http'

//获取职级信息
//queryData departmentName
export const getLevelList = async param => ajax.post('/getLevel', param)
