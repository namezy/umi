import PopoverComp from '@/components/PopoverComp'
import { mapData } from '@/utils/mapData'
import { Form, Input, Select } from 'antd'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'umi'

const FilterForm = ({ reloadList }) => {
  const { isResetParam } = useSelector(state => state.common)
  const [form] = Form.useForm()
  const fieldsRef = useRef({})
  const dispatch = useDispatch()
  const selectItemChange = (type, item) => {
    const fieldName = `${type}Name`
    form.setFieldsValue({
      // [type]: item._id,
      [fieldName]: item[fieldName]
    })
    fieldsRef.current[type] = item._id
    searchHandle()
  }
  const searchHandle = () => {
    let values = form.getFieldsValue()
    values = JSON.parse(JSON.stringify(values))
    delete values.departmentName
    delete values.levelName
    Object.keys(fieldsRef.current).forEach(key => {
      if (fieldsRef.current[key]) {
        values[key] = fieldsRef.current[key]
      }
    })
    dispatch({ type: 'staff/updateStaffParam', payload: { queryData: values, page: 1 } })
    reloadList()
  }
  const resetParamHandle = () => {
    fieldsRef.current = {}
    form.resetFields()
    dispatch({ type: 'staff/updateStaffParam', payload: { queryData: {}, page: 1 } })
    dispatch({ type: 'common/changeIsResetParam', payload: { isResetParam: false } })
    reloadList()
  }
  useEffect(() => {
    if (isResetParam) {
      resetParamHandle()
    }
  }, [isResetParam])

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="userName" label="姓名">
        <Input allowClear placeholder="请输入搜索用户名关键字" onPressEnter={searchHandle} />
      </Form.Item>
      <Form.Item name="departmentName" label="部门">
        <Input placeholder="请选择搜索的部门" readOnly addonAfter={<PopoverComp selectItemChange={item => selectItemChange('department', item)} field="departmentName" placeholderVal="请选择部门" interfaceName="getDepartmentList" />} />
      </Form.Item>
      <Form.Item name="levelName" label="职级">
        <Input placeholder="请选择搜索的职级" readOnly addonAfter={<PopoverComp selectItemChange={item => selectItemChange('level', item)} field="levelName" placeholderVal="请选择职级" interfaceName="getLevelList" />} />
      </Form.Item>
      <Form.Item name="marriage" label="婚姻状况">
        <Select placeholder="请选择搜索的婚姻状况" onChange={searchHandle} options={mapData.marriage.map((item, index) => ({ label: item, value: index }))} />
      </Form.Item>
      <Form.Item name="education" label="学历">
        <Select placeholder="请选择搜索的学历" onChange={searchHandle} options={mapData.education.map((item, index) => ({ label: item, value: index }))} />
      </Form.Item>
    </Form>
  )
}

export default FilterForm
