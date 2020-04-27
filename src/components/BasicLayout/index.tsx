import React from 'react';
import BasicLayout from '@ant-design/pro-layout';
// @ts-ignore
import logo from '@ant-design/pro-layout/es/assets/logo.svg';
import { withRouter, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { useObserver } from 'mobx-react-lite';
import useRootStore from '../../models';
import menu from '../../models/menu';
import { Icon } from 'antd';

console.log(menu);

const BasicLayouts = withRouter(({ location, children }) => {
  const rootStore = useRootStore();
  return useObserver(() => (
    <BasicLayout
      title="十点"
      logo={<img src={logo} />}
      route={{ path: '/', routes: menu }}
      // rightContentRender={props => <div>123</div>}
      menuItemRender={props => (
        // @ts-ignore
        <Link to={props.path} >
          {props.icon && props.icon}
          <span>{props.name}</span>
        </Link>
      )}
      location={location}
      footerRender={() => <div>Footer</div>}
      {...rootStore.layoutSettings}
    >
      {children}
    </BasicLayout>
  ));
});

export default hot(BasicLayouts);
