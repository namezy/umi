import { CaretLeftOutlined, CaretRightOutlined, RedoOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './index.less'
const Search = ({ render }) => {
  const [isClose, setIsClose] = useState(false)
  return (
    <div className="search-comp">
      <div className="search-comp-header">
        <span>字段过滤</span>
        <RedoOutlined />
      </div>
      <div className="close-tip">{isClose ? <CaretRightOutlined /> : <CaretLeftOutlined />}</div>
      {render()}
    </div>
  )
}

export default Search
