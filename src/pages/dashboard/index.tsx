import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'umi'
import { StaffAmount } from './component/StaffAmount'
import './index.less'
const Dashboard = () => {
  const dispatch = useDispatch()
  const { totalAmount, amountDataList } = useSelector(state => state.dashboard)
  useEffect(() => {
    dispatch({ type: 'dashboard/fetchAnalyzeStaff' })
  }, [])
  return (
    <div className="dashboard-comp">
      <div className="dashboard-comp_total_amount">
        <StaffAmount title={totalAmount.title} amount={totalAmount.amount} />
      </div>
      <div className="dashboard-comp_items_amount">
        {amountDataList.map((item, index) => (
          <StaffAmount key={index} title={item.title} amount={item.amount} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
