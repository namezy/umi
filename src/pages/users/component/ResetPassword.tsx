import { loginRules } from '@/utils/rules'
import { LockOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
const ResetPassword = ({ form }) => {
  return (
    <>
      <Form.Item name="password" rules={loginRules.password} hasFeedback>
        <Input placeholder="新的登录密码" prefix={<LockOutlined />} type="password" />
      </Form.Item>
      <Form.Item name="confirmPassword" rules={loginRules.confirmPassword(form)} hasFeedback>
        <Input placeholder="确认密码" type="password" prefix={<LockOutlined />} />
      </Form.Item>
    </>
  )
}
export default ResetPassword
