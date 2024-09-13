import { Modal, Table } from 'antd'

const Dialog = ({ visible, setVisible, width = 600, children, title, className = '' }) => {
  return (
    <Modal className={className} title={title} open={visible} footer={null} destroyOnClose centered width={width} onCancel={() => setVisible(false)}>
      {children}
    </Modal>
  )
}

export default Dialog
