import Search from '@/components/Search'
import TableHeader from '@/components/TableHeader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'umi'
import FilterForm from './component/FilterForm'
import TableList from './component/TableList'
import './index.less'
import DrawerComp from '@/components/DrawerComp'
import DetailForm from './component/DetailForm'
import Dialog from './component/Dialog'
import AddStaffForm from './component/AddStaffForm'
const Staff = () => {
  const dispatch = useDispatch()
  const { staffList, staffTotal, staffDetail, staffParam } = useSelector(state => state.staff)
  const [addVisible, setAddVisible] = useState(false)

  useEffect(() => {
    fetchStaffList()
  }, [])
  const changePage = (page: number) => {
    dispatch({ type: 'staff/updateStaffParam', payload: { page: page } })
    fetchStaffList()
  }
  const fetchStaffList = () => {
    dispatch({
      type: 'staff/requestStaffList'
    })
  }
  const updateStaffList = obj => {
    dispatch({ type: 'staff/updateStaffList', payload: obj })
  }

  return (
    <div className="staff-comp main-comp">
      <TableHeader interfaceDelMethod="actionDelateStaffs" showCreateModal={() => setAddVisible(true)} page={staffParam.page} size={10} total={staffTotal} changePage={changePage} reloadList={fetchStaffList} />
      <Search render={() => <FilterForm reloadList={fetchStaffList} />} />
      <TableList staffList={staffList} updateStaffList={updateStaffList} />
      <DrawerComp title={staffDetail?.userName} reloadList={fetchStaffList} id={staffDetail?._id} interfaceName="actionDelateStaffs">
        <DetailForm staffDetail={staffDetail} updateStaffList={fetchStaffList} />
      </DrawerComp>
      <Dialog title="新增员工" visible={addVisible} setVisible={() => setAddVisible(false)}>
        <AddStaffForm closeModal={() => setAddVisible(false)} reloadList={() => changePage(1)} />
      </Dialog>
    </div>
  )
}

export default Staff
