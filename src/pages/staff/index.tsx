import Search from '@/components/Search'
import TableHeader from '@/components/TableHeader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'umi'
import FilterForm from './component/FilterForm'
import TableList from './component/TableList'
import './index.less'
import DrawerComp from '@/components/DrawerComp'
const Staff = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { staffList, staffTotal, staffDetail } = useSelector(state => state.staff)
  useEffect(() => {
    fetchStaffList()
  }, [])
  const changePage = (page: number) => {
    setPage(page)
    fetchStaffList(page)
  }
  const fetchStaffList = (pageNo = page) => {
    dispatch({
      type: 'staff/requestStaffList',
      payload: { size: 10, page: pageNo }
    })
  }
  const updateStaffList = obj => {
    dispatch({ type: 'staff/updateStaffList', payload: obj })
  }

  return (
    <div className="staff-comp main-comp">
      <TableHeader page={page} size={10} total={staffTotal} changePage={changePage} />
      <Search render={() => <FilterForm />} />
      <TableList staffList={staffList} updateStaffList={updateStaffList} />
      <DrawerComp title={staffDetail?.userName} reloadList={fetchStaffList} id={staffDetail?._id} interfaceName="actionDelateStaffs">
        asd
      </DrawerComp>
    </div>
  )
}

export default Staff
