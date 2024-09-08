import React, { useEffect } from 'react'
import staticList from '@/static/staffList'
import { DatePicker, Flex, Form, Input, message, Select } from 'antd'
import './index.less'
import PopoverComp from '@/components/PopoverComp'
import dayjs from 'dayjs'
import { actionUpdateStaff, checkIsExists } from '@/service'
import { useDispatch } from 'umi'
import { staffRule } from '@/utils/rules/staffRule'
const DetailForm = ({ staffDetail, updateStaffList }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const checkHandle = async item => {
    let oldVal = staffDetail[item.itemName]
    const newVal = form.getFieldValue(item.itemName)
    if (typeof oldVal === 'object' && oldVal !== null) {
      oldVal = oldVal._id
    }
    if (oldVal === newVal) return
    try {
      const values = await form.validateFields([item.itemName])
      if (item.itemName === 'mobile' || item.itemName === 'accountName') {
        const { data, msg } = await checkIsExists({ checkData: values })
        if (data) return message.error(msg)
      }
      updateStaff(item.itemName, newVal)
    } catch (error) {
      form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] })
      console.log(error)
    }
  }
  const updateStaff = async (type, updateVal) => {
    try {
      const { msg, code } = await actionUpdateStaff({ _id: staffDetail._id, type, updateVal })
      if (code) return message.error(msg)
      message.success(msg)
      dispatch({ type: 'staff/updateStaffDetail', payload: { [type]: updateVal } })
      updateStaffList()
    } catch (error) {
      console.log(error)
    }
  }
  const inputTypeList = {
    input: item => <Input placeholder={item.itemName === 'password' ? '请在登录页面完成修改' : item.placeholderVal} disabled={item.itemName === 'password'} onBlur={() => checkHandle(item)} />,
    select: item => <Select options={item.optionData.map((item, index) => ({ label: item, value: index }))} placeholder={item.placeholderVal} />,
    date: item => <DatePicker placeholder={item.placeholderVal} />,
    popover: item => <Input placeholder={item.placeholderVal} readOnly addonAfter={<PopoverComp selectItemChange={selectItemChange(item)} field={item.itemName} placeholderVal={item.placeholderVal} interfaceName={item.interfaceName} />} />,
    upload: item => <Input></Input>
  }
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
      checkHandle({ itemName: inputItem.itemName.split('N')[0] })
    }
  }
  return (
    <Form form={form} initialValues={{ ...staffDetail, onboardingTime: dayjs(staffDetail?.onboardingTime), departmentName: staffDetail?.department?.departmentName, levelName: staffDetail?.level?.levelName }} className="staff-detail-form" layout="vertical">
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
    </Form>
  )
}

export default DetailForm
