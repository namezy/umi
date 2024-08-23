import React from 'react'
import AccountLogin from './component/AccountLogin'
import MobileCodeLogin from './component/MobileCodeLogin'
import { Button, Col, Form, Row } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import loginImg from '@/assets/img/logo.svg'
import './login.less'
import { useDispatch, useSelector } from 'umi'
const Login = () => {
  const [form] = Form.useForm()
  const [loginType, setLoginType] = React.useState(0) //0:账号密码登录 1:手机验证码登录
  const dispatch = useDispatch()
  const { effects } = useSelector((state: any) => state.loading)
  const submitHandle = data => {
    console.log(data)
    dispatch({ type: 'user/login', payload: { ...data, type: loginType } })
  }
  const ComputedComponent = loginType === 0 ? AccountLogin : MobileCodeLogin
  const toggleLoginType = () => {
    setLoginType(loginType === 0 ? 1 : 0)
  }
  return (
    <div className="login-comp">
      <div className="login-comp_header">
        <img src={loginImg} alt="" />
        <div>知心人事登录系统</div>
      </div>
      <Form className="login-comp_body" form={form} onFinish={submitHandle}>
        <ComputedComponent form={form} />
        <Row>
          <Button className="submit" block type="primary" htmlType="submit" loading={effects['user/login']}>
            登录
          </Button>
        </Row>
        <Row className="login-comp_footer" justify="space-between">
          <Col className="left">忘记密码？</Col>
          <Col className="right" onClick={toggleLoginType}>
            {loginType === 0 ? '使用手机号码进行登录' : '使用用户名密码进行登录'}
            <ArrowRightOutlined />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Login
