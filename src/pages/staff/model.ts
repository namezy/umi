import { getStaffList, getStaffDetail } from '@/service'
export default {
  namespace: 'staff',
  state: {
    staffList: [],
    staffTotal: 0,
    staffDetail: null,
    staffParam: {
      page: 1,
      queryData: {
        department: undefined,
        level: undefined,
        marriage: undefined,
        education: undefined,
        userName: undefined
      },
      size: 10
    }
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
    updateStaffDetail(state, { payload }) {
      return { ...state, staffDetail: { ...state.staffDetail, ...payload } }
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
    },
    updateStaffParam(state, { payload }) {
      return { ...state, staffParam: { ...state.staffParam, ...payload } }
    }
  },
  effects: {
    *requestStaffList({ payload = {} }, { put, call, select }) {
      const staffParam = yield select(state => state.staff.staffParam)
      payload = { ...staffParam, ...payload }
      Object.keys(payload.queryData).forEach(key => {
        if (!payload.queryData[key]) {
          delete payload.queryData[key]
        }
      })

      const { data } = yield call(getStaffList, payload)
      yield put({ type: 'saveStaffList', payload: { staffList: data.staffList } })
      yield put({ type: 'saveStaffTotal', payload: { staffTotal: data.staffTotal } })
    },
    *requestStaffDetail({ payload }, { put, call }) {
      const { data } = yield call(getStaffDetail, payload.id)
      yield put({ type: 'saveStaffDetail', payload: { staffDetail: data } })
      yield put({ type: 'common/changeDrawerVisible', payload: { drawerVisible: true } })
    }
  }
}
