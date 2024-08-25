import { getAnalyzeStaff } from '@/service'
export default {
  namespace: 'dashboard',
  state: {
    totalAmount: {
      title: '总人数',
      amount: 11,
    },
    amountDataList: [
      {
        title: '入职1年内员工',
        amount: 12,
        styleData: { width: '33%', height: '170px' },
      },
      {
        title: '入职1-2年内员工',
        amount: 1,
        styleData: { width: '33%', height: '170px' },
      },
      {
        title: '入职3年以上员工',
        amount: 3,
        styleData: { width: '33%', height: '170px' },
      },
    ],
  },
  reducers: {},
  effects: {
    *fetchAnalyzeStaff({}, { call, put }) {
      const { data } = yield call(getAnalyzeStaff)
      console.log(data)
    },
  },
}
