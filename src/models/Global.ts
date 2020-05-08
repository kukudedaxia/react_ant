import { action, computed, observable } from 'mobx';
import { Settings } from '@ant-design/pro-layout';
import { history } from '../App';
import Demopage from '../pages/Demo';
import HomePage from '../pages/Home';
import { processMenuItem, ProMenuType } from './menu';

type LayoutSettings = Omit<Settings, 'menu' | 'title' | 'iconfontUrl'>;

// 定义全局变量
class Global {
  @observable
  layoutSettings: LayoutSettings = {
    navTheme: 'dark',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    // @ts-ignore
    autoHideHeader: false,
    fixSiderbar: false,
  };

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

  @computed
  // eslint-disable-next-line class-methods-use-this
  get menu(): ProMenuType[] {
    return [HomePage, Demopage];
  }

  @computed
  get routes() {
    return this.menu.map(processMenuItem);
  }

  constructor() {
    this.name = '全局变量1';
  }
}

export default Global;
// export const rootStoreContext = createContext<Global | null>(null);

// // 为了少些引用useContext,rootStoreContext 封装了一下
// const useRootStore = () => {
//   const rootStore = useContext(rootStoreContext);
//   if (rootStore === null) throw new Error('You forgot to use RootStore Provider!');
//   return rootStore;
// };

// export default useRootStore;
