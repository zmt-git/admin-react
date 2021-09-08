import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import header from '@/styles/header.less'
import { removeToken } from '@/utils/cache/cacheAuth'
import { history } from 'umi'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react';

export default function Header (props) {
  const onChange = () => {
    props.onSetCollapsed(!props.collapsed)
  }

  const { confirm } = Modal;

  const onLogout = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出当前账号吗？',
      onOk() {
        return new Promise((resolve, reject) => {
          resolve()
          removeToken()
          history.push('/login')
        })
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: '确认',
      cancelText: '取消'
    });
  }

  return (
    <header className={`${props.className} ${header.header}`}>
      <div className={header.item}>
        {
          props.collapsed ?
          <MenuUnfoldOutlined onClick={onChange} /> :
          <MenuFoldOutlined onClick={onChange} />
        }
      </div>

      <div className={header.item}>
        <span className={`${header.icon} icon-lianjie iconfont`}/>

        <span className={`${header.icon} icon-tongzhi iconfont`}/>

        <span className={`${header.icon} icon-quanping iconfont`}/>

        <span className={`${header.icon} icon-yonghu iconfont`}/>

        <span className={`${header.icon} icon-tuichu iconfont`} onClick={onLogout}/>
      </div>

    </header>
  )
}
