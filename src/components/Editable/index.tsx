import { DatePicker, Form, Input, Select } from 'antd'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
const EditableContext = React.createContext(null)
import { mapData } from '@/utils/mapData'
import dayjs from 'dayjs'
import { staffRule } from '@/utils/rules/staffRule'
export const EditableRow = props => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

export const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, type, ...restProps }) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])
  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
      onboardingTime: dayjs(record[dataIndex])
    })
  }
  //保存前检测
  const checkHandle = async () => {
    try {
      const values = await form.validateFields([dataIndex])
      setEditing(false)
      if (type === 'date' && dayjs(record[dataIndex]).isSame(values[dataIndex], 'day')) {
        return
      }
      if (record[dataIndex] === values[dataIndex]) return
      handleSave({ id: record._id, type: dataIndex, value: values[dataIndex] })
    } catch (error) {
      console.log(error)
      //验证失败
      setEditing(false)
    }
  }
  const editNode = useMemo(() => {
    let node = null
    switch (type) {
      case 'select':
        const options = mapData[dataIndex].map((item, index) => {
          return {
            label: item,
            value: index
          }
        })
        node = <Select ref={inputRef} options={options} onChange={checkHandle}></Select>
        break
      case 'date':
        node = <DatePicker ref={inputRef} onChange={checkHandle}></DatePicker>
        break
      default:
        node = <Input ref={inputRef} onPressEnter={checkHandle} onBlur={checkHandle} />
        break
    }
    return node
  }, [type, dataIndex])
  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={staffRule[dataIndex]}
      >
        {editNode}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    )
  }
  return <td {...restProps}>{childNode}</td>
}
