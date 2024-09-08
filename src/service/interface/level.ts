import ajax from '../http'

//获取职级信息
//queryData { levelName} page size
export const getLevelList = async param => ajax.post('/getLevel', param)
