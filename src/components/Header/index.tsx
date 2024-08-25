import { MenuFoldOutlined, MenuUnfoldOutlined, WalletOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu } from 'antd'
import { useSelector, history } from 'umi'
import defaultImg from '@/assets/img/default_avatar.png'
const { Header: AntdHeader } = Layout
const Header = ({ changeCollapse, collapse }) => {
  const { userInfo } = useSelector(state => state.user)
  const logoutHandle = () => {
    sessionStorage.clear()
    history.replace('/users/login')
  }
  const menuTitle = (
    <div className="user-menu">
      <span>{userInfo.userName}</span>
      <Avatar src={userInfo.avatar || defaultImg} />
    </div>
  )
  const logout = (
    <div onClick={logoutHandle}>
      <WalletOutlined />
      <span>退出</span>
    </div>
  )
  const menuItems = [
    {
      key: 'sub1',
      label: menuTitle,
      children: [
        {
          key: '1',
          label: logout,
        },
      ],
    },
  ]
  return (
    <AntdHeader className="head-comp">
      <div className="left" onClick={changeCollapse}>
        {collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <div className="right">
        <Menu mode="horizontal" items={menuItems} />
      </div>
    </AntdHeader>
  )
}

export default Header
