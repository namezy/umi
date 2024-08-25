import React from 'react'
import { Layout, Menu } from 'antd'
import logo from '@/assets/img/logo.png'
import { history } from 'umi'
import { AccountBookOutlined, AimOutlined, ApartmentOutlined, BarChartOutlined, DashboardOutlined, DatabaseOutlined, InsertRowAboveOutlined, LineChartOutlined, SmileOutlined, TeamOutlined } from '@ant-design/icons'
const { Sider } = Layout
const iconMap = {
  department: <ApartmentOutlined />,
  level: <AimOutlined />,
  assessment: <InsertRowAboveOutlined />,
  reward: <SmileOutlined />,
  salary: <AccountBookOutlined />,
  dashboard: <DashboardOutlined />,
  attendance: <LineChartOutlined />,
  'bar-chart': <BarChartOutlined />,
  rewardAndPunishment: <DatabaseOutlined />,
  team: <TeamOutlined />,
}
const SideBar = ({ collapse }) => {
  const routeList = sessionStorage.getItem('routeList') ? JSON.parse(sessionStorage.getItem('routeList')) : []
  const { pathname } = history.location
  const menuItems = routeList.map(route => {
    return {
      key: route.route,
      label: route.zhName,
      icon: iconMap[route.icon],
    }
  })
  const clickHandle = menuItem => {
    history.push(menuItem.key)
  }
  return (
    <Sider theme="light" className="layout-comp_side-bar" collapsed={collapse}>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" />
          {!collapse && <h1>oa系统</h1>}
        </div>
      </div>
      <div className="body">
        <Menu items={menuItems} defaultSelectedKeys={[pathname]} onClick={clickHandle} />
      </div>
    </Sider>
  )
}

export default SideBar
