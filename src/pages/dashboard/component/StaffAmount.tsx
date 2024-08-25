import React from 'react'

export const StaffAmount = ({ title, amount }) => {
  return (
    <div className="staff-amount-comp">
      <div className="staff-amount-comp_title">{title}</div>
      <div className="staff-amount-comp_content">
        <div className="box">
          <div className="number">{amount}</div>
          <div className="txt">人</div>
        </div>
      </div>
    </div>
  )
}
