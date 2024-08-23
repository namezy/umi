import { selectLayout } from '@/utils';
import { useLocation } from 'umi';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
const layoutMap = {
  BaseLayout,
  LoginLayout,
};
const Layout = () => {
  const location = useLocation();
  const Layout = layoutMap[selectLayout(location.pathname)];
  return <Layout></Layout>;
};

export default Layout;
