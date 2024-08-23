import React from 'react';
import { Outlet } from 'umi';

const BaseLayout = () => {
  return (
    <div>
      <h2>侧边栏</h2>
      <Outlet></Outlet>
    </div>
  );
};

export default BaseLayout;
