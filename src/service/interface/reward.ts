import ajax from '../http'

//奖惩记录
export const getRewardAndPunishment = async param => ajax.get('/rewardAndPunishment', param)
