import React from 'react'
import { Table, Tag } from 'antd'
import { formatDate } from '@/utils/format'
const ViolationTable = ({ title, renderList }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'staffName',
      key: 'name',
      render: x => x?.userName || '--'
    },
    {
      title: '考勤时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: x => formatDate(x, 'YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '考勤类型',
      dataIndex: 'attendanceType',
      key: 'attendanceType',
      render: x => <Tag color="red">{x === 4 ? '迟到' : '早退'}</Tag>
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      key: 'department',
      render: x => <Tag>{x?.department ? x.department.departmentName : '暂无部门信息'}</Tag>
    }
  ]
  return (
    <div className="violation-table-comp">
      <Table dataSource={renderList} rowKey={row => row._id} columns={columns} pagination={false} />
    </div>
  )
}

export default ViolationTable
