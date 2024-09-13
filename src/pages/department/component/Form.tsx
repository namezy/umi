import React from 'react'
import { Form, Descriptions, Input, Button } from 'antd'
import departRule from '@/utils/rules/departRule'
const FormComp = () => {
  const [form] = Form.useForm()
  const items = [
    {
      key: '1',
      label: '部门名称',
      children: (
        <Form.Item name="departmentName" rules={departRule.departmentName}>
          <Input />
        </Form.Item>
      )
    },
    {
      key: '2',
      label: '备注',
      children: (
        <Form.Item name="mark">
          <Input />
        </Form.Item>
      )
    },
    {
      key: '3',
      label: '子部门呢',
      children: 'Cloud Database'
    },
    {
      key: '4',
      label: '部门负责人',
      children: 'Cloud Database'
    }
  ]
  const submitHandle = data => {
    console.log(data)
  }
  const addHandle = () => {
    form.setFieldsValue({ name: 12, age: 20 })
    setTimeout(() => {
      const values = form.getFieldValue('name')
      console.log(values)
    })
  }
  return (
    <Form form={form} onFinish={submitHandle}>
      <Descriptions items={items} bordered column={1} labelStyle={{ width: '150px' }} />
      <Form.Item>
        <Button onClick={addHandle}>++++</Button>
        <Button className="submit" type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormComp
