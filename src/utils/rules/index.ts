export const loginRules = {
  accountName: [
    {
      required: true,
      message: '请输入用户名',
    },
    {
      min: 4,
      max: 20,
      message: '用户名长度为4-20个字符',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 4,
      max: 20,
      message: '密码长度为4-20个字符',
    },
  ],
  mobile: [
    {
      validator(_, value: string) {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        if (!value) {
          return Promise.reject('请输入手机号码')
        }
        if (!reg.test(value)) {
          return Promise.reject('请输入正确的手机号码')
        }
        return Promise.resolve()
      },
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
    },
    {
      min: 6,
      max: 6,
      message: '验证码长度为6个字符',
    },
  ],
}
