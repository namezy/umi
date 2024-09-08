import { usePage } from '@/hooks'
import { PlusOutlined } from '@ant-design/icons'
import { Popover, Input, List } from 'antd'
import React, { useEffect, useState } from 'react'
import * as ajax from '@/service'
const PopoverComp = ({ interfaceName, field, placeholderVal, selectItemChange }) => {
  //field option渲染的字段  和查询关键字的字段
  const [page, setPage] = usePage(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [open, setOpen] = useState(false)
  const searchHandle = val => {
    // debugger
    setPage(1)
    requestList(val)
  }
  useEffect(() => {
    // debugger
    requestList()
    // return () => {
    //   debugger
    // }
  }, [])
  const requestList = async (query = '') => {
    const param = { page: page.current, size: 5, queryData: {} }
    if (query.trim() != '') {
      param.queryData[field] = query
    }
    const { data } = await ajax[interfaceName](param)
    if (data) {
      setList(data.list || [])
      setTotal(data.total || 0)
    }
  }
  const pageChangeHandle = val => {
    debugger
    setPage(val)
    requestList()
  }
  const selectItem = item => {
    setOpen(false)
    selectItemChange(item)
  }
  const content = (
    <List
      dataSource={list}
      rowKey={item => item._id}
      pagination={{ total, pageSize: 5, current: page.current, onChange: pageChangeHandle }}
      renderItem={item => {
        return (
          <List.Item onClick={() => selectItem(item)} className="cursor-pointer">
            {item[field]}
          </List.Item>
        )
      }}
    />
  )
  return (
    <Popover open={open} onOpenChange={val => setOpen(val)} title={<Input.Search onSearch={searchHandle} placeholder={placeholderVal} />} trigger="click" content={content}>
      <PlusOutlined />
    </Popover>
  )
}

export default PopoverComp
