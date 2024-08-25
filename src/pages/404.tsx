import React from 'react'
import img from '@/assets/img/not_found.png'
const NotFound = () => {
  return (
    <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <img src={img} alt="" />
    </div>
  )
}

export default NotFound
