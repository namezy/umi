import React, { useMemo } from 'react'
import OrgTree from 'react-org-tree'

const Tree = ({ departmentList, updateHandle }) => {
  const formatChildren = children => {
    children.forEach(item => {
      item.label = item.departmentName
      item.id = item._id
      if (item.children) {
        formatChildren(item.children)
      }
    })
    return children
  }
  const computedList = useMemo(() => {
    const list = departmentList.filter(item => !item.parentLists || !item.parentLists.length)
    console.log(list)
    const res = {
      id: -1,
      label: '公司组织架构图',
      children: formatChildren(list)
    }
    return res
  }, [departmentList])
  return (
    <div className="department-tree">
      <OrgTree data={computedList} onClick={(_, item) => updateHandle(item)} />
    </div>
  )
}

export default Tree
