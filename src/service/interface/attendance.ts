import ajax from '../http'

//
export const getAttendanceList = async () => ajax.get('/getAttendanceTable')
