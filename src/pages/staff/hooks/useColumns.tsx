import { formatAge, formatDate } from '@/utils/format'
import { Tag } from 'antd'
import { useSelector } from 'umi'

const useColumns = () => {
  const { userInfo } = useSelector(state => state.user)
  const { staffList } = useSelector(state => state.staff)
  const normalList = [
    {
      title: '姓名',
      dataIndex: 'userName',
      editable: true,
      width: 200
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      editable: true,
      width: 200
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      render: data => data?.levelDescription || ''
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      width: 200,
      render: val => <Tag>{val == 1 ? '男' : '女'}</Tag>
    },
    {
      title: '部门',
      dataIndex: 'department',
      render: data => data?.departmentName || ''
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      render: data => data?.departmentLeader?.userName || ''
    }
  ]
  const authList = [
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      render: val => formatDate(val)
    },
    {
      title: '年龄',
      dataIndex: 'idNumber',
      render: val => formatAge(val)
    }
  ]
  //   const normalList = [
  //     {
  //       title: '性别',
  //       dataIndex: 'gender',
  //       editable: true,
  //       render: type => <Tag>{mapData.gender[type]}</Tag>
  //     },
  //     {
  //       title: '部门',
  //       dataIndex: 'department',
  //       render: data => data?.departmentName || '---'
  //     },
  //     {
  //       title: '部门负责人',
  //       dataIndex: 'department',
  //       render: data => data?.departmentLeader?.userName || '---'
  //     }
  //   ]
  //   //- 只有管理员可以进行渲染展示
  //   const authList = [
  //     {
  //       title: '入职时间',
  //       dataIndex: 'onboardingTime',
  //       editable: true,
  //       render: date => formatDate(date, 'YYYY-MM-DD')
  //     },
  //     {
  //       title: '年龄',
  //       dataIndex: 'idNumber',
  //       render: idNumber => formatYear(idNumber, 'age')
  //     },
  //     {
  //       title: '头像',
  //       dataIndex: 'avatar',
  //       render: img => <Image src={img || 'error'} fallback={loadErrorImg} />
  //     },
  //     {
  //       title: '籍贯',
  //       editable: true,
  //       dataIndex: 'hometown',
  //       render: hometown => hometown || '---'
  //     },
  //     {
  //       title: '学历',
  //       editable: true,
  //       dataIndex: 'education',
  //       render: type => <Tag> {mapData['education'][type]}</Tag>
  //     },
  //     {
  //       title: '婚姻状况',
  //       editable: true,
  //       dataIndex: 'marriage',
  //       render: type => <Tag> {mapData['marriage'][type]}</Tag>
  //     },
  //     {
  //       title: '生日',
  //       dataIndex: 'idNumber',
  //       render: id => formatBirth(id)
  //     },
  //     {
  //       title: '银行卡',
  //       dataIndex: 'bankNumber',
  //       editable: true
  //     },
  //     {
  //       title: '身份证号',
  //       editable: true,
  //       dataIndex: 'idNumber'
  //     },
  //     {
  //       title: '毕业院校',
  //       editable: true,
  //       dataIndex: 'graduatedSchool'
  //     },
  //     {
  //       title: '绩效考核',
  //       dataIndex: 'record',
  //       render: (record, data) => {
  //         return (
  //           <Tag
  //             onClick={() =>
  //               openReviewRecord({
  //                 title: '考核记录',
  //                 interfaceName: 'getAssessmentList',
  //                 requestData: {
  //                   queryData: { staffName: data._id }
  //                 },
  //                 type: 'assessment'
  //               })
  //             }
  //             className="c-p"
  //           >
  //             查看
  //           </Tag>
  //         )
  //       }
  //     },
  //     {
  //       title: '奖惩记录',
  //       dataIndex: 'record',
  //       render: (record, data) => {
  //         return (
  //           <Tag
  //             onClick={() =>
  //               openReviewRecord({
  //                 title: '奖惩记录',
  //                 interfaceName: 'getRewardAndPunishment',
  //                 requestData: {
  //                   staffName: data._id
  //                 },
  //                 type: 'reward'
  //               })
  //             }
  //             className="c-p"
  //           >
  //             查看
  //           </Tag>
  //         )
  //       }
  //     },
  //     {
  //       title: '调薪记录',
  //       dataIndex: 'record',
  //       render: (record, data) => {
  //         return (
  //           <Tag
  //             onClick={() =>
  //               openReviewRecord({
  //                 title: '调薪记录',
  //                 interfaceName: 'getSalaryAdjustment',
  //                 requestData: {
  //                   staffName: data._id
  //                 },
  //                 type: 'salary'
  //               })
  //             }
  //             className="c-p"
  //           >
  //             查看
  //           </Tag>
  //         )
  //       }
  //     }
  //   ]

  //   let renderColumnsList = userInfo.identity === 0 ? normalList : [...normalList, ...authList]
}

export default useColumns
