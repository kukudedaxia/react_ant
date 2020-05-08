import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const menu = {
  path: '/demo',
  name: '样例',
  icon: <UserOutlined />,
  key: 'DEMO',
  routes: [
    {
      path: '/demo/demo1',
      name: '样例1',
      key: 'DEMO1',
      component: React.lazy(() => import('./demo1')),
    },
    {
      path: '/demo/demo2',
      name: '样例2',
      key: 'DEMO2',
      // component: require('./demo2'),
      component: React.lazy(() => import('./demo2')),
    },
  ],
};
export default menu;
