import ajax from '../http'

//获取员工列表
export const getStaffList = async (param: Record<string, any>) => ajax.post('/getStaff', param)
//获取员工详情
export const getStaffDetail = async (id: string) => ajax.get(`/staffDetail/${id}`)
//新增员工
export const actionCreateStaff = async (param: Record<string, any>) => ajax.post('/createStaff', param)
//修改
export const actionUpdateStaff = async (param: Record<string, any>) => ajax.put('/updateStaff', param)
//删除
export const actionDelateStaffs = async (ids: string[]) => ajax.post('/destroyStaff', ids)
