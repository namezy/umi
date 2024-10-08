import { message, Table } from 'antd'
import { useState } from 'react'
import { EditableCell, EditableRow } from '@/components/Editable'
import useColumns from '../hooks/useColumns'
import { useDispatch, useSelector } from 'umi'
import Dialog from '@/components/Dialog'
import { checkIsExists, actionUpdateStaff } from '@/service'
import DetailTable from './DetailTable'
const TableList = ({ staffList, updateStaffList }) => {
  const dispatch = useDispatch()
  const { effects } = useSelector(state => state.loading)
  const [visible, setVisible] = useState(false)
  const [cellData, setCellData] = useState(null)
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const handleSave = async obj => {
    if (obj.type === 'mobile') {
      const { data, msg } = await checkIsExists({ checkData: { mobile: obj.value } })
      if (data) return message.error(msg)
    }
    const { msg, code } = await actionUpdateStaff({ _id: obj.id, type: obj.type, updateVal: obj.value })
    if (code) return message.error(msg)
    message.success(msg)
    updateStaffList(obj)
  }
  const openDialog = param => {
    setCellData(param)
    setVisible(true)
  }
  const openDetailDialog = (id: string) => {
    dispatch({ type: 'staff/requestStaffDetail', payload: { id } })
  }
  const columns = useColumns({ handleSave, openDialog, openDetailDialog })
  const selectHandle = val => {
    dispatch({ type: 'common/setDeleteIds', payload: { deleteIds: val } })
  }
  return (
    <>
      <Table rowSelection={{ onChange: selectHandle }} loading={effects['staff/requestStaffList']} rowKey={row => row._id} className="staff-table-comp" components={components} pagination={false} rowClassName={() => 'editable-row'} bordered dataSource={staffList} columns={columns} />
      <Dialog visible={visible} setVisible={setVisible} title={cellData?.title}>
        <DetailTable cellData={cellData} />
      </Dialog>
    </>
  )
}

export default TableList
