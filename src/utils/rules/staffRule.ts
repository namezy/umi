export const staffRule = {
  userName: [
    { required: true, message: '姓名不能为空' },
    { max: 5, message: '姓名长度不正确' },
    { min: 2, message: '姓名长度不正确' }
  ],
  mobile: [
    {
      validator: (rule, val) => {
        const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        switch (true) {
          case !Boolean(val):
            return Promise.reject('手机号码不能为空')
          case !mobileReg.test(val):
            return Promise.reject('手机号码格式不正确')
          default:
            return Promise.resolve()
        }
      }
    }
  ],
  salary: [
    { required: true, message: '薪资不能为空' },
    { max: 16, message: '薪资长度不正确' },
    { min: 4, message: '薪资长度不正确' }
  ],
  hometown: [
    { required: true, message: '籍贯不能为空' },
    { max: 16, message: '籍贯长度不正确' },
    { min: 4, message: '籍贯长度不正确' }
  ],
  onboardingTime: [{ type: 'object', required: true, message: '入职时间不能为空' }],
  gender: [{ required: true, message: '性别不能为空' }],
  idNumber: [
    {
      validator(_, value) {
        switch (true) {
          case !Boolean(value):
            Promise.reject('身份证号码不能为空')
            break
          case value.length != 15:
          case value.length != 18:
            Promise.reject('身份证长度不正确')
            break
          default:
            Promise.resolve()
            break
        }
      }
    }
  ],
  bankNumber: [
    { required: true, message: '银行卡不能为空' },
    { max: 18, message: '银行卡长度不正确' },
    { min: 15, message: '银行卡长度不正确' }
  ],
  department: [{ required: true, message: '部门不能为空' }],
  level: [{ required: true, message: '职级不能为空' }],
  education: [{ required: true, message: '学历不能为空' }],
  marriage: [{ required: true, message: '婚姻不能为空' }],
  graduatedSchool: [{ required: true, message: '毕业院校不能为空' }],
  avatar: [{ required: true, message: '员工照片能为空' }]
}
