import { loginRules } from '@/utils/rules'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
const AccountLogin = ({ form }) => {
  return (
    <>
      <Form.Item name="accountName" rules={loginRules.accountName} hasFeedback>
        <Input placeholder="请输入用户名" prefix={<UserOutlined />} maxLength={20} />
      </Form.Item>
      <Form.Item name="password" rules={loginRules.password} hasFeedback>
        <Input placeholder="请输入密码" type="password" prefix={<LockOutlined />} />
      </Form.Item>
    </>
  )
}

export default AccountLogin
