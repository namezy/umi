import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'umi'
import ViolationChart from './component/ViolationChart'
import ViolationTable from './component/ViolationTable'
import './index.less'
const Attendance = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const { tableList, chartList } = useSelector(state => state.attendance)
  useEffect(() => {
    dispatch({ type: 'attendance/fetchAttendanceList' })
  }, [])
  return (
    <div className="attendance-comp">
      <div className="attendance-comp_chartList">
        {chartList.map((item, index) => {
          return <ViolationChart key={index} {...item} />
        })}
      </div>
      <div className="attendance-comp_tableList">
        {tableList.map((item, index) => {
          return <ViolationTable key={index} {...item} />
        })}
      </div>
    </div>
  )
}

export default Attendance
