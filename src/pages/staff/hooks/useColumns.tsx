import { formatBirth, formatDate, formatAge } from '@/utils/format'
import { Image, Tag } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'umi'
import defaultAvatar from '@/assets/img/default_avatar.png'
import { mapData } from '@/utils/mapData'
import { FormOutlined } from '@ant-design/icons'
const useColumns = ({ handleSave, openDialog, openDetailDialog }) => {
  const { userInfo } = useSelector(state => state.user)
  const normalList = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      editable: true,
      render: (userName, data) => {
        return (
          <>
            <span>{userName}</span>
            {userInfo.identity == 1 && (
              <FormOutlined
                onClick={e => {
                  e.stopPropagation()
                  openDetailDialog(data._id)
                }}
              />
            )}
          </>
        )
      }
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',
      editable: true
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      key: 'level',
      render: data => data?.levelDescription || ''
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      editable: true,
      render: val => <Tag>{mapData['gender'][val]}</Tag>
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: data => data?.departmentName || ''
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      key: 'head',
      render: data => data?.departmentLeader?.userName || ''
    }
  ]
  const authList = [
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      key: 'onboardingTime',
      editable: true,
      render: val => formatDate(val)
    },
    {
      title: '年龄',
      dataIndex: 'idNumber',
      key: 'age',
      render: val => formatAge(val)
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: val => <Image src={val || 'error'} fallback={defaultAvatar} />
    },
    {
      title: '籍贯',
      dataIndex: 'hometown',
      key: 'hometown',
      editable: true
    },
    {
      title: '学历',
      editable: true,
      dataIndex: 'education',
      key: 'education',
      render: val => <Tag>{mapData['education'][val]}</Tag>
    },
    {
      title: '婚姻状况',
      editable: true,
      dataIndex: 'marriage',
      key: 'marriage',
      render: val => <Tag> {mapData['marriage'][val]}</Tag>
    },
    {
      title: '生日',
      dataIndex: 'idNumber',
      key: 'birthday',
      render: id => formatBirth(id)
    },
    {
      title: '银行卡',
      dataIndex: 'bankNumber',
      key: 'bankNumber',
      editable: true
    },
    {
      title: '身份证号',
      editable: true,
      dataIndex: 'idNumber',
      key: 'idNumber'
    },
    {
      title: '毕业院校',
      editable: true,
      dataIndex: 'graduatedSchool',
      key: 'graduatedSchool'
    },
    {
      title: '绩效考核',
      key: 'assessment',
      render: (record, data) => {
        return (
          <Tag
            onClick={() => {
              openDialog({
                title: '考核记录',
                type: 'assessment',
                interface: 'getAssessmentList',
                requestData: {
                  size: 5,
                  queryData: {}
                }
              })
            }}
          >
            查看
          </Tag>
        )
      }
    },
    {
      title: '奖罚记录',
      key: 'reward',
      render: (record, data) => {
        return (
          <Tag
            onClick={() => {
              openDialog({
                title: '奖罚记录',
                type: 'reward',
                interface: 'getRewardAndPunishment',
                requestData: {
                  // staffName: data._id
                  size: 5
                }
              })
            }}
          >
            查看
          </Tag>
        )
      }
    },
    {
      title: '调薪记录',
      key: 'salary',
      render: (record, data) => {
        return (
          <Tag
            onClick={() => {
              openDialog({
                title: '调薪记录',
                type: 'salary',
                interface: 'getSalaryAdjustment',
                requestData: {
                  // staffName: data._id
                  size: 5
                }
              })
            }}
          >
            查看
          </Tag>
        )
      }
    }
  ]
  const columns = useMemo(() => {
    const defaultColumns = userInfo.identity == 0 ? normalList : normalList.concat(authList)
    return defaultColumns.map(col => {
      if (!col.editable) {
        return col
      }
      let type = ''
      switch (col.dataIndex) {
        case 'onboardingTime':
          type = 'date'
          break
        case 'gender':
        case 'education':
        case 'marriage':
          type = 'select'
          break
        default:
          type = 'input'
          break
      }
      return {
        ...col,
        onCell: record => {
          return {
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            type,
            handleSave
          }
        }
      }
    })
  }, [userInfo, handleSave])

  return columns
}

export default useColumns
