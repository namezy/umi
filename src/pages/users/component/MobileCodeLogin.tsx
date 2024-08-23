import { loginRules } from '@/utils/rules'
import { CodeSandboxOutlined, MobileOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'

const MobileCodeLogin = ({ form }) => {
  const [disabled, setDisabled] = useState(true)
  const [status, setStatus] = useState(true) //true:未发送验证码 false:已发送验证码
  const [time, setTime] = useState(60)
  const timerRef = useRef<null | ReturnType<typeof setInterval>>(null)
  const checkMobileStatus = async () => {
    try {
      await form.validateFields(['mobile'])
      setDisabled(false)
    } catch (e) {
      setDisabled(true)
    }
  }
  const sendCode = () => {
    setDisabled(true)
    setStatus(false)
    runtime()
  }
  const runtime = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTime(time => {
        if (time === 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setStatus(true)
          checkMobileStatus()
          return 60
        }
        return time - 1
      })
    }, 1000)
  }
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])
  return (
    <>
      <Form.Item name="mobile" rules={loginRules.mobile} hasFeedback>
        <Input placeholder="请输入手机号码" prefix={<MobileOutlined />} maxLength={11} onChange={checkMobileStatus} />
      </Form.Item>
      <Form.Item name="code" rules={loginRules.code} className="code" hasFeedback>
        <Input
          placeholder="请输入验证码"
          prefix={<CodeSandboxOutlined />}
          addonAfter={
            <Button onClick={sendCode} disabled={disabled}>
              {status ? '获取验证码' : `${time}s后重新发送`}
            </Button>
          }
        />
      </Form.Item>
    </>
  )
}

export default MobileCodeLogin
