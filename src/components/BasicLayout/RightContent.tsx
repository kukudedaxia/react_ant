import { Avatar, Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import useRootStore from '../../models';
import styles from './RightContent.module.scss';

const RightContent = withRouter(({ history }) => {
  const rootStore = useRootStore();
  const userDropDown = (
    <Menu>
      <Menu.Item key="userCenter">
        <UserOutlined />
        <span>用户中心</span>
      </Menu.Item>
      <Menu.Item key="userinfo">
        <SettingOutlined />
        <span>用户设置</span>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          window.localStorage.removeItem('currenUser');
          history.push('/login');
        }}
      >
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return useObserver(() => (
    <div className={classnames(styles.right, styles.dark)}>
      <Dropdown overlay={userDropDown}>
        <span className={classnames(styles.action, styles.account)}>
          <Avatar size="small" className={styles.avatar} alt="avatar" icon={<UserOutlined />} />
          <span className={styles.name}>{rootStore.global.name && rootStore.global.name}</span>
        </span>
      </Dropdown>
    </div>
  ));
});

export default RightContent;
