import { Modal, Table } from 'antd'
import DetailTable from './DetailTable'

const Dialog = ({ visible, setVisible, width = 600, cellData }) => {
  return (
    <Modal title={cellData?.title} open={visible} footer={null} destroyOnClose centered width={width} onCancel={() => setVisible(false)}>
      <DetailTable cellData={cellData} />
    </Modal>
  )
}

export default Dialog
