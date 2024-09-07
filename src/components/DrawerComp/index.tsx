import { CloseCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Drawer, Divider, Modal, message } from 'antd'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'umi'
import * as ajax from '@/service'
const DrawerComp = ({ title, children, placement = 'right', width = 600, reloadList, interfaceName, id }) => {
  const { drawerVisible } = useSelector(state => state.common)
  const dispatch = useDispatch()
  const titleNode = useMemo(() => {
    return (
      <>
        <CopyOutlined className="mr-8" />
        <span>{title}</span>
      </>
    )
  }, [title])
  const closeDrawer = () => {
    dispatch({ type: 'common/changeDrawerVisible' })
  }
  const delConfirm = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除吗？',
      onOk: () => {
        delHandle()
      }
    })
  }
  const delHandle = async () => {
    const { code, msg } = await ajax[interfaceName]({ ids: [id] })
    // if (!code) return message.error(msg)
    message.success(msg)
    closeDrawer()
    reloadList()
  }
  const extraNode = useMemo(() => {
    return (
      <>
        <DeleteOutlined className="cursor-pointer" onClick={delConfirm} />
        <Divider type="vertical" />
        <CloseCircleOutlined onClick={closeDrawer} className="cursor-pointer" />
      </>
    )
  }, [id])
  return (
    <Drawer width={width} title={titleNode} open={drawerVisible} placement={placement} destroyOnClose closeIcon={null} extra={extraNode}>
      <h2>drawer</h2>
      {children}
    </Drawer>
  )
}

export default DrawerComp
