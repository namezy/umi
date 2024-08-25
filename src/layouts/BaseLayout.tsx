import { useMemo, useState } from 'react'
import { Outlet, history, useSelector } from 'umi'
import { Layout } from 'antd'
import './BaseLayout.less'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import NotFound from '@/pages/404'
import Loading from '@/components/Loading'
const { Content } = Layout

const BaseLayout = () => {
  const [collapse, setCollapse] = useState(false)
  const changeCollapse = () => setCollapse(!collapse)
  const {
    location: { pathname },
  } = history
  const { effects } = useSelector(state => state.loading)
  const routeList = sessionStorage.getItem('routeList') ? JSON.parse(sessionStorage.getItem('routeList')) : []
  const isInRouteList = () => {
    if (pathname === '/') {
      history.replace(routeList[0]?.route)
      return false
    }
    return routeList.some(a => a.route === pathname)
  }
  const computedLoading = useMemo(() => {
    return effects['dashboard/fetchAnalyzeStaff'] || effects['attendance/fetchAttendanceList']
  }, [effects])
  return (
    <Layout className="layout-comp">
      <SideBar collapse={collapse} />
      <Layout>
        <Header collapse={collapse} changeCollapse={changeCollapse} />
        <Content className="layout-main-comp">
          {isInRouteList() ? (
            <>
              <Loading isShow={computedLoading} part />
              <Outlet />
            </>
          ) : (
            <NotFound />
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
