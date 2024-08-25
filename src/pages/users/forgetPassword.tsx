import React, { useState } from 'react'
import ResetPassword from './component/ResetPassword'
import MobileCodeLogin from './component/MobileCodeLogin'
import { Button, Form, message, Row } from 'antd'
import './login.less'
import { useNavigate } from 'umi'
import { actionCheckMobileCode, actionResetPassword } from '@/service'

const ForgetPassword = () => {
  const [form] = Form.useForm()
  const [step, setStep] = React.useState(2) //1:验证手机号码 2:重置密码
  const navigate = useNavigate()
  const ComputedComponent = step === 1 ? MobileCodeLogin : ResetPassword
  const [loading, setLoading] = useState(false)
  const submitHandle = data => {
    if (loading) return
    if (step === 1) {
      checkMobileCode(data.code)
    } else {
      resetPassword(data.confirmPassword)
    }
  }
  //验证手机号码
  const checkMobileCode = async code => {
    try {
      const { data, msg } = await actionCheckMobileCode({ smCode: code })
      if (!data && msg) {
        return message.error(msg)
      }
      setStep(2)
    } catch (e) {
      console.error(e)
    }
  }
  //重置密码
  const resetPassword = async newPassword => {
    setLoading(true)
    try {
      const { data, msg } = await actionResetPassword({ newPassword })
      if (data) {
        navigate('/users/login', { replace: true })
      } else {
        message.error(msg)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }
  return (
    <div className="login-comp forgetPassword-comp">
      <div className="forgetPassword-comp_header">{step === 1 ? '忘记密码' : '重置密码'}</div>
      <Form className="login-comp_body" form={form} onFinish={submitHandle}>
        <ComputedComponent form={form} />
        <Row>
          <Button className="submit" block type="primary" htmlType="submit" loading={loading}>
            {step === 1 ? '下一步' : '重置密码'}
          </Button>
        </Row>
      </Form>
    </div>
  )
}

export default ForgetPassword
