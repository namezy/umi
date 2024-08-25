import { selectLayout } from '@/utils'
import { useLocation, useSelector } from 'umi'
import BaseLayout from './BaseLayout'
import LoginLayout from './LoginLayout'
import Loading from '@/components/Loading'
const layoutMap = {
  BaseLayout,
  LoginLayout,
}
const Layout = () => {
  const location = useLocation()
  const Layout = layoutMap[selectLayout(location.pathname)]
  const { effects } = useSelector((state: any) => state.loading)
  return (
    <>
      <Loading isShow={effects['user/loading']} />
      <Layout></Layout>
    </>
  )
}

export default Layout
