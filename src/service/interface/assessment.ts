import ajax from '../http'

//
export const getAssessmentList = async param => ajax.post('/getAssessmentList', param)
