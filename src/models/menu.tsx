// @ts-nocheck
/* eslint-disable no-continue */
import React, { ComponentType, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export interface ProMenuType {
  /**
   * 页面组件，当拥有子路由时，子页面以children传入
   * 由于react-hot-loader的bug，暂时无法使用() => import()方式，只能使用require()
   */
  component?:
    | (() => Promise<{ default: React.ComponentType }>)
    | { default: React.ComponentType }
    | React.LazyExoticComponent<() => JSX.Element>;
  /**
   * 设置menuItem key
   */
  key?: string;
  /**
   * 菜单跳转路径，如果未设置routePath，则同时也为路由路径
   */
  path: string;
  /**
   * 路由路径，当路径包含变量时使用
   */
  routePath?: string;
  /**
   * 菜单项名称，同时影响页面标题和面包屑
   */
  name: string;
  /**
   * 菜单图表，ant design icon组件
   */
  icon?: React.ReactNode;
  /**
   * 子菜单
   */
  routes?: ProMenuType[];
  /**
   * 路径是否精确匹配
   */
  exact?: boolean;
  /**
   * 在菜单中隐藏该项
   */
  hideInMenu?: boolean;
  /**
   * 在面包屑中隐藏
   */
  hideInBreadcrumb?: boolean;
}

// 这个是暴露给文件夹下的index设置menu类型
export type ProMenuExport = ProMenuType | ProMenuType[];

export const processMenuItem = (menuItem: ProMenuType) => {
  let WrapperComponent: ComponentType = ({ children }) => <>{children}</>;
  if (menuItem.component) {
    if ('default' in menuItem.component) {
      WrapperComponent = menuItem.component.default;
    } else {
      WrapperComponent = menuItem.component;
    }
  }
  const children = menuItem.routes ? (
    <Switch>
      {menuItem.routes.map(processMenuItem)}
      {/* ? */}
      <Redirect to={menuItem.routes[0].path || ''} />
    </Switch>
  ) : (
    undefined
  );
  // Suspense 标签将要进行 lazy（懒加载）的组件进行包裹，然后在 callback 函数中给出加载过程中处理方式，也就是加载过程中的行为。
  return (
    <Route
      path={menuItem.routePath || menuItem.path}
      key={menuItem.routePath || menuItem.path}
      render={props => (
        <Suspense fallback={null}>
          <WrapperComponent {...props}>{children}</WrapperComponent>
        </Suspense>
      )}
      exact={menuItem.exact}
    />
  );
};
