import { observable, action } from 'mobx';
import { createContext, useContext } from 'react';
import { Settings } from '@ant-design/pro-layout';
import { history } from '../App';

// 重写layoutsetting
type LayoutSettings = Omit<Settings, 'menu' | 'title' | 'iconfontUrl'>;

// 定义全局变量
export class RootStore {
  @observable
  name = '';

  @observable
  loadingCurrentUser = false;

  @observable
  currentUser = null;

  @action
  fetchCurrentUser = () => {
    const storage = window.localStorage;
    this.currentUser = storage.currenUser;
    this.loadingCurrentUser = true;
    if (this.currentUser) {
      this.loadingCurrentUser = false;
      console.log('已登录');
    } else {
      // @ts-ignore
      history.push('/login');
      console.log('未登录');
    }
  };

  // 页面layout布局设置
  @observable
  layoutSettings: LayoutSettings = {
    navTheme: 'dark',
    layout: 'topmenu',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: false,
    primaryColor: '#2db7f5', //好像没用
  };

  constructor() {
    this.name = '全局变量1';
    this.currentUser = window.localStorage.currenUser;
    // this.fetchCurrentUser();
  }
}

export const rootStoreContext = createContext<RootStore | null>(null);

// 为了少些引用useContext 封装了一下
const useRootStore = () => {
  const rootStore = useContext(rootStoreContext);
  if (rootStore === null) throw new Error('You forgot to use RootStore Provider!');
  return rootStore;
};

export default useRootStore;
