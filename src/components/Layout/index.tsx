import { Breadcrumb, Layout, Menu } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useRootStore from '../../models';
import { ProMenuType } from '../../models/menu';
import styles from './index.module.scss';
import RightContent from '../BasicLayout/RightContent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 根据路由变化找到menu菜单满足的key
const findKey = (menu: ProMenuType[], path: string, parent?: ProMenuType): { current: ProMenuType, parent: ProMenuType[] } => {
  const obj = {
    current: {} as ProMenuType,
    parent: [] as ProMenuType[],
  };
  for (let i = 0; i < menu.length; i += 1) {
    if (menu[i].path === path) {
      obj.current = menu[i];
      if (parent) {
        obj.parent.push(parent)
      }
      return obj;
    }
    if (menu[i].routes) {
      const newObj = findKey(menu[i].routes || [], path, menu[i]);
      obj.current = newObj.current;
      obj.parent = obj.parent.concat(newObj.parent)
    }
  }
  return obj;
}

export const MenuItem = (menuItem: ProMenuType) => {
  const children = menuItem.routes ? menuItem.routes.map(MenuItem) : undefined;
  const renderItem = menuItem.routes ? (
    <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.name}>
      {children}
    </SubMenu>
  ) : (
      <Menu.Item key={menuItem.key}>
        <Link to={menuItem.path}>
          {menuItem.icon && menuItem.icon}
          <span>{menuItem.name}</span>
        </Link>
      </Menu.Item>
    );
  return renderItem;
};

const CustomLayout = withRouter(({ location, children }) => {
  const rootStore = useRootStore();
  const store = useLocalStore(() => ({
    selectedKeys: '',
    openKeys: [] as string[],
    breadcrumb: [] as ProMenuType[],
    onOpenChange: (openKeys: string[]) => {
      store.openKeys = openKeys;
    },
  }));
  // 监听路由变化
  useEffect(() => {
    const obj = findKey(rootStore.global.menu, location.pathname)
    store.selectedKeys = obj.current.key || '';
    store.openKeys = obj.parent.map(item => item.key || '');
    store.breadcrumb = obj.parent.concat(obj.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  return useObserver(() => (
    <Layout>
      <Header className="header">
        <div className={styles.logo} />
        <span className={styles.title}>智能问答</span>
        <RightContent />
      </Header>
      <Layout>
        <Sider width={200} breakpoint="lg" className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[store.selectedKeys]}
            openKeys={store.openKeys}
            onOpenChange={store.onOpenChange}
            // defaultOpenKeys={store.openKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            {rootStore.global.menu.map(item => MenuItem(item))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {
              store.breadcrumb.map(item => <Breadcrumb.Item>
                {/* <Link to={item.path}> */}
                {item.name}
                {/* </Link> */}

              </Breadcrumb.Item>)
            }
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  ));
});

export default CustomLayout;
