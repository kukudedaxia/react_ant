import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
// import BasicLayouts from './components/BasicLayout';
import useRootStore, { RootStore, rootStoreContext } from './models/index';
import Login from './pages/Login/Login';
import CustomLayout from './components/Layout';

export const history = createBrowserHistory();

const Main = observer(() => {
  const rootStore = useRootStore();
  useEffect(() => {
    rootStore.global.fetchCurrentUser();
  }, [rootStore]);
  return rootStore.global.currentUser ? (
    <CustomLayout>
      <Switch>{rootStore.global.routes}</Switch>
    </CustomLayout>
  ) : null;
});

const App = () => {
  const [rootStore] = useState(() => new RootStore()); // 传递下去的全局变量
  return (
    <Router history={history}>
      <rootStoreContext.Provider value={rootStore}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => <Main />} />
        </Switch>
      </rootStoreContext.Provider>
    </Router>
  );
};

export default App;
