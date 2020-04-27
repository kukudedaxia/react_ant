import { Avatar, Dropdown, Icon, Menu } from 'antd';
import classnames from 'classnames';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { withRouter } from 'react-router-dom';
import useRootStore from '../../models';
import styles from './RightContent.module.scss';

const RightContent = withRouter(({ history }) => {
  const rootStore = useRootStore();
  const userDropDown = (
    <Menu>
      <Menu.Item key="userCenter">
        <Icon type="user" />
        <span>用户中心</span>
      </Menu.Item>
      <Menu.Item key="userinfo">
        <Icon type="setting" />
        <span>用户设置</span>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          window.localStorage.removeItem('currenUser');
          history.push('/login');
        }}
      >
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return useObserver(() => (
    <div
      className={classnames(
        styles.right,
        styles.dark,
      )}
    >
      <Dropdown overlay={userDropDown}>
        <span className={classnames(styles.action, styles.account)}>
          <Avatar size="small" className={styles.avatar} alt="avatar" icon="user" />
          <span className={styles.name}>
            {rootStore.name && rootStore.name}
          </span>
        </span>
      </Dropdown>
    </div>
  ));
});

export default RightContent;
