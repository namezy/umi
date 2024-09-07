import Search from '@/components/Search'
import TableHeader from '@/components/TableHeader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'umi'
import FilterForm from './component/FilterForm'
import TableList from './component/TableList'
import './index.less'
const Staff = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { staffList, staffTotal } = useSelector(state => state.staff)
  useEffect(() => {
    dispatch({
      type: 'staff/requestStaffList',
      payload: { size: 30, page }
    })
  }, [])
  const changePage = (page: number) => {
    setPage(page)
    dispatch({
      type: 'staff/requestStaffList',
      payload: { size: 10, page }
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
    </div>
  )
}

export default Staff
