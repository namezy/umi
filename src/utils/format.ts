import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-ch')
export const formatDate = (date, type = 'YYYY-MM-DD') => {
  return dayjs(date).format(type)
}
