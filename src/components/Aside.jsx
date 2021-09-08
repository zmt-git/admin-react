import React from 'react';
import { Menu } from 'antd'
import { history } from 'umi'
const { SubMenu } = Menu;

export default function Aside (props)  {
  const collapsed = props.collapsed ? true : false

  const routes = props.asyncRoutes ? props.asyncRoutes : []

  const width =  props.collapsed ? '80px': '256px'

  const currentRouteArr = props.location.pathname.split('/').filter(item => item && item.trim())

  const [openKeys, setOpenKeys] = React.useState([`/${currentRouteArr[0]}`])

  const [selectedKeys, setSelectedKeys] = React.useState([props.location.pathname])

  const onOpenChange = keys => {
    setOpenKeys(([keys[keys.length - 1]]))
  };

  const handleClick = (e) => {
    setSelectedKeys(e.key)
    history.push(e.key)
  };

  const getChildrenNode = (route) => {
    if (route.routes.length === 0) return null;
    const ChildrenNode = route.routes.map(child => (
      <Menu.Item key={child.path}>{child.meta.title}</Menu.Item>
    ))
    return ChildrenNode;
  }

  let routesNodes = null

  if (routes.length > 0) {
    routesNodes = routes.map(route => (
      <SubMenu 
        key={route.path} 
        title={route.meta.title}
      >
      {getChildrenNode(route)}
      </SubMenu>
    ))
  }

  return (
    <Menu
      inlineCollapsed={collapsed}
      onClick={handleClick}
      style={{ width: width }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      theme="dark"
      onOpenChange={onOpenChange}
    >
      {routesNodes}
    </Menu>
  );
}
