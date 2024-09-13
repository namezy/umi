import { getDepartmentList } from '@/service'
export default {
  namespace: 'department',
  state: {
    departmentList: [],
    departmentDetail: null
  },
  reducers: {
    saveDepartmentList(state, { payload }) {
      return { ...state, ...payload }
    },
    saveDepartmentDetail(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *fetchDepartmentList({ payload }, { put, call }) {
      const { data } = yield call(getDepartmentList, payload)
      yield put({ type: 'saveDepartmentList', payload: { departmentList: data.list } })
    }
  }
}
