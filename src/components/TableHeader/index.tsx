import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import classNames from 'classnames'
import { useSelector } from 'umi'
import './index.less'
const TableHeader = ({ page, size, total, changePage }) => {
  const { collapse } = useSelector(state => state.common)
  return (
    <div className={classNames('table-header-comp', { smallLeft: collapse })}>
      <div className="left">
        <Button className="mr-10" size="small" shape="round" icon={<PlusOutlined />}>
          创建
        </Button>
        <Button size="small" danger shape="round" icon={<DeleteOutlined />}>
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
