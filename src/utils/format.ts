import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-ch')
export const formatDate = (date, type = 'YYYY-MM-DD') => {
  return dayjs(date).format(type)
}

//根据身份证号格式化出生日期
export const formatBirth = (idNumber: string) => {
  if (!idNumber) return ''
  let birth = ''
  if (idNumber.length === 15) {
    birth = '19' + idNumber.slice(6, 12)
  } else {
    birth = idNumber.slice(6, 14)
  }
  return birth.replace(/(.{4})(.{2})/, '$1-$2-')
}

export const formatAge = (idNumber: string) => {
  const birth = formatBirth(idNumber)
  const currentYear = dayjs().year()
  const birthYear = Number(birth.slice(0, 4))
  return currentYear - birthYear
}
