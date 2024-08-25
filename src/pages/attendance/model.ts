import { getAttendanceList } from '@/service'
export default {
  namespace: 'attendance',
  state: {
    tableList: [],
    chartList: []
  },
  reducers: {
    formatData(state, { payload }) {
      const formatData = {
        tableList: [
          { title: '迟到详情', renderList: payload.lateTable },
          { title: '早退详情', renderList: payload.earlyTable }
        ],
        chartList: [
          { title: '迟到员工数量', renderList: payload.lateBI },
          { title: '早退员工数量', renderList: payload.earlyBI }
        ]
      }
      return { ...state, ...formatData }
    }
  },
  effects: {
    *fetchAttendanceList({}, { put, call }) {
      const { data } = yield call(getAttendanceList)
      if (data) {
        yield put({ type: 'formatData', payload: data })
      }
    }
  }
}
