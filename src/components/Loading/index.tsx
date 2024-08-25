import classnames from 'classnames'
import './index.less'
const Loading = ({ isShow, part = false }) => {
  return (
    <div className={classnames('loading-comp', { hidden: !isShow }, { part: part })}>
      <div className="wrapper">
        <div className="inner"></div>
        <div className="text">LOADING</div>
      </div>
    </div>
  )
}

export default Loading
