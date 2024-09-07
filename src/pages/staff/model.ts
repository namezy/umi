import { getStaffList, getStaffDetail } from '@/service'
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
    },
    updateStaffList(state, { payload }) {
      return {
        ...state,
        staffList: state.staffList.map(item => {
          if (item._id === payload.id) {
            return { ...item, [payload.type]: payload.value }
          }
          return item
        })
      }
    }
  },
  effects: {
    *requestStaffList({ payload }, { put, call }) {
      const { data } = yield call(getStaffList, payload)
      yield put({ type: 'saveStaffList', payload: { staffList: data.staffList } })
      yield put({ type: 'saveStaffTotal', payload: { staffTotal: data.staffTotal } })
    },
    *requestStaffDetail({ payload }, { put, call }) {
      const { data } = yield call(getStaffDetail, payload.id)
      yield put({ type: 'saveStaffDetail', payload: { staffDetail: data } })
    }
  }
}
