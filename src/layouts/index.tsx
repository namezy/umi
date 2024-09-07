import { selectLayout } from '@/utils'
import { useLocation, useSelector } from 'umi'
import BaseLayout from './BaseLayout'
import LoginLayout from './LoginLayout'
import Loading from '@/components/Loading'
import { ConfigProvider } from 'antd'
import locale from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const layoutMap = {
  BaseLayout,
  LoginLayout
}
const Layout = () => {
  const location = useLocation()
  const Layout = layoutMap[selectLayout(location.pathname)]
  const { effects } = useSelector((state: any) => state.loading)
  return (
    <ConfigProvider locale={locale}>
      <Loading isShow={effects['user/loading']} />
      <Layout></Layout>
    </ConfigProvider>
  )
}

export default Layout
