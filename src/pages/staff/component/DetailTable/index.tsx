import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import * as ajax from '@/service'
import columnsMap from './columnsMap'
const DetailTable = ({ cellData }) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    requestData()
  }, [])
  const requestData = async (page = 1) => {
    try {
      const { data, total } = await ajax[cellData.interface]({ page, ...cellData.requestData })
      setList(data.list || [])
      setTotal(total)
    } catch (error) {
      console.error(error)
    }
  }
  const onChange = page => {
    requestData(page)
  }
  return <Table rowKey={row => row._id} pagination={{ pageSize: 5, onChange: onChange, total }} dataSource={list} columns={columnsMap[cellData?.type]}></Table>
}

export default DetailTable
