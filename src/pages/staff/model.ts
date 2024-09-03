import { getStaffList } from '@/service'
export default {
  namespace: 'staff',
  state: {
    staffList: [],
    staffTotal: 0,
    staffDetail: null
  },
  reducers: {
    saveStaffList(state, { payload }) {
      return { ...state, ...payload }
    },
    saveStaffTotal(state, { payload }) {
      return { ...state, ...payload }
    },
    saveStaffDetail(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *requestStaffList({ payload }, { put, call }) {
      const { data } = yield call(getStaffList, payload)
      yield put({ type: 'saveStaffList', payload: { staffList: data.staffList } })
      yield put({ type: 'saveStaffTotal', payload: { staffTotal: data.staffTotal } })
    }
  }
}
