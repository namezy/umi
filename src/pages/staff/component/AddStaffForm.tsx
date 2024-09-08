import React, { useEffect, useState } from 'react'
import staticList from '@/static/staffList'
import { Button, DatePicker, Flex, Form, Input, message, Select } from 'antd'
import PopoverComp from '@/components/PopoverComp'
import { actionCreateStaff, checkIsExists } from '@/service'
import { staffRule } from '@/utils/rules/staffRule'

const AddStaffForm = ({ reloadList, closeModal }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  //popover 选择item
  const selectItemChange = inputItem => {
    return selectItem => {
      const param = {
        [inputItem.itemName.split('N')[0]]: selectItem._id
      }
      form.setFieldsValue({
        [inputItem.itemName]: selectItem[inputItem.itemName],
        ...param
      })
    }
  }
  const checkHandle = async item => {
    try {
      const values = await form.validateFields([item.itemName])
      if (item.itemName === 'mobile' || item.itemName === 'accountName') {
        const { data, msg } = await checkIsExists({ checkData: values })
        if (data) {
          form.setFields([{ name: item.itemName, errors: msg }])
          return message.error(msg)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandle = async val => {
    if (loading) return
    const param = JSON.parse(JSON.stringify(val))
    delete param.departmentName
    delete param.levelName
    param.education = Number(param.education)
    try {
      const { code, msg } = await actionCreateStaff(param)
      if (code) return message.error(msg)
      message.success(msg)
      setLoading(false)
      reloadList()
      closeModal()
    } catch (error) {
      setLoading(false)
    }
  }
  const inputTypeList = {
    input: item => <Input placeholder={item.placeholderVal} type={item.itemName === 'password' ? 'password' : 'text'} onBlur={() => checkHandle(item)} />,
    select: item => <Select options={item.optionData.map((item, index) => ({ label: item, value: index }))} placeholder={item.placeholderVal} />,
    date: item => <DatePicker placeholder={item.placeholderVal} />,
    popover: item => <Input placeholder={item.placeholderVal} readOnly addonAfter={<PopoverComp selectItemChange={selectItemChange(item)} field={item.itemName} placeholderVal={item.placeholderVal} interfaceName={item.interfaceName} />} />,
    upload: item => <Input></Input>
  }
  return (
    <Form form={form} className="staff-detail-form" layout="vertical" onFinish={submitHandle}>
      {staticList.map((rowItem, rowIndex) => {
        return (
          <Flex gap={30} align="center" justify="space-between" key={rowIndex}>
            {rowItem.map((item, index) => {
              return (
                <Form.Item rules={staffRule[item.itemName]} name={item.itemName} className="staff-form-item" key={index} label={item.labelTxt} style={{ ...(item?.style || {}) }}>
                  {inputTypeList[item.renderType](item)}
                </Form.Item>
              )
            })}
          </Flex>
        )
      })}
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          创建
        </Button>
      </Flex>
    </Form>
  )
}

export default AddStaffForm
