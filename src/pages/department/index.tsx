import React, { useEffect, useState } from 'react'
import './index.less'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'umi'
import classNames from 'classnames'
import Tree from './component/Tree'
import Dialog from '@/components/Dialog'
import Form from './component/Form'
const Department = () => {
  const { collapse } = useSelector(state => state.common)
  const { departmentList } = useSelector(state => state.department)
  const [title, setTitle] = useState('')
  const [modalVisible, setModalVisible] = useState(false) //1创建 2修改
  const [type, setType] = useState(1)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'department/fetchDepartmentList', payload: {} })
  }, [])
  const createHandle = () => {
    setModalVisible(true)
    setType(1)
    setTitle('创建部门')
  }
  const updateHandle = department => {
    setModalVisible(true)
    setType(2)
    setTitle(department.departmentName)
  }
  return (
    <div className="department-comp main-comp">
      <div className={classNames('table-header-comp', { smallLeft: collapse })}>
        <Button shape="round" size="small" onClick={createHandle}>
          创建
        </Button>
      </div>
      <Tree departmentList={departmentList} updateHandle={updateHandle} />
      <Dialog className="department-dialog" title={title} visible={modalVisible} setVisible={setModalVisible}>
        <Form />
      </Dialog>
    </div>
  )
}

export default Department
