import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal, Pagination } from 'antd'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'umi'
import './index.less'
import * as ajax from '@/service'
const TableHeader = ({ page, size, total, changePage, showCreateModal, interfaceDelMethod, reloadList }) => {
  const { collapse, deleteIds } = useSelector(state => state.common)
  const dispatch = useDispatch()
  //- 删除选定的列表项
  const showDelConfirm = () => {
    if (!deleteIds.length) return message.error('请先指定删除的列表项')
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除选中的数据么?',
      onOk: () => delHandle(deleteIds)
    })
  }

  //- 删除调用接口
  const delHandle = async ids => {
    const { code, msg } = await ajax[interfaceDelMethod]({ ids })
    if (code) return
    message.success(msg)
    dispatch({
      type: 'common/setDeleteIds',
      payload: {
        deleteIds: []
      }
    })
    reloadList()
  }
  return (
    <div className={classNames('table-header-comp', { smallLeft: collapse })}>
      <div className="left">
        <Button onClick={showCreateModal} className="mr-10" size="small" shape="round" icon={<PlusOutlined />}>
          创建
        </Button>
        <Button size="small" onClick={showDelConfirm} danger shape="round" icon={<DeleteOutlined />}>
          批量删除
        </Button>
      </div>
      <div className="right">
        <Pagination simple defaultCurrent={page} pageSize={size} total={total} onChange={page => changePage(page)} />
        <div>共：{total}条记录</div>
      </div>
    </div>
  )
}

export default TableHeader
