import { Button, Skeleton, Switch, Card, Avatar } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { RouteComponentProps } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import useRootStore from '../../models/index';
import Searchs from './Search';
import Text from './textArea';
import styles from './index.module.scss';
import cls from 'classnames';


const Home: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    activeState: false,
    text: '你在电脑前看这段文字，写文字的人在百度等你。N年前你来到了这个世界，N年后你想改变世界。期待你脚踏祥云， 与百度一起改变世界。',
    keywords: ['你', '世界'],
    search(val: string) {
      if (val !== '' && store.activeState === false) {
        store.activeState = true;
      } else {
        store.activeState = false;
      }
    },

    // exit() {
    //   window.localStorage.removeItem('currenUser');
    //   history.push('/login');
    // },
  }));
  return useObserver(() => (
    <div className={styles.main}>
      <div className={styles.head}>Inference & QA </div>
      <div className={cls(styles.context, store.activeState ? styles.context_active : styles.context_normal)}>
        <Searchs onChange={store.search} />
        {
          store.activeState &&

          <div className={styles.result}>
            <Card className={styles.card} title="答案" size="small" >
              <span>这是一段答案</span>
            </Card>
            <Card className={styles.card} title="推测来源" size="small" >
              <Text text={store.text} keywords={store.keywords} />
            </Card>
          </div>
        }
      </div>
    </div >
  ));
};

export default Home;
