import { Form, Input, Popconfirm, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { EditableCell, EditableRow } from '@/components/Editable'
const TableList = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0'
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1'
    }
  ])
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true
    },
    {
      title: 'age',
      dataIndex: 'age'
    },
    {
      title: 'address',
      dataIndex: 'address'
    }
  ]
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const handleSave = (...args) => {
    console.log('handleSave')
    console.log(args)
  }
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => {
        console.log('onCellonCell')
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave
        }
      }
    }
  })
  return <Table className="staff-table-comp" components={components} pagination={false} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns} />
}

export default TableList
