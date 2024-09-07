import ajax from '../http'

//调薪记录
export const getSalaryAdjustment = async () => ajax.get('/salaryAdjustment')
