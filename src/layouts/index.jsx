import React from 'react'
import l from '@/styles/layouts.less'
import Aside from '../components/Aside'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GlobalOutlined } from '@ant-design/icons'
import { history, connect, useModel } from 'umi'
import { setCollapsedCache, getCollapsed } from '../utils/cache/cacheCollapsed'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';

function Layouts (props) {
  const [collapsed, setCollapsed] = React.useState(getCollapsed())

  const { initialState } = useModel('@@initialState')

  const onSetCollapsed = (value) => {
    setCollapsed(value)
    setCollapsedCache(value)
  }

  const onClickLogo = () => {
    props.location.pathname !== '/' && history.push('/')
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className={ l.layout }>
        <aside className={l['layout-aside']} >

          <h3
            className={`${l['layout-title']} ${collapsed ? 'center' : ''}`}
            onClick={ onClickLogo }
          >
            <GlobalOutlined className={`${l['layout-login']}`}/>
            { !collapsed && <span>平台管理</span> }
          </h3>

          <Aside
            className={l['layout-aside']}
            collapsed={collapsed}
            asyncRoutes={initialState.asyncRoutes}
            {...props}
  />
        </aside>

        <section className={l["layout-section"]}>

          <Header
            className={`${l['layout-header']} flex-align-center`}
            collapsed={collapsed}
            onSetCollapsed={onSetCollapsed}
          />

          <main className={l['layout-container']}>{props.children}</main>

          <Footer className={`${l['layout-footer']} flex-align-center`}>footer</Footer>

        </section>
      </div>
    </ConfigProvider>
  )
}

export default connect(({ system}) => ({ system }))(Layouts)
