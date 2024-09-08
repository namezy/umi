import { CaretLeftOutlined, CaretRightOutlined, RedoOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './index.less'
import { useDispatch } from 'umi'
import classNames from 'classnames'
const Search = ({ render }) => {
  const [isClose, setIsClose] = useState(false)
  const dispatch = useDispatch()
  const resetParam = () => {
    dispatch({ type: 'common/changeIsResetParam', payload: { isResetParam: true } })
  }
  return (
    <div className={classNames('search-comp', { close: isClose })}>
      <div className="search-comp-header">
        <span>字段过滤</span>
        <RedoOutlined className="cursor-pointer" onClick={resetParam} />
      </div>
      <div className="close-tip" onClick={() => setIsClose(!isClose)}>
        {isClose ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div>
      {render()}
    </div>
  )
}

export default Search
