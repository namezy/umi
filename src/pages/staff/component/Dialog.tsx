import { Modal, Table } from 'antd'

const Dialog = ({ visible, setVisible, width = 600, children, title }) => {
  return (
    <Modal title={title} open={visible} footer={null} destroyOnClose centered width={width} onCancel={() => setVisible(false)}>
      {children}
    </Modal>
  )
}

export default Dialog
